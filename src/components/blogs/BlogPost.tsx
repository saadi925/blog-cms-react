import React from "react";
type BlogItem = {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  createdAt: Date;
  category: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
  };
  averageRating: number;
};
const BlogPost: React.FC<BlogItem> = ({
  id,
  title,
  thumbnail,
  content,
  createdAt,
  category,
  averageRating,
}) => {
  return (
    <div className="max-w-lg w-full lg:flex rounded-lg border border-gray-300 shadow-md">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-lg rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{content}</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={category.thumbnail}
            alt={`Category: ${category.name}`}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{category.name}</p>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-gray-700">
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

export default BlogPost;
