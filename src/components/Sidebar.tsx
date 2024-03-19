import { FaBlog, FaUser, FaDrawPolygon, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryIcon from "../assets/CategoryIcon";
import ReviewsIcon from "../assets/ReviewsIcon";
import useAuthentication from "../setup/useAuthentication";
const AppSideBar = ({ toggleSidebar }: { toggleSidebar: any }) => {
  const navigate = useNavigate();
  const auth = useAuthentication();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };
  const routes = [
    {
      to: "/",
      icon: <FaBlog size={20} />,
      name: "Blogs",
    },
    {
      to: "/categories",
      icon: <CategoryIcon fill="#000" size={24} />,
      name: "Categories",
    },
    {
      to: "/reviews",
      icon: <ReviewsIcon fill="#FFD700" size={32} />,
      name: "Reviews",
    },
    {
      to: "/users",
      icon: <FaUser size={20} />,
      name: "Users",
    },
  ];

  return (
    <>
      {auth ? (
        <motion.div
          initial={{ x: -300 }} // Initial position outside of the viewport
          animate={{ x: 0 }} // Animation to slide in from left
          exit={{ x: -300 }} // Animation to slide out to the left
          transition={{ duration: 0.3 }}
          className=" fixed top-0 left-0 h-full w-[12rem] z-40 bg-primary text-white shadow-lg"
        >
          <div className="flex flex-col  h-full py-4 px-2">
            <div className=" cursor-pointer flex ">
              <div className="flex md:hidden flex-wrap  items-center justify-center py-2">
                <FaBars
                  size={30}
                  className="text-white  z-30"
                  onClick={toggleSidebar}
                />
                <span className="text-xl text-white font-semibold ml-2">
                  DGSpark
                </span>
                <FaDrawPolygon size={30} className="text-accent" />
              </div>
            </div>
            {routes.map((route, index) => (
              <LinkItem key={index} to={route.to} icon={route.icon}>
                {route.name}
              </LinkItem>
            ))}
            <div className="mt-auto px-6">
              <Link to="settings">
                <button className="bg-gray-900 text-gray-100 py-3 px-5 rounded-full mb-2 w-full">
                  Settings
                </button>
              </Link>
              <button
                className="py-1 px-2 hover:bg-accent hover:text-white bg-accent rounded-2xl cursor-pointer w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppSideBar;
type LinkItemProps = {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};
const LinkItem: React.FC<LinkItemProps> = ({ to, icon, children }) => {
  return (
    <Link to={to}>
      <li className="py-4 px-6 hover:bg-white transition-all active:bg-primary hover:text-black rounded-3xl cursor-pointer flex items-center gap-2 my-2">
        {icon}
        {children}
      </li>
    </Link>
  );
};
