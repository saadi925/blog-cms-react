import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../setup/store/postsApi';

interface Props {

}

const BlogPostPage: React.FC<Props> = () => {
    const params = useParams()
   const {id} = params
   const {data, isLoading} = useGetPostByIdQuery(id)
   const [blog, setBlog] = useState(data)
   useEffect(()=>{
        if (data) {
            setBlog(data)
        }

    },[data, setBlog])
  return (
    <div>
        {isLoading ? <div>Loading...</div> :
         <div className="sm:px-8 md:px-12 lg:px-44">
           
                <div className="bg-background px-8 py-2">
                <img src={blog?.thumbnail} alt={blog?.title} className="w-full h-80 object-cover rounded-t-lg"/>
                <p className="text-white font-bold text-center">
                {blog?.category?.name}
             </p>
                <h1 className="text-surface/70 max-w-xl  my-3 font-bold text-2xl mt-4 mb-2">
                {blog?.title}
                </h1>
                <p className="text-gray-600 my-3 max-w-xl">
                    {blog?.description}
                    </p>
                    <div className='text-white my-3 ' dangerouslySetInnerHTML={{
            __html: blog?.content
        }}></div>
            
                </div>
         </div>
        }
    </div>
  );
};

export default BlogPostPage;