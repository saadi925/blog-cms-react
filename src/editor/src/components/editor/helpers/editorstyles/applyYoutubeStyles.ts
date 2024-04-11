import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from "..";
import { CustomElement } from "../../../editor/editor";

export const applyYouTubeStyles = (
  editor: Editor,
  path: Path,
  properties: CustomElement
) => {
  if (CustomEditor.isYouTubeElement(properties)) {
    const { flex, alignSelf, alignItems, justifyContent, display, position } =
      properties;

    const stylesToUpdate: Record<string, any> = {};

    // Check and update each style only if it's defined
    if (flex !== undefined) stylesToUpdate.flex = flex;
    if (alignSelf !== undefined) stylesToUpdate.alignSelf = alignSelf;
    if (alignItems !== undefined) stylesToUpdate.alignItems = alignItems;
    if (justifyContent !== undefined)
      stylesToUpdate.justifyContent = justifyContent;
    if (position !== undefined) stylesToUpdate.position = position;
    if (display !== undefined) stylesToUpdate.display = display;
    // Apply the non-undefined styles using Transforms.setNodes
    Transforms.setNodes(editor, stylesToUpdate, { at: path });
  }
};
