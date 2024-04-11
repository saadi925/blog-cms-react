import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { CustomElement } from "../../../editor/editor";

export const applyHeadingStyles = (
  editor: Editor,
  path: Path,
  properties: CustomElement
) => {
  if (CustomEditor.isHeadingElement(properties)) {
    const {
      letterSpacing,
      lineHeight,
      textDecoration,
      position,
      textAlign,
    } = properties;
    const stylesToUpdate: Record<string, any> = {};

    if (letterSpacing !== undefined)
      stylesToUpdate.letterSpacing = letterSpacing;
    if (lineHeight !== undefined) stylesToUpdate.lineHeight = lineHeight;
    if (textDecoration !== undefined)
      stylesToUpdate.textDecoration = textDecoration;
    if (position !== undefined) stylesToUpdate.position = position;
    if (textAlign !== undefined) stylesToUpdate.textAlign = textAlign;

    Transforms.setNodes(editor, stylesToUpdate, { at: path });
  }
};
