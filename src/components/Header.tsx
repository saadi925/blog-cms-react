import { FaBars } from "react-icons/fa";
const AppHeader = ({ toggleSidebar }: any) => {
  return (
    <div className="flex sticky bg-primary justify-between items-center px-4 md:px-8 lg:px-16 py-2 w-full border-b  border-background/50">
      <div className=" cursor-pointer flex ">
        <div className="flex flex-wrap text-surface font-semibold pl-1 text-2xl  items-center justify-center py-2">
          <FaBars
            size={30}
            className="text-white  z-30"
            onClick={toggleSidebar}
          />
          DG SPARK
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
