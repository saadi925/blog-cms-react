import { ReactEditor } from "slate-react";
import { SetStateAction, useCallback, useRef } from "react";
import { Editor } from "slate";
import { Slate } from "slate-react";
import Toolbar from "./editor/Toolbar";
import useSelection from "./editor/hooks/useSelection";
import { useEditorConfig } from "./editor/hooks/useEditorConfig";
import { EditorInput } from "./editor/EditorInput";
import EditorFooter from "./editor/EditorFooter";
import ViewTypesProvider from "../context/ViewTypesContext";
import { isLinkNodeAtSelection } from "./editor/helpers/insertions";
import { identifyLinksInTextIfAny } from "./editor/helpers/withEmbeds";
export const SlateEditor = ({
  document,
  onChange,
  isSidebar,
  setSideBar,
  editor,
}: {
  document: any;
  onChange: any;
  isSidebar: boolean;
  editor: Editor;
  setSideBar: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { renderElement, renderLeaf, decorate, setSearch } = useEditorConfig();
  const [previousSelection, selection, setSelection] = useSelection(editor)

  const onChangeHandler = useCallback(
    (document: any) => {
      onChange(document);
      identifyLinksInTextIfAny(editor)
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );
  let selectionForLink = null;
  if (isLinkNodeAtSelection(editor, selection)) {
    selectionForLink = selection;
  } else if (selection == null && isLinkNodeAtSelection(editor, previousSelection)) {
    selectionForLink = previousSelection;
  }
  return (
  <div className="relative">
      <Slate
      editor={editor as ReactEditor}
      initialValue={document}
      onChange={onChangeHandler}
    >
      <ViewTypesProvider>
        <EditorFooter editor={editor} setSearch={setSearch} />
        <Toolbar
          previousSelection={previousSelection}
          setSelection={setSelection}
          isSidebar={isSidebar}
          setSideBar={setSideBar}
        />
        <EditorInput
          decorate={decorate}
          editor={editor}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </ViewTypesProvider>
    </Slate>
  </div>
  );
};
