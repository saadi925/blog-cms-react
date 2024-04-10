import { Navigate } from "react-router-dom";
import { AuthRoutes } from "./authRoutes";

export const PublicRoutes = [
  {
    path: "/cms/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/cms" />,
  },
];

export default PublicRoutes;
