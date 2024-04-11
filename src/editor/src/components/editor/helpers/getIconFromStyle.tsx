import { BoxIcon } from "../../../assets/BoxIcon";
import {
  AddImageIcon,
  AddLinkIcon,
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  QouteIcon,
  UnderlineIcon,
} from "../../../assets/icons";
import {
  FlexAlignLeft,
  FlexAlignRight,
} from "../../../assets/icons/FlexIcons.";
import ListIcon, { NumberedList } from "../../../assets/icons/ListIcon";

export const getIconFromStyle = (style: string, fill = "#fff") => {
  switch (style) {
    case "box":
      return <BoxIcon fill={fill} />;
    case "bold":
      return <BoldIcon fill={fill} />;
    case "italic":
      return <ItalicIcon fill={fill} />;
    case "underline":
      return <UnderlineIcon fill={fill} />;
    case "code":
      return <CodeIcon fill={fill} />;
    case "numbered-list":
      return <NumberedList fill={fill} />;
    case "bulleted-list":
      return <ListIcon fill={fill} />;
    case "insert-image":
      return <AddImageIcon fill={fill} />;
    case "insert-link":
      return <AddLinkIcon fill={fill} />;
    case "quote":
      return <QouteIcon fill={fill} />;
    case "flex-right":
      return <FlexAlignRight />;
    case "flex-left":
      return <FlexAlignLeft />;

    default:
      return <></>;
  }
};
