import { Link } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import MinHeading from "../MinHeading";
import { SearchInput } from "../search/SearchInput";
import BlogList from "./BlogList";
import { darkTheme } from "../../theme/COLORS";
const Blogs = () => {
  return (
    <div className="">
      <div className="flex w-full flex-wrap justify-between px-4 pt-3">
        <MinHeading name="Blogs" />
        <div className="flex items-center flex-wrap gap-4">
          <SearchInput isOpen />
          <Link
            to="/cms/post"
            className="bg-surface flex items-center border border-transparent transtion-all duration-300 text-white font-semibold rounded-full hover:bg-surface/60 active:bg-black active:border-primary py-1 px-5"
          >
            <AddIcon color={darkTheme.COLORS.surface} />
            <span className="hidden md:block">Post</span>
          </Link>
        </div>
      </div>
      <BlogList />
    </div>
  );
};

export default Blogs;
