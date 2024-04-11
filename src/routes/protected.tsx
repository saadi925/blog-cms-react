import { Navigate } from "react-router-dom";
// @ts-ignore
import Editor from '../components/Editor'
import Blogs from "../components/blogs/Blogs";
import AdminSettings from "../components/AdminSettings";
import Categories from "../components/categories/Categories";
import BlogPostPage from "./BlogPost.js";
import MyShop from "../components/shop/MyShop.js";

export const ProtectedRoutes = [
  {
    path :"/cms",
    children: [
      { path: "", element: <Blogs /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "post", element: <Editor /> },
      {path :"post/edit/:slug", element: <Editor edit={true}/>},
      {path :"post/:slug", element: <BlogPostPage/>},
      { path: "categories", element: <Categories /> },
      { path: "shop", element: <MyShop /> },
      { path: "*", element: <Navigate to="/cms" /> },
    ],
  },
];
