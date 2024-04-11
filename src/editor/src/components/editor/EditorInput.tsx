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
      className="min-h-96 p-2 border outline-none  bg-gray-800 text-white"
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
