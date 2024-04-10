import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/CloseIcon";
import EditIcon from "../../assets/EditIcon";

export interface BlogItem {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  description : string
  category: {
    name: string;
  };
  slug: string;
  averageRating: number;
}

type BlogCardProps = {
  blog: BlogItem;
  onDelete : (id: number) => void
  deleting : boolean
};

const BlogCard: React.FC<BlogCardProps> = ({ blog , onDelete, deleting}) => {
  const { title,description, thumbnail, createdAt, category, averageRating, id } = blog;
  return (
    <div className="max-w-lg w-full relative  rounded-lg border border-gray-500/20">
      <button disabled={deleting} className="absolute disabled:bg-green-600 top-0 bg-black rounded-sm  right-0" onClick={()=>onDelete(id)} >
        <CloseIcon fill="#fff" size={22} />
      </button>
   <Link className="absolute bg-white p-1 rounded-full top-52 right-2" to={`/cms/post/edit/${blog.slug}`}>
     <EditIcon size={20} />
     </Link>
   <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={thumbnail}
        alt={title}
      />
      <div className=" rounded-b-lg lg:rounded-b-none lg:rounded-r-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <div className="text-white/70 font-bold text-xl mb-2">
            {/* Display title with maximum of 3 lines */}
            <Link to={`/cms/post/${blog.slug}`}
              className="line-clamp-3"
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              {title}
            </Link>
          </div>
          <div className="text-gray-600 ">
            {/* Display description with maximum of 3 lines */}
            <div
              className="line-clamp-3"
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center ">
        
          <div className="text-sm">
            <p className="text-surface leading-none">{category.name}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-white/50">
            Published on {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="ml-auto bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-bold">
            {averageRating} ⭐
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
