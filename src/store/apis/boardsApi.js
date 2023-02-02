import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const boardsApi = createApi({
  reducerPath: "boards",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints(builder) {
    return {
      fetchBoards: builder.query({
        query: (token) => {
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
        query: (data) => {
          let formData = new FormData();
          formData.append("name", data.name);
          return {
            url: "board/add/",
            headers: {
              Authorization: data.token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      addUsersToBoard: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("board_id", data.board_id);
          formData.append("user_ids", data.user_ids);

          return {
            url: "board/add/user/",
            headers: {
              Authorization: data.token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post", "User"],
      }),
      getAddedUsers: builder.query({
        query: (data) => {
          return {
            url: "task/user/",
            headers: {
              Authorization: data.token,
            },
            params: {
              board_id: data.board_id,
            },
            method: "GET",
          };
        },
        providesTags: (result, error, arg) =>
          result
            ? [...result.map(({ id }) => ({ type: "User", id })), "User"]
            : ["User"],
      }),
      getNotAddedUsers: builder.query({
        query: (data) => {
          return {
            url: "board/user/",
            headers: {
              Authorization: data.token,
            },
            params: {
              board_id: data.board_id,
            },
            method: "GET",
          };
        },
        providesTags: (result, error, arg) =>
          result
            ? [...result.map(({ id }) => ({ type: "User", id })), "User"]
            : ["User"],
      }),
      login: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("username", data.username);
          formData.append("password", data.password);
          return {
            url: "login/",
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      register: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("username", data.username);
          formData.append("password", data.password);
          formData.append("password_repeat", data.passwordRepeat);
          formData.append("email", data.email);
          formData.append("first_name", data.firstName);
          formData.append("last_name", data.lastName);
          return {
            url: "register/",
            body: formData,
            method: "POST",
          };
        },
      }),
      addGuestBoards: builder.mutation({
        query: (token) => {
          return {
            url: "guestBoards/add/",
            method: "POST",
            headers: {
              Authorization: token,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchBoardsQuery,
  useAddBoardMutation,
  useAddUsersToBoardMutation,
  useGetAddedUsersQuery,
  useGetNotAddedUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddGuestBoardsMutation,
} = boardsApi;

export { boardsApi };
