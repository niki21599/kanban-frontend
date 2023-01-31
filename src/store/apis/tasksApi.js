import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

let token = "Token " + localStorage.getItem("token");

let tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints(builder) {
    return {
      fetchTasks: builder.query({
        query: (board_id) => {
          return {
            url: "task/",
            headers: {
              Authorization: token,
            },
            params: {
              board_id,
            },
            method: "GET",
          };
        },
        providesTags: (result, error, arg) =>
          result
            ? [...result.map(({ id }) => ({ type: "Post", id })), "Post"]
            : ["Post"],
      }),
      addTask: builder.mutation({
        query: (task) => {
          let formData = new FormData();
          formData.append("title", task.title);
          formData.append("urgency", task.urgency);
          formData.append("category", task.category);
          formData.append("user_id", task.user_id);
          formData.append("board_id", task.board_id);
          formData.append("color", task.color);
          formData.append("description", task.description);
          return {
            url: "task/add/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      deleteTask: builder.mutation({
        query: (task_id) => {
          let formData = new FormData();
          formData.append("task_id", task_id);

          return {
            url: "/delete/user/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      changeCategory: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("task_id", data.task_id);
          formData.append("newCategory", data.newCategory);
          return {
            url: "change/category/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      changeUrgency: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("task_id", data.task_id);
          formData.append("newUrgency", data.newUrgency);
          return {
            url: "change/urgency/",
            headers: {
              Authorization: token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      changeUser: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("task_id", data.task_id);
          formData.append("newUser", data.newUser);
          return {
            url: "change/user/",
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
  useFetchTasksQuery,
  useAddTaskMutation,
  useChangeCategoryMutation,
  useChangeUrgencyMutation,
  useChangeUserMutation,
  useDeleteTaskMutation,
} = tasksApi;

export { tasksApi };
