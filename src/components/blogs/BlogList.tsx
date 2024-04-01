import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useGetPostsQuery } from "../../setup/store/postsApi";
import { setBlogs } from "../../setup/store/slices/dataSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../setup/store/store";
import BlogPost from "./BlogPost";
const BlogList = () => {
  const { data } = useGetPostsQuery();
  console.log(data);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setBlogs(data));
    }
  }, [data]);
  const post = {
    id: 1,
    title: "Sample Blog Post Title",
    thumbnail:
      "https://images.unsplash.com/photo-1704742204216-59d589945ddc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date(),
    category: {
      name: "Technology",
      thumbnail:
        "https://images.unsplash.com/photo-1704996440137-44a1eb3c71ee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fHw%3D",
      description: "Latest tech trends and news",
    },
    averageRating: 4.5,
  };
  const blogs = useSelector((state: RootState) => state.data.blogs);
  return (
    <motion.div
      // className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))} */}
      <BlogPost {...post} />
    </motion.div>
  );
};

export default BlogList;
