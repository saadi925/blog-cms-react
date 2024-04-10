import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { actions } from "./store/auth";
const useAuthentication = (): { isAuthenticated: boolean } => {
  const { setToken } = actions;
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const token = localStorage.getItem("token");
 
        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error("Error retrieving token from local storage:", error);
      }
    };

    getTokenFromStorage();
  }, [dispatch,isAuthenticated]);

  return { isAuthenticated };
};

export default useAuthentication;
