import { Navigate } from "react-router-dom";
import { AuthRoutes } from "./authRoutes";

export const PublicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];

export default PublicRoutes;
