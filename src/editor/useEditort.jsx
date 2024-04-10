import { useEffect, useReducer, useRef, useState } from "react";
import FormLinker from "form-linker";
import { useCreatePostMutation } from "../setup/store/postsApi";
import { toast } from "react-toastify";
import { HOST } from "../keys";
const useEditor = (edit=false) => {
        // eslint-disable-next-line no-unused-vars
        const [_, forceUpdate] = useReducer((x) => x + 1, 0);
        const formLinker = useRef(
          new FormLinker({
            data: {
              content: "Write something here",
            },
            schema: {
              content: "string",
            },
          })
        );
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      thumbnail: "",
      categoryId: 0,
      tags : [], 
      content: "Write something here",
    });
    const [CATEGORY, setCATEGORY] = useState('')
    const handlePasteThumbnail = async () => {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          console.log("Clipboard API not available");
          return;
        }
    
        try {
          const permission = await navigator.permissions.query({
            name: "clipboard-read",
          });
    
          if (permission.state == "granted" || permission.state == "prompt") {
            navigator.clipboard.readText().then((text) => {
              setFormData({ ...formData, thumbnail: text });
              setThumbnailPreview(text);
            });
          }
        } catch (err) {
          console.error("Failed to read clipboard contents: ", err);
        }
      };
      useEffect(() => {
        const fetchCategories = async () => {
          const res = await fetch(`${HOST}/categories`);
          const data = await res.json();
          setCategories(data);
        };
        fetchCategories();
      }, []);
      const handleCategoryChange = (categoryId) => {
        setFormData({ ...formData, categoryId });
      };
      const onHandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const validateData = (data) => {
        if (
          !data.title ||
          !data.description ||
          !data.thumbnail ||
          !data.categoryId
        ) {
          return false;
        }
        return true;
      };
    
      const categoryChange = (e) => {
        setCATEGORY(e.target.value)
      }
      const handleSaveCategory = async () => {
        try {
          if (CATEGORY =='' || !CATEGORY) {
            toast.error('invalid category')
            return 
          }
          const token = localStorage.getItem('token')
          const res = await fetch(`${HOST}/categories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization" :`Bearer ${token}`
            },
            body: JSON.stringify({
              name: CATEGORY,
            }),
          });
          const data = await res.json();
          setCategories([
            ...categories, data 
          ])
          
          toast.success("Category created successfully");
        } catch (error) {
          console.log(error);
        }
      }
      
      const handleSave = async () => {
        try {
          const ok = validateData(formData);
          if (!ok) {
            toast.error("All feilds are required");
            return;
          }
          if (ok) {
            const res = await createPost({
              ...formData,tags
            });
            if (res.error) {
              toast.error(res.error.message);
              return;
            }
            toast.success("Post created successfully");
          }
        } catch (error) {
          console.log(error);
        }
      };
 
  const onThumbnailChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, thumbnail: url });
    setThumbnailPreview(url);
  };
  useEffect(() => {
    
    if (
      formLinker.current &&
      formLinker.current.data.content !== formData.content
    ) {
      setFormData({ ...formData, content: formLinker.current.data.content });
    }
  }, [formLinker.current.data.content]);

  return {
    isLoading,
    handleSave,
    handlePasteThumbnail,
    onThumbnailChange,
    handleSaveCategory,
    categoryChange,
    handleCategoryChange,
    onHandleChange,
    formData,
    setFormData,
    categories,
    setCategories,
    tags,
    setTags,CATEGORY,
    thumbnailPreview,setThumbnailPreview,forceUpdate,formLinker,
  };
};

export default useEditor;