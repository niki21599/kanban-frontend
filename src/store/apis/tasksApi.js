import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

let tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints(builder) {
    return {
      fetchTasks: builder.query({
        query: (data) => {
          return {
            url: "task/",
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
            ? [...result.map(({ id }) => ({ type: "Post", id })), "Post"]
            : ["Post"],
      }),
      addTask: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("title", data.title);
          formData.append("urgency", data.urgency);
          formData.append("category", data.category);
          formData.append("user_id", data.user_id);
          formData.append("board_id", data.board_id);
          formData.append("color", data.color);
          formData.append("description", data.description);
          return {
            url: "task/add/",
            headers: {
              Authorization: data.token,
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["Post"],
      }),
      deleteTask: builder.mutation({
        query: (data) => {
          let formData = new FormData();
          formData.append("task_id", data.task_id);

          return {
            url: "/delete/user/",
            headers: {
              Authorization: data.token,
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
              Authorization: data.token,
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
              Authorization: data.token,
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
              Authorization: data.token,
            },
            body: formData,
            method: "POST",
          };
        },
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
