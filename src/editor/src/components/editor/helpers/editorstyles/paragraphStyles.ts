import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { ParagraphElement } from "../../../editor/editor";

export const applyParagraphStyles = (
  editor: Editor,
  path: Path,
  properties: ParagraphElement
) => {
  if (CustomEditor.isParagraphElement(properties)) {
    const {
      textAlign,
      flex,
      alignSelf,
      alignItems,
      justifyContent,
      letterSpacing,
      lineHeight,
      textDecoration,
      position,
      textProperties,
    } = properties;

    const stylesToUpdate: Record<string, any> = {};

    // Check and update each style only if it's defined
    if (textAlign !== undefined) stylesToUpdate.textAlign = textAlign;
    if (flex !== undefined) stylesToUpdate.flex = flex;
    if (alignSelf !== undefined) stylesToUpdate.alignSelf = alignSelf;
    if (alignItems !== undefined) stylesToUpdate.alignItems = alignItems;
    if (justifyContent !== undefined)
      stylesToUpdate.justifyContent = justifyContent;
    if (letterSpacing !== undefined)
      stylesToUpdate.letterSpacing = letterSpacing;
    if (lineHeight !== undefined) stylesToUpdate.lineHeight = lineHeight;
    if (textDecoration !== undefined)
      stylesToUpdate.textDecoration = textDecoration;
    if (position !== undefined) stylesToUpdate.position = position;
    if (textProperties !== undefined)
      stylesToUpdate.textProperties = textProperties;
    // Apply the non-undefined styles using Transforms.setNodes
    Transforms.setNodes(editor, stylesToUpdate, { at: path });
  }
};
