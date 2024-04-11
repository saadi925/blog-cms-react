import { CustomElement } from "../../../editor/editor";
import { getElementType } from "./getStylesOnElement";
export const getAvailableProperties = (element: CustomElement) => {
  switch (getElementType(element)) {
    case "box":
      return {
        inputElements: [
          ...availableProperties.text.inputElements,
          ...availableProperties.box.input,
          ...availableProperties.default,
        ],
        selectables: [...availableProperties.box.selectables],
      };
    case "text":
      return {
        inputElements: [
          ...availableProperties.default,
          ...availableProperties.text.inputElements,
        ],
        selectables: [...availableProperties.text.selectables],
      };
    case "image":
      return {
        inputElements: [...availableProperties.default],
        selectables: [
          ...availableProperties.box.selectables,
          ...availableProperties.image,
        ],
      };
    default:
      return {};
  }
};

const availableProperties = {
  text: {
    inputElements: ["letterSpacing", "lineHeight"],
    selectables: ["textWrap", "textDecoration", "fontWeight", "textTransform"],
  },
  box: {
    selectables: [
      "display",
      "alignSelf",
      "alignItems",
      "justifyContent",
      "flexWrap",
      "flexDirection",
      "position",
    ],
    input: ["top", "left", "bottom", "right"],
  },
  image: ["objectFit"],
  default: [
    "margin",
    "padding",
    "border",
    "borderRadius",
    "borderColor",
    "boxShadow",
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight",
    "opacity",
  ],
};
