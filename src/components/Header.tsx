import {
  FaGoogle,
  FaGithub,
  FaTwitter,
  FaInbox,
  FaUser,
  FaBars,
  FaEllipsisV,
  FaDrawPolygon,
} from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const AppHeader = ({ toggleSidebar }) => {
  const [showIcons, setShowIcons] = useState(true);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="flex sticky bg-primary justify-between items-center px-4 md:px-8 lg:px-16 py-2 w-full border-b  border-background/50">
      <div className=" cursor-pointer flex ">
        <div className="flex flex-wrap  items-center justify-center py-2">
          <FaBars
            size={30}
            className="text-white  z-30"
            onClick={toggleSidebar}
          />
          <FaDrawPolygon size={30} className="text-blue-600 " />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 relative">
        <div className="md:hidden cursor-pointer">
          <FaEllipsisV size={30} className="text-white" onClick={toggleIcons} />
        </div>
        {showIcons && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:flex md:space-x-4 md:items-center absolute md:relative top-12 md:top-auto right-0 md:right-auto bg-white text-black px-4 py-2 rounded-md shadow-lg"
          >
            <li className="py-4 md:py-0">
              <FaGithub
                size={30}
                className="text-purple-600  rounded-full cursor-pointer"
              />
            </li>
            <li className="py-4 md:py-0">
              <FaGoogle
                size={30}
                className="text-black rounded-full cursor-pointer"
              />
            </li>
            <li className="py-4 md:py-0">
              <FaTwitter
                size={30}
                className="text-blue-600 rounded-full cursor-pointer"
              />
            </li>
            <li className="py-4 md:py-0">
              <FaInbox size={30} className="text-black" />
            </li>
            <li className="py-4 md:py-0">
              <FaUser size={30} className="text-black" />
            </li>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
