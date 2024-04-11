import { BaseEditor, Editor, Transforms, Path } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type AlignTextType = "left" | "center" | "right" | "justify";

export type CustomStyles = Record<string, string | number | undefined>;
export interface BoxElement extends HeadingElement {
  flex?: string | number;
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  position: "sticky" | "fixed" | "absolute" | "relative" | "static";
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  objectFit?: "contain" | "cover" | "fill" | "none";
}
export interface BaseElement {
  margin?: string;
  isBoxWrapper?: boolean;
  padding?: string;
  border?: string;
  borderRadius?: string;
  borderColor?: string;
  boxShadow?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  minWidth?: string;
  minHeight?: string;
  opacity?: number;
}

export type ParagraphElement = {
  type: "paragraph" | "quote";
  textAlign?: AlignTextType;
  flex?: number;
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  letterSpacing?: string;
  lineHeight?: string;
  textDecoration?: string;
  position?: string;
  textProperties?: string;
} & BaseElement;

export type HeadingElement = {
  type: "heading";
  level: number;
  display?: string;
  textAlign?: AlignTextType;
  letterSpacing?: string;
  lineHeight?: string;
  textDecoration?: string;
  position?: string;
  textProperties?: string;
  url?: string
  youtubeId? : string
  level?:string
  children? : {}[]
} & BaseElement;

export type CodeElement = {
  type: "code";
} & BaseElement;

export type ImageElement = {
  type: "image";
  url: string;
  position?: string;
  display?: string;
  flex?: number;
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  objectFit?: "cover" | "contain";
} & BaseElement;

export type YouTubeElement = {
  type: "youtube";
  youtubeId: string;
  position?: string;
  flex?: number;
  display?: string;
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
} & BaseElement;

export type LinkElement = {
  type: "link";
  url: string;
} & BaseElement;

export type ListElement = {
  type: "numbered-list" | "bulleted-list";
  position?: string;
} & BaseElement &
  FormattedText;

export type ListItemElement = {
  type: "list-item";
  textAlign?: AlignTextType;
} & BaseElement;

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | CodeElement
  | ImageElement
  | LinkElement
  | ListElement
  | ListItemElement
  | YouTubeElement;

export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  textAlign?: AlignTextType;
  underline?: true;
  strikethrough?: true;
  color?: string;
  background?: string;
  code?: string;
  fontSize?: string;
  fontFamily?: string;
  letterSpacing?: string;
  lineHeight?: string;
  textDecoration?: string;
} & BaseElement;

export interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
  isImageElement: (element: Element) => element is ImageElement;
}

export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
  interface BaseRange {
    highlight?: boolean;
    anchor?: { path: Path; offset: number };
    focus?: { path: Path; offset: number };
  }
}

type NodeEntry<T extends Node = Node> = [T, Path];