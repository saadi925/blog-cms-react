import { Navigate } from "react-router-dom";
import { Editor } from "../editor/Home.jsx";
import Blogs from "../components/blogs/Blogs";
import AdminSettings from "../components/AdminSettings";
import Categories from "../components/categories/Categories";
import BlogPostPage from "./BlogPost.js";

export const ProtectedRoutes = [
  {
    children: [
      { path: "/cms/settings", element: <AdminSettings /> },
      { path: "/cms", element: <Blogs /> },
      { path: "/cms/post", element: <Editor /> },
      {path :"/cms/post/:id", element: <BlogPostPage/>},
      { path: "/cms/categories", element: <Categories /> },
      { path: "*", element: <Navigate to="/cms" /> },
    ],
  },
];
