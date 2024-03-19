import { Navigate } from "react-router-dom";

import Blogs from "../components/blogs/Blogs";
import AdminSettings from "../components/AdminSettings";
import Categories from "../components/categories/Categories";

export const ProtectedRoutes = [
  {
    children: [
      { path: "/settings", element: <AdminSettings /> },
      { path: "/", element: <Blogs /> },
      { path: "/categories", element: <Categories /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
