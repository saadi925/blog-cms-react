import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPostBySlugQuery } from "../setup/store/postsApi";
import { AppLoading } from "../components/loading";

interface Props {}
function covertToAgo(date: string) {
  const currentDate = new Date();
  const postDate = new Date(date);
  const diff = currentDate.getTime() - postDate.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days < 1) {
    const hours = diff / (1000 * 60 * 60);
    if (hours < 1) {
      return `${Math.floor(diff / (1000 * 60))} minutes ago`;
    }
    return `${Math.floor(hours)} hours ago`;
  }
  if (days < 2) {
    return "Yesterday";
  }
  if (days < 30) {
    return `${Math.floor(days)} days ago`;
  }
  if (days < 365) {
    return `${Math.floor(days / 30)} months ago`;
  }
  return `${Math.floor(days / 365)} years ago`;
}
const BlogPostPage: React.FC<Props> = () => {
  const params = useParams();
 const slug = params.slug as string;
  const { data, isLoading } = useGetPostBySlugQuery(slug);
  const [blog, setBlog] = useState(data);

  const [date, setDate] = useState("");
  useEffect(() => {
    if (data) {
      setBlog(data);
     if (blog) {
        setDate(covertToAgo(blog?.createdAt));
     }
    }
  }, [data, setBlog, blog]);
  
  const createMarkup = (htmlContent : string) => {
    return { __html: htmlContent };
  };
  return (
    <div>
      {isLoading && !blog ? (
        <div>Loading...</div>
      ) : (
       <div className="md:w-2/3">
       { blog ? <BlogPost blog={blog} content={createMarkup(blog?.content)} date={date} isLoading={isLoading}/> : <AppLoading />}
       </div>
      )}
    </div>
  );
};

export default BlogPostPage;

interface BlogPostProps{
  blog : any,
  content : any,
  isLoading : any,
   date : any
}
const BlogPost: React.FC<BlogPostProps> = ({blog,content, date}) => {
return (
  <div>
      <article className=" px-8 py-2 text-white">
        <h1 className=" max-w-xl  my-3 font-bold text-3xl mt-4 mb-2">
          {blog?.title}
        </h1>
        <p className="text-gray-400 my-3 max-w-xl text-xl">{date}</p>
        <div className="max-w-full min-h-96">
          <img
            src={blog?.thumbnail}
            alt={blog?.title}
            className="w-full  object-cover rounded-lg py-4 max-h-full  "
          />
        </div>
        <p className="text-gray-600 my-3 max-w-xl text-xl">
          {blog?.description}
        </p>
        <div
          style={{ lineHeight: "1.8", marginBottom: "20px" }}
           dangerouslySetInnerHTML={content}
        >
        </div>
      </article>
    </div>
);
};
