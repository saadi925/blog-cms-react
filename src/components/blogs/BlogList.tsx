import { motion } from "framer-motion";
import { useDeletePostsMutation, useGetPostsQuery } from "../../setup/store/postsApi";
import { setBlogs } from "../../setup/store/slices/dataSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../setup/store/store";
import BlogPost from "./BlogCard";
const BlogList = () => {
  const [delPost , {isLoading}] = useDeletePostsMutation()
  const { data } = useGetPostsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setBlogs(data.posts));
    }
  }, [data]);
  const handleDelete = async(id: number) => { 
    try {
      const permission = window.confirm("Are you sure you want to delete this post?")
     if (!permission) {
        return;
     }
      const res = await delPost(id).unwrap()
      if(res){
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        dispatch(setBlogs(newBlogs));
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const blogs = useSelector((state: RootState) => state.data.blogs);
  return (
    <motion.div
      className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {blogs && blogs.length > 0 ?blogs.map((blog) => (
        <BlogPost deleting={isLoading} onDelete={handleDelete} key={blog.id} blog={blog} />
      )) :<></>}
    </motion.div>
  );
};

export default BlogList;
