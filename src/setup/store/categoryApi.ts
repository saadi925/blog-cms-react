import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./middleware/verification";
import { Category } from "../../components/categories/CategoryList";
import { HOST } from "../../keys";

type CategoryData = {
  name: string;
  description: string;
  parentId?: string;
};
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${HOST}/categories`, prepareHeaders }),
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CategoryData>({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deleteCategory: builder.mutation<Category, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} = categoryApi;
