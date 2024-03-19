import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useGetPostsQuery } from "../../setup/store/postsApi";
import { setBlogs } from "../../setup/store/slices/dataSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../setup/store/store";
const BlogList = () => {
  const { data } = useGetPostsQuery();
  console.log(data);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setBlogs(data));
    }
  }, [data]);
  const blogs = useSelector((state: RootState) => state.data.blogs);
  return (
    <motion.div
      className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </motion.div>
  );
};

export default BlogList;
