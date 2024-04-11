import { BoxElement, CustomElement, FormattedText } from "../../../editor/editor";

const getStylesForTextElement = (element: FormattedText) => {
  const {
    background,
    backgroundColor,
    margin,
    padding,
    fontFamily,
    fontSize,
    bold,
    boxShadow,
    border,
    borderColor,
    borderRadius,
    italic,
    code,
    color,
    letterSpacing,
    lineHeight,
    textDecoration,
    underline,
    textAlign,
    strikethrough,
    minHeight,
    minWidth,
    width,
    height,
  } = element;
  const styles: Record<string, any> = {
    background,
    backgroundColor,
    margin,
    padding,
    fontFamily,
    fontSize,
    bold,
    boxShadow,
    border,
    borderColor,
    borderRadius,
    italic,
    code,
    color,
    underline,
    textAlign,
    strikethrough,
    minHeight,
    minWidth,
    width,
    height,
    letterSpacing,
    lineHeight,
    textDecoration,
  };
  Object.keys(styles).forEach(
    (key) => styles[key] === undefined && delete styles[key]
  );
  return styles;
};

export const getStylesForBox = (element: BoxElement) => {
  const {
    flex,
    alignSelf,
    alignItems,
    justifyContent,
    position,
    margin,
    objectFit,
    padding,
    display,
    border,
    borderRadius,
    borderColor,
    boxShadow,
    width,
    height,
    minWidth,
    minHeight,
    opacity,
    backgroundColor,
    textAlign,
    textDecoration,
    textProperties,
    top,
    left,
    letterSpacing,
    lineHeight,
    bottom,
    right,
  } = element;

  const styles: Record<string, any> = {
    flex,
    alignSelf,
    alignItems,
    justifyContent,
    display,
    position,
    margin,
    padding,
    border,
    borderRadius,
    objectFit,
    borderColor,
    boxShadow,
    width,
    height,
    minWidth,
    minHeight,
    opacity,
    backgroundColor,
    textAlign,
    textDecoration,
    textProperties,
    top,
    left,
    letterSpacing,
    lineHeight,
    bottom,
    right,
  };

  Object.keys(styles).forEach(
    (key) => styles[key] === undefined && delete styles[key]
  );
  return styles;
};

export const getStylesForElement = (element: CustomElement) => {
  switch (getElementType(element)) {
    case "box":
      return getStylesForBox(element as BoxElement);
    case "text":
      return getStylesForTextElement(element as FormattedText);
    case "image":
      return getStylesForBox(element as BoxElement);
    default:
      return {};
  }
};

type getElemType = (e: CustomElement) => "text" | "image" | "box" | undefined;
//  check if its a box , text or image element
export const getElementType: getElemType = (element: CustomElement) => {
  if (element.isBoxWrapper) {
    return "box";
  }
  if (
    element.type === "code" ||
    element.type === "quote" ||
    element.type === "heading" ||
    element.type === "paragraph"
  ) {
    return "text";
  } else if (element.type === "image" || element.type === "youtube") {
    return "image";
  } else if (
    element.type === "numbered-list" ||
    element.type === "bulleted-list" ||
    element.type === "list-item" ||
    element.type === "link" || element.type == "youtube"
  ) {
    return "box";
  }
};
