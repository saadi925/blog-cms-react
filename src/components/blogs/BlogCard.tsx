import React from "react";
import { Link } from "react-router-dom";

export interface BlogItem {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: Date;
  description : string
  category: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
  };
  averageRating: number;
}

type BlogCardProps = {
  blog: BlogItem;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title,description, thumbnail, createdAt, category, averageRating } = blog;

  return (
    <div className="max-w-lg w-full rounded-lg border border-gray-300 shadow-md">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={thumbnail}
        alt={title}
      />
      <div className="bg-background rounded-b-lg lg:rounded-b-none lg:rounded-r-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <div className="text-white/70 font-bold text-xl mb-2">
            {/* Display title with maximum of 3 lines */}
            <Link to={`/cms/post/${blog.id}`}
              className="line-clamp-3"
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              {title}
            </Link>
          </div>
          <div className="text-gray-600">
            {/* Display description with maximum of 3 lines */}
            <div
              className="line-clamp-3"
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={category.thumbnail}
            alt={`Category: ${category.name}`}
          />
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
