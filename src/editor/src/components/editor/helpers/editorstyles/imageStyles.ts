import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { ImageElement } from "../../../editor/editor";
export const applyImageStyles = (
  editor: Editor,
  path: Path,
  properties: ImageElement
) => {
  const [node] = Editor.node(editor, path);
  if (CustomEditor.isImageElement(node as ImageElement)) {
    const {
      url,
      display,
      flex,
      alignSelf,
      alignItems,
      justifyContent,
      objectFit,
      position,
    } = properties;
    const newStyles = {
      flex,
      alignSelf,
      display,
      alignItems,
      justifyContent,
      objectFit,
      position,
    };
//  @ts-ignore
    Transforms.setNodes(editor, { ...node, url, ...newStyles }, { at: path });
  }
};
