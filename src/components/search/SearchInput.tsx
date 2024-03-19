import { useEffect, useRef } from "react";
import { Search } from "../../assets/Search";
import FilterIcon from "../../assets/FilterIcon";
type SearchInputProps = {
  isOpen: boolean;
  handleFilterClick: () => void;
};
export function SearchInput({
  isOpen = false,
  handleFilterClick,
}: SearchInputProps) {
  // using input ref for auto focusing when the user clicks on the search icon in the header
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`w-5/6  lg:w-1/2 flex gap-2 justify-between bg-dark px-4 rounded-xl items-center border border-accent border-opacity-0 transition-colors duration-300 focus-within:border-opacity-40 p-1`}
    >
      {/* Search input field  with icons on both sides*/}
      <div className="cursor-pointer  border border-transparent hover:border-opacity-40 hover:border-accent   p-2 transition-colors duration-300 hover:bg-black rounded-xl ">
        <Search size={32} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here"
        className={`bg-dark text-white bg-transparent outline-none px-5 py-3 w-full`}
      />
      {/* filter icon button for opening filter window for search */}
      <FilterIcon size={32} />
    </div>
  );
}
