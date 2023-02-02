import "./MainBoard.css";
import React from "react";
import { useParams } from "react-router-dom";
import NoBoards from "../NoBoards/NoBoards";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBoard, useFetchBoardsQuery } from "../../store";
import { useNavigate } from "react-router-dom";
import BoardDisplay from "../BoardDisplay/BoardDisplay";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function MainBoard() {
  let { token } = useSelector((state) => state.loggedIn);

  let { boardId } = useParams();

  let navigate = useNavigate();
  const navigateTo = (id) => navigate("/" + id);

  let dispatch = useDispatch();
  let boardData = useFetchBoardsQuery(token);

  let mainContent;
  if (boardData.isFetching) {
    mainContent = (
      <div>
        <LoadingSpinner />
      </div>
    );
  } else if (boardData.error) {
    mainContent = <div>Error fetching Boards</div>;
  } else if (boardData.data.length > 0) {
    let [matchedBoard] = boardData.data.filter((board) => board.pk == boardId); // Works only because of ==
    if (matchedBoard) {
      dispatch(setActiveBoard(matchedBoard));
    } else {
      dispatch(setActiveBoard(boardData.data[0])); // --> no fake refetches
      navigateTo(boardData.data[0].pk);
    }

    mainContent = <BoardDisplay />;
  } else {
    mainContent = (
      <div>
        <NoBoards />
      </div>
    );
  }

  return <div> {mainContent} </div>;
}

export default MainBoard;
