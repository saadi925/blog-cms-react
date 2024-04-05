import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./middleware/verification";
import { Category } from "../../components/categories/CategoryList";
import { HOST } from "../../keys";

type CategoryData = {
  name: string;
  description: string;
  parentId?: string;
  thumbnail?: string;
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
    updateCategory: builder.mutation<Category, any>({
      query: (credentials) => ({
        url: `${credentials.id}`,
        method: "PUT",
        body: {
          name: credentials.name,
          description: credentials.description,
          thumbnail: credentials.thumbnail,
        
        },
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
  useGetCategoriesQuery,useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
