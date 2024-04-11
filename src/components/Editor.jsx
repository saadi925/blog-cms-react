import { useEffect, useState } from 'react';
import Selectable from './Selectable';
import { useParams } from 'react-router-dom';
import AddIcon from '../assets/AddIcon';
import SlateEditor from "../editor/src/lib/App"
import Tags from './Tags';
import {HOST} from '../keys'
export default function Editor(edit = false) {
  const {slug} = useParams()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categoryId: "",
    tags :[],
    content :""
  });
  const [content , setContent] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [CATEGORY, setCATEGORY] = useState("");
const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
useEffect(()=>{
  async function fetchCategories(){
    const res = await fetch(`${HOST}/categories`)
    const data = await res.json()
    setCategories(data)
  }

 fetchCategories() 
},[])

  useEffect(()=>{
    async function fetchPost(){
      const res = await fetch(`${HOST}/posts/find?slug=${slug}`)
      const data = await res.json()
      if ('slug' in data){
        if (edit) {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            thumbnail: data.thumbnail || '',
            categoryId: data.categoryId || '',
            tags: data.tags || [],
            content: data.content || ''
          });
          setContent(data.content)
      }}
    }
    if (edit) {
      fetchPost()
    }
  },[slug])
  const onThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.value });
  }
  const handlePasteThumbnail = () => {
    navigator.clipboard.readText().then((text) => {
      setFormData({ ...formData, thumbnail: text });
    });
  }
  const categoryChange = (e) => {
    setCATEGORY(e.target.value);
  }
  const handleSaveCategory = async() => {
    await fetch(`${HOST}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name: CATEGORY }),
    });
    setCategories([...categories, CATEGORY]);
    setCATEGORY("");

  }
  const handleCategoryChange = (value) => {
    setFormData({ ...formData, categoryId: value });
  }
  const handleSave = async()=>{
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${HOST}/posts`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
          , 
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          ...formData,
          tags:tags,
          content
        
        })
      })
      console.log(res)
    } catch (error) {
      
    }
  }
  return (
    <div className="sm:px-4 text-white md:px-12">
    {/* inputs */}
    <div className="lg:flex items-center gap-2">
      <div className="label-box">
        <label className={"label"} htmlFor="title">
          Title
        </label>
        <input
          className={"input border-b border-surface/30 py-5 px-2"}
          type="text"
          id="title"
          value={formData.title}
          name="title"
          placeholder="title"
          onChange={onHandleChange}
        />
      </div>
      <div className="label-box w-full">
        <label className={"label"} htmlFor="description">
          Description
        </label>
        <textarea
          className={"input px-2 py-4"}
          type="text"
          id="description"
          name="description"
          placeholder="description"
          onChange={onHandleChange}
          value={formData.description}
        />
      </div>
    </div>
    <div className="lg:flex gap-2">
      <div className="flex-2">
        <div className="flex justify-between items-center max-w-sm">
          <label className={"label"} htmlFor="thumbnail">
            Thumbnail
          </label>
          <button
            className={`${
              thumbnailPreview ? "text-surface" : "text-gray-600"
            } bg-slate-800 px-5  font-semibold rounded-xl`}
            onClick={() => {
              thumbnailPreview
                ? setThumbnailPreview("")
                : setThumbnailPreview(formData.thumbnail);
            }}
          >
            {!thumbnailPreview ? "Show" : "Hide"}
          </button>
        </div>
        <div className="flex items-center justify-center  max-w-lg bg-slate-800 rounded-md ">
          <input
            type="text"
            value={formData.thumbnail}
            onChange={onThumbnailChange}
            id="thumbnail"
            name="thumbnail"
            placeholder="Image URL"
            className={"input w-full rounded-md py-2 "}
          />
          <button
            className="px-5 font-semibold   bg-slate-800 text-surface  "
            onClick={() => handlePasteThumbnail()}
          >
            {/* paste icon */}
            paste
          </button>
        </div>
        {thumbnailPreview && (
          <div>
            <h3>Thumbnail Preview</h3>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className={""}
            />
          </div>
        )}

        <div className="flex items-center flex-col justify-center">
          <label htmlFor="category" className="text-2xl">
            category
          </label>
          <div className="flex">
            <input
              className={"input border-b  border-surface/30 py-3 px-2"}
              type="text"
              id="category"
              value={CATEGORY}
              name="category"
              placeholder="New Category"
              onChange={(e) => categoryChange(e)}
            />
            <div
              className="flex justify-center mt-4 cursor-pointer"
              onClick={handleSaveCategory}
            >
              <AddIcon color="#121212" fill="#ffffff" />
            </div>
          </div>
        </div>
      </div>
      <div className={"max-w-full mt-6  flex-1 "}>
        <Selectable
          value={formData.categoryId}
          setValue={handleCategoryChange}
          onChange={onHandleChange}
          categories={categories}
        />
      </div>
    </div>
    <div className="mt-4">
      <label htmlFor="tags" className="label">
        Tags
      </label>
      <Tags tags={tags} setTags={setTags} />
    </div>
    <button className='px-5 py-3 bg-surface text-black w-full ' onClick={()=>handleSave()} >
      save
    </button>
    <SlateEditor content={content} setContent={setContent}/>

  </div>
  )
}
