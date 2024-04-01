import { useEffect, useReducer, useRef, useState } from "react";
import Selectable from "./components/Selectable";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./components/utils/theme.config";
import Field from "./components/molecules/field";
import FormLinker from "form-linker";
import iconLibrary from "./components/utils/iconLIbrary";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { useCreatePostMutation } from "./../setup/store/postsApi";
const HOST = "https://dgspark.site/api";
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
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categoryId: 0,
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
  const handleSave = async (data) => {
    try {
      const ok = validateData(data);
      if (!ok) {
        setError("All fields are required");
        return;
      }
      if (ok) {
        const res = await createPost(data);
        if (res.error) {
          setError(res.error.message);
          return;
        }
        setError("");
        setError("Post created successfully");
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
        <div
          css={{
            width: 1000,
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label className={"label"} htmlFor="title">
            Title
          </label>
          <input
            className={"input"}
            type="text"
            id="title"
            value={formData.title}
            name="title"
            placeholder="title"
            onChange={onHandleChange}
          />
          <label className={"label"} htmlFor="description">
            Description
          </label>
          <textarea
            className={"input"}
            type="text"
            id="description"
            name="description"
            placeholder="description"
            onChange={onHandleChange}
            value={formData.description}
          />
          <label className={"label"} htmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={onThumbnailChange}
            id="thumbnail"
            name="thumbnail"
            placeholder="Image URL"
            className={"input"}
          />
          <div className="text-center">
            <button
              className="text-xl mt-2 font-semibold bg-background text-surface rounded-lg  px-3   "
              onClick={() => handlePasteThumbnail()}
            >
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
          <div className={""}>
            <Selectable
              value={formData.categoryId}
              setValue={handleCategoryChange}
              onChange={onHandleChange}
              categories={categories}
            />
          </div>
          {error && <p style={{ fontSize: "24px", color: "red" }}>{error}</p>}
          <label htmlFor="content">Content</label>
          <div className={"bg-white text-black px-3 md:px-5 border rounded-md"}>
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
              className={"long-btn " + `${isLoading ? "bg-gray-400" : ""}`}
              disabled={isLoading}
              onClick={() => handleSave(formData)}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <h4
              className="label text-black"
              css={{ marginTop: 30, marginBottom: 0 }}
            >
              Preview
            </h4>
            <div
              css={{
                width: "100%",
                padding: 12,
                border: "1px solid #000",
                minHeight: 350,
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
