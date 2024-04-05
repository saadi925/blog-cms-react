import { useEffect, useReducer, useRef, useState } from "react";
import Selectable from "../components/Selectable";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./components/utils/theme.config";
import Field from "./components/molecules/field";
import FormLinker from "form-linker";
import iconLibrary from "./components/utils/iconLIbrary";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { HOST } from "../keys";
import { useCreatePostMutation } from "./../setup/store/postsApi";
import { toast } from "react-toastify";
import Tags from "./Tags";
export function Editor() {
  config.autoAddCss = false;
  iconLibrary();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Home />
    </ThemeProvider>
  );
}

const Home = () => {
  //   const nextRouter = useRouter();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [categories, setCategories] = useState([]); // [1]
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categoryId: 0,
    tags : [], 
    content: "Write something here",
  });
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
  const [thumbnailPreview, setThumbnailPreview] = useState("");

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
  return (
    <div className={"bg-primary text-white"}>
      <section
        css={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div className="p-3 w-full flex flex-col">
  <div className="sm:px-4 md:px-12">
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
                <button className={`${thumbnailPreview ? "text-surface":"text-gray-600"} bg-background px-5  font-semibold rounded-xl`}
                  onClick={() => {
                    thumbnailPreview
                      ? setThumbnailPreview("")
                      : setThumbnailPreview(formData.thumbnail);
                  }}
                >
                  {!thumbnailPreview ? "Show" : "Hide"}
                </button>
              </div>
              <div className="flex items-center justify-center  max-w-lg bg-background rounded-md ">
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
                  className="px-5 font-semibold   bg-background text-surface  "
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
  </div>
   
          <div className={"mt-12"}>
            <Field
              formLinker={formLinker.current}
              name="content"
              type="editor"
              minHeight={300}
              height={450}
              maxHeight={800}
              placeholder="Enter your content here"
              toolbar={["withImages"]}
              onChange={forceUpdate}
            />
            <button
              className={"long-btn py-2" + `${isLoading ? "bg-gray-400" : ""}`}
              disabled={isLoading}
              onClick={() => handleSave()}
            >
              {isLoading ? "Uploading..." : "Post"}
            </button>
            <h4 className="label " css={{ marginTop: 30, marginBottom: 0 }}>
              Preview
            </h4>
            <div
              css={{
                width: "100%",
                padding: 12,
                border: "1px solid #000",
                minHeight: 350,
                backgroundColor: "#fff",
                color: "#000",
                borderRadius :"8px"
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formLinker.current.data.content,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
