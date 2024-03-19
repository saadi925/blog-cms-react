import { ProtectedRoutes } from "./protected";
import PublicRoutes from "./public";
import { useRoutes } from "react-router-dom";
import useAuthentication from "../setup/useAuthentication";

export const AppRoutes = () => {
  const auth = useAuthentication();

  const routes = auth ? ProtectedRoutes : PublicRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};
