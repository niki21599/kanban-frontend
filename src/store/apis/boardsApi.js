import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let token = "Token " + localStorage.getItem("token");

const boardsApi = createApi({
  reducerPath: "boards",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints(builder) {
    return {
      fetchBoards: builder.query({
        query: () => {
          return {
            url: "board/",
            headers: {
              Authorization: token,
            },
            method: "GET",
          };
        },
        providesTags: (result, error, arg) =>
          result
            ? [...result.map(({ id }) => ({ type: "Post", id })), "Post"]
            : ["Post"],
      }),
      addBoard: builder.mutation({
        query: (name) => {
          let formData = new FormData();
          formData.append("name", name);
          return {
            url: "board/add/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      addUsersToBoard: builder.mutation({
        query: (boardAndUser) => {
          console.log("Received: ", boardAndUser);
          let formData = new FormData();
          formData.append("board_id", boardAndUser.board_id);
          formData.append("user_ids", boardAndUser.user_ids);

          return {
            url: "board/add/user/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
    };
  },
});

export const {
  useFetchBoardsQuery,
  useAddBoardMutation,
  useAddUsersToBoardMutation,
} = boardsApi;

export { boardsApi };
