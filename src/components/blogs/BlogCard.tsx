import { BlogType } from "../../setup/store/slices/dataSlice";
import Rating from "../rating/Rating";

interface BlogCardProps {
  blog: BlogType;
}

// make it better  and make the image responsive
const BlogCard = ({ blog }: BlogCardProps) => {
  const { thumbnail, id, title, createdAt, category, averageRating } = blog;
  return (
    <div className="bg-background relative text-white w-full border border-transparent hover:border-surface transition-all duration-300 border-opacity-50 cursor-pointer hover:bg-primary/10 rounded-lg py ">
      <img
        src={thumbnail}
        className="rounded-md w-full object-cover max-h-40"
        alt={title}
      />
      <p className="absolute top-0 right-0 bg-background rounded-full px-2 py-1 ">
        {createdAt
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })
          .toUpperCase()}
      </p>

      <h3 className="text-xl px-2">{title.slice(0, 20)}...</h3>
      <div className="flex items-center justify-between p-2">
        <Rating defaultValue={averageRating} />
        <p className="text-surface  bg-background px-2 py-1 rounded-full">
          {category.name}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
