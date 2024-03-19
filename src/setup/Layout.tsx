import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader, AppSideBar } from "../components";
import useAuthentication from "./useAuthentication";
import { SIDE_BAR_WIDTH } from "./constant";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const authenticated = useAuthentication();
  const [showSidebar, setShowSidebar] = useState(authenticated);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const [isMobileView, setIsMobileView] = useState(false);
  const handleResize = () => {
    const isMobile = window.innerWidth < 800;
    setIsMobileView(isMobile);
  };

  // Attach resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial window size
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-primary">
      <div className="flex bg-primary/10 min-h-screen">
        {authenticated ? (
          <>
            <motion.div
              initial={{
                opacity: showSidebar ? 0 : 1,
                display: showSidebar ? "none" : "block",
              }}
              animate={{
                opacity: showSidebar ? 1 : 0,
                display: showSidebar ? "block" : "none",
              }}
            >
              <AppSideBar toggleSidebar={toggleSidebar} />
            </motion.div>
            <motion.div
              className={`flex-grow transition-all`}
              initial={{
                marginLeft: showSidebar && !isMobileView ? "0" : SIDE_BAR_WIDTH,
              }}
              animate={{
                marginLeft: showSidebar && !isMobileView ? SIDE_BAR_WIDTH : "0",
              }}
              transition={{ type: "tween" }}
            >
              <AppHeader toggleSidebar={toggleSidebar} />

              {children}
            </motion.div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default AppLayout;
