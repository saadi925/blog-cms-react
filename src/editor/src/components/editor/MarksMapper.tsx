import { Editor } from "slate";
import { IconButton } from "./ToggleButton";
import { CustomEditor } from "./helpers";
import { getIconFromStyle } from "./helpers/getIconFromStyle";

export function MarksMapper({
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
          active={CustomEditor.isMarkActive(editor, e)}
          func={() => CustomEditor.toggleMark(editor, e)}
          icon={getIconFromStyle(e)}
          key={index}
        />
      ))}
    </>
  );
}
