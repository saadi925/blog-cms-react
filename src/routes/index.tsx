import { ProtectedRoutes } from "./protected";
import PublicRoutes from "./public";
import { useRoutes } from "react-router-dom";
import useAuthentication from "../setup/useAuthentication";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthentication();

  const routes = isAuthenticated ? ProtectedRoutes : PublicRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};
