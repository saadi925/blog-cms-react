import { Navigate } from "react-router-dom";
import { AuthRoutes } from "./authRoutes";

export const PublicRoutes = [
  {
    path: "/cms/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/cms/auth/login" />,
  },
];

export default PublicRoutes;
