import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { ListElement } from "../../../editor/editor";

export const applyListStyles = (
  editor: Editor,
  path: Path,
  properties: ListElement
) => {
  if (CustomEditor.isListElement(properties)) {
    const { position } = properties;

    const stylesToUpdate: Record<string, any> = {};
    if (position !== undefined) stylesToUpdate.position = position;

    // Apply the non-undefined styles using Transforms.setNodes
    Transforms.setNodes(editor, stylesToUpdate, { at: path });
  }
};
