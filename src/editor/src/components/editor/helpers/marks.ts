import { Editor, Transforms, Text } from "slate";

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
type COLOR_PROPERTY = "color" | "backgroundColor";
export const toggleColorMark = (
  editor: Editor,
  property: "color" | "backgroundColor",
  color: string
) => {
  const isColorActive = isColorMarkActive(editor, property);

  Transforms.setNodes(
    editor,
    { [property]: isColorActive ? color : "white" },
    { match: (n) => Text.isText(n), split: true }
  );
};

export const isColorMarkActive = (editor: Editor, property: COLOR_PROPERTY) => {
  const [match] = Editor.nodes(editor, {
          // @ts-ignore
    match: (n) => Text.isText(n) && n[property],
    mode: "all",
  });
  return !!match;
};

export const isAlignActive = (editor: Editor, align: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.textAlign === align,
    mode: "all",
  });
  return !!match;
};

export const toggleAlignMark = (
  editor: Editor,
  align: "right" | "left" | "center" | "justify"
) => {
  const isActive = isAlignActive(editor, align);
  Transforms.setNodes(editor, { textAlign: isActive ? undefined : align });
};

export const isFontSizeActive = (editor: Editor, fontSize: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.fontSize === fontSize,
    mode: "all",
  });
  return !!match;
};

export const toggleFontSize = (editor: Editor, fontSize: string) => {
  const {selection} = editor
  const isActive = isFontSizeActive(editor, fontSize);
  Transforms.setNodes(editor, { fontSize: isActive ? undefined : fontSize }, {at: selection});
  
};
