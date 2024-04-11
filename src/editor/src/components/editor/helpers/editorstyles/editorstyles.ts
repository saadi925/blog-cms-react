import { Editor, Transforms, Path, BaseElement } from "slate";
import {
  CustomEditor,
  CustomElement,
  CustomStyles,
  HeadingElement,
  ImageElement,
  ParagraphElement,
  YouTubeElement,
} from "../../../editor/editor";
import { applyParagraphStyles } from "./paragraphStyles";
import { applyListStyles } from "./applyListStyles";

export const withStyles = (editor: CustomEditor) => {
  const { apply } = editor;

  editor.apply = (op) => {
    if (op.type === "set_node" && op.path && Path.isPath(op.path)) {
      setCustomStyles(op)(editor);
    } else {
      apply(op);
    }
  };

  return editor;
};

const setCustomStyles =
  (op: { path: Path; properties: any }) => (editor: CustomEditor) => {
    const [node] = Editor.node(editor, op.path);
    if (isBaseElement(node)) {
      applyStyles(editor, op.path, op.properties);
    }
    if (isParagraphElement(node as CustomElement)) {
      applyParagraphStyles(editor, op.path, op.properties);
    }

    if (isParagraphElement(node as CustomElement)) {
      applyParagraphStyles(editor, op.path, op.properties);
    }
    if (isListElement(node as CustomElement)) {
      applyListStyles(editor, op.path, op.properties);
    }
  };

export const applyStyles = (
  editor: CustomEditor,
  path: Path,
  properties: CustomStyles
) => {
  const styles = Object.entries(properties);
  styles.forEach(([key, value]) => {
    if (value !== undefined) {
      Transforms.setNodes(editor, { [key]: value }, { at: path });
    }
  });
};

export const isBaseElement = (element: any): element is BaseElement => {
  return (
    "margin" in element ||
    "padding" in element ||
    "border" in element ||
    "borderRadius" in element ||
    "borderColor" in element ||
    "boxShadow" in element ||
    "width" in element ||
    "height" in element ||
    "minWidth" in element ||
    "minHeight" in element ||
    "opacity" in element
  );
};

export const isImageElement = (
  element: ImageElement
): element is ImageElement => {
  return element.type === "image";
};
export const isParagraphElement = (
  element: CustomElement
): element is ParagraphElement => {
  return element.type === "paragraph";
};
export const isHeadingElement = (
  element: CustomElement
): element is HeadingElement => {
  return element.type === "heading";
};
export const isYouTubeElement = (
  element: CustomElement
): element is YouTubeElement => {
  return element.type === "youtube";
};
export const isListElement = (
  element: CustomElement
): element is YouTubeElement => {
  return element.type === "numbered-list" || element.type === "bulleted-list";
};
