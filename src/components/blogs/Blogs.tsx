import AddIcon from "../../assets/AddIcon";
import MinHeading from "../MinHeading";
import { SearchInput } from "../search/SearchInput";
import BlogList from "./BlogList";
const Blogs = () => {
  return (
    <div className="">
      <div className="flex w-full justify-between px-4 pt-3">
        <MinHeading name="Blogs" />
        <div className="flex items-center gap-4">
          <SearchInput isOpen />
          <a
            href="http://post.dgspark.site"
            className="bg-surface flex items-center border border-transparent transtion-all duration-300 text-white font-semibold rounded-full hover:bg-surface/60 active:bg-black active:border-primary py-1 px-5"
          >
            <AddIcon />
            Create Blog
          </a>
        </div>
      </div>
      <BlogList />
    </div>
  );
};

export default Blogs;
