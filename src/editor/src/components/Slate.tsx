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
import LinkEditor from "./render/LinkEditor";
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
  const editorRef = useRef(null) as any
  let selectionForLink = null;
  if (isLinkNodeAtSelection(editor, selection)) {
    selectionForLink = selection;
  } else if (selection == null && isLinkNodeAtSelection(editor, previousSelection)) {
    selectionForLink = previousSelection;
  }
  return (
    <Slate
      editor={editor as ReactEditor}
      initialValue={document}
      onChange={onChangeHandler}
    >
      <ViewTypesProvider>
        <Toolbar
          previousSelection={previousSelection}
          setSelection={setSelection}
          isSidebar={isSidebar}
          setSideBar={setSideBar}
        />
<div ref={editorRef}>
{isLinkNodeAtSelection(editor, selection)? <LinkEditor editor={editor} selectionForLink={selectionForLink}
             editorOffsets={
              editorRef.current != null
                ? {
                    x: editorRef.current.getBoundingClientRect().x,
                    y: editorRef.current.getBoundingClientRect().y,
                  }
                : null
            }
            /> : null}
        <EditorInput
          decorate={decorate}
          editor={editor}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
</div>
      </ViewTypesProvider>
      <EditorFooter editor={editor} setSearch={setSearch} />
    </Slate>
  );
};
