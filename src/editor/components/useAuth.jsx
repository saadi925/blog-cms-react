import { useEffect, useState } from "react";
const useAuthentication = () => {
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, [auth, token]);
  return { auth, setAuth };
};

export default useAuthentication;
