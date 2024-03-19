import { Routes, Route } from "react-router-dom";
import { LoginForm } from "../../components";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
    </Routes>
  );
};
