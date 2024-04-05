import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./setup/providers/index.tsx";
import { AppRoutes } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </>
);
