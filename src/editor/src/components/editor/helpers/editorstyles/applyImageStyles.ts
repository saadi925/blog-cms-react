import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { ImageElement } from "../../../editor/editor";

export const applyImageStyles = (
  editor: Editor,
  path: Path,
  properties: ImageElement
) => {
  if (CustomEditor.isImageElement(properties)) {
    const { flex, alignItems, alignSelf, objectFit, justifyContent } =
      properties;

    const stylesToUpdate: Record<string, any> = {};

    if (flex !== undefined) stylesToUpdate.flex = flex;
    if (alignItems !== undefined) stylesToUpdate.alignItems = alignItems;
    if (alignSelf !== undefined) stylesToUpdate.alignSelf = alignSelf;
    if (objectFit !== undefined) stylesToUpdate.objectFit = objectFit;
    if (justifyContent !== undefined)
      stylesToUpdate.justifyContent = justifyContent;

    Transforms.setNodes(editor, stylesToUpdate, { at: path });
  }
};
