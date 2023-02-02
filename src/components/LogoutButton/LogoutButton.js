import { useDispatch } from "react-redux";
import { logout, setActiveBoard } from "../../store";
import { Button } from "@mui/material";

export default function LogoutButton() {
  let dispatch = useDispatch();
  let handleLogout = () => {
    // API Call needed ?
    dispatch(logout({ token: null, loggedIn: false }));
    let dummyBoard = { model: "", pk: -1, fields: { name: "hds" } };
    dispatch(setActiveBoard(dummyBoard));
    localStorage.clear();
  };
  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
}
