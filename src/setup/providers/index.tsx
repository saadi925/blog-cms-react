import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "../Layout";
import store from "../store/store";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>
        <AppLayout children={children} />
      </Router>
    </Provider>
  );
};

export default AppProvider;
