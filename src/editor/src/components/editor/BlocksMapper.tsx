import { Editor } from "slate";
import { IconButton } from "./ToggleButton";
import { CustomEditor } from "./helpers";
import { getIconFromStyle } from "./helpers/getIconFromStyle";

export function BlocksMapper({
  editor,
  elements,
}: {
  editor: Editor;
  elements: string[];
}) {
  return (
    <>
      {elements.map((e, index) => (
        <IconButton
          active={CustomEditor.isBlockActive(editor, e)}
          func={() => CustomEditor.toggleBlock(editor, e)}
          icon={getIconFromStyle(e)}
          key={index}
        />
      ))}
    </>
  );
}
