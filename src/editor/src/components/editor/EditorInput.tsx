import { BaseRange, Editor, NodeEntry } from "slate";
import { Editable } from "slate-react";
import { keyBoardShortcuts, withShortcuts } from "./helpers/keyShortcuts";
import { CustomEditor } from "./helpers";

type EditorInputProps = {
  decorate: ((entry: NodeEntry) => BaseRange[]) | undefined;
  renderElement: ((props: any) => JSX.Element) | undefined;
  renderLeaf: ((props: any) => JSX.Element) | undefined;
  editor: Editor;
};

export const EditorInput: React.FC<EditorInputProps> = ({
  decorate,
  renderElement,
  renderLeaf,
  editor,
}) => {
  return (
    <Editable
      className="h-[70vh] max-h-[70vh] overflow-y-auto  border outline-none  bg-gray-800 text-white"
      decorate={decorate}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={(event) => {
        withShortcuts(event, editor);
        if (!event.ctrlKey) {
          return;
        }
        keyBoardShortcuts(event, editor);
      }}
      onPaste={(event) => CustomEditor.handlePaste(event, editor)}
    />
  );
};
