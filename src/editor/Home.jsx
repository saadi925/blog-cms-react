import Selectable from "../components/Selectable";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./components/utils/theme.config";
import Field from "./components/molecules/field";
import iconLibrary from "./components/utils/iconLIbrary";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import AddIcon from "../assets/AddIcon";
import Tags from "./Tags";
import useEditor from "./useEditort";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { HOST } from "../keys";

export function CustomRichText({editMode = false}) {
  config.autoAddCss = false;
  iconLibrary();
  
  return <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Home edit={editMode}/>
    </ThemeProvider>
  
}

const Home = ({ edit = false }) => {
  const {slug} =useParams()


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
          formLinker.current.data = formData.content
      }}
    }
    if (edit) {
      fetchPost()
    }
  },[slug])
  const {
    isLoading,
    handlePasteThumbnail,
    onThumbnailChange,
    handleSaveCategory,
    categoryChange,
    handleCategoryChange,
    onHandleChange,
    handleSave,
    formData,setFormData,
    categories,
    tags,
    setTags,
    setThumbnailPreview,
    thumbnailPreview,
    CATEGORY,
    formLinker,
    forceUpdate,
  } = useEditor(edit);
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
                borderRadius: "8px",
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
