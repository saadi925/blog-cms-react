import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../../components/categories/CategoryList";
import { BlogItem } from "../../../components/blogs/BlogCard";

type Data = {
  blogs: BlogItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
};
const initialState: Data = {
  blogs: [],
  categories: [],
  loading: false,
  error: null,
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCategories(state, action: { payload: Data["categories"] }) {
      state.categories = action.payload;
    },
    setBlogs(state, action: { payload: Data["blogs"] }) {
      state.blogs = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    deleteCategoryById(state, action: { payload: number }) {
      state.categories = state.categories.filter((category: Category) => {
        category.id !== action.payload;
      });
    },
    createCategoryData(state, action: { payload: any }) {
      state.categories.push(action.payload);
    },
    updateCategoryData(state, action: { payload: any }) {
      state.categories = state.categories.map((category: Category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        }
        return category;
      });
    }
  },
});

export const {
  setCategories,
  setBlogs,
  setLoading,
  setError,
  clearError,
  deleteCategoryById,updateCategoryData,
  createCategoryData,
} = dataSlice.actions;
export default dataSlice.reducer;
