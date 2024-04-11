import React, { SetStateAction } from "react";
import { SearchIcon } from "../assets/icons";
type InputComponentProps = {
  placeHolder?: string;
  setSearch: React.Dispatch<SetStateAction<string | undefined>>;
};
export const InputComponent: React.FC<InputComponentProps> = ({
  setSearch,
  placeHolder = "Search here",
}) => {
  return (
    <div className="bg-gray-800 px-4 flex py-2 rounded-lg max-w-lg">
      <input
        className="search-input bg-gray-800  max-w-full w-full outline-none text-white"
        type="text"
        placeholder={placeHolder}
        onChange={(e) => setSearch(e.target.value)}
      /> 
      <span className="icon">
        <SearchIcon size={20} />
      </span>
    </div>
  );
};
 