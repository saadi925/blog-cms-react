import '../styles/index.css'
import { useEffect, useState } from "react";
import { SlateEditor } from "../components/Slate";
import ExampleDocument from "../components/editor/example/ExampleDocs";
import HtmlViewer from "../components/Viewers/HtmlViewer";
import SideBar from "../components/sidebar/SideBar";
import SourceCodeViewer from "../components/Viewers/SourceCodeViewer";
import { serializeToHtml } from "../components/editor/serialize/slateTohHtml";
import { Descendant, createEditor } from "slate";
import { GetElementsContext } from "../context/ElementStylesContext";
import { withHistory } from "slate-history";
import { withEmbeds } from "../components/editor/helpers/withEmbeds";
import { withReact } from "slate-react";
type EditorProps = {
  content: string;
  setContent: (content: string) => void;
};
const App: React.FC<EditorProps>= ({content , setContent}) => {
  const [document, updateDocument] = useState(ExampleDocument);
  const [isSideBar, setSideBar] = useState(false);
  const [isSourceView, setSourceView] = useState(false);
  const [isViewHtml, setViewHtml] = useState(false);

  
  const [editor] = useState(() =>
    withHistory(withEmbeds(withReact(createEditor())))
  );
  editor.isInline = (element) => ["link"].includes(element.type);
  

  useEffect(() => {
    setContent(serializeToHtml(document as Descendant[]));
  }, [document]);

  return (
    <GetElementsContext>
      <div className={`md:px-5 w-full min-h-screen bg-back text-white ${!isSideBar ? "width-full" : "width-shrink"}`}>
        <div className="editor">
          <button className="px-3 py-1 bg-slate-950 text-white mt-2 rounded-2xl" onClick={() => setSourceView(!isSourceView)}>
            {isSourceView ? "Editor" : "Source Code"}
          </button>

          {!isSourceView ? (
            <SlateEditor
              editor={editor}
              document={document}
              onChange={updateDocument}
              isSidebar={isSideBar}
              setSideBar={setSideBar}
            />
          ) : (
            <SourceCodeViewer sourceCode={content} />
          )}
          <button className="px-5 py-2 bg-gray-800  rounded-lg mt-2" onClick={() => setViewHtml(!isViewHtml)}>
            {isViewHtml ? "hide html" : "show html"}
          </button>
          {isViewHtml && <HtmlViewer content={content} />}
        </div>
        <SideBar
          isSideBar={isSideBar}
          editor={editor}
          setSideBar={setSideBar}
        />
      </div>
    </GetElementsContext>
  );
};

export default App;
