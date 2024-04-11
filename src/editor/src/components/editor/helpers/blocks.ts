import { CustomElement } from "../../editor/editor";
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "../Toolbar";
import { Editor, Transforms, Element as SlateElement, Range } from "slate";
export const isHeadingActive = (editor: Editor, level: number) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === "heading" && n.level === level,
  });

  return !!match;
};

export const toggleHeading = (editor: Editor, level: number) => {
  const isActive = isHeadingActive(editor, level);
  const type = isActive || level === 0 ? "paragraph" : "heading";
  Transforms.setNodes(editor, { type, level });
};

export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
        n[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "textAlign" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;

  if (TEXT_ALIGN_TYPES.includes(format as string)) {
    newProperties = {
            // @ts-ignore
      textAlign: isActive ? undefined : format,
    };
  } else {
    newProperties = {
            // @ts-ignore
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
          // @ts-ignore
    const block: SlateElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const handleFlexPropertyChange = (
  editor: Editor,
  property: string,
  value: any
) => {
  // Use Transforms to update the flex property
      // @ts-ignore
  Transforms.setNodes(editor, { [property]: value }, { at: editor.selection });
};

export const propertyChangeAtSelection = (
  editor: Editor,
  property: string,
  value: any
) => {
  console.log(property, value);
      // @ts-ignore
  // Use Transforms to update the flex property
  Transforms.setNodes(editor, { [property]: value }, { at: editor.selection });
};

export const isBoxWrapperActive = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && "isBoxWrapper" in n && n.isBoxWrapper === true,
  });

  return !!match;
};

export const updateStylesByUser = (
  editor: Editor,
  property: string,
  value: string
) => {
  const [boxNode] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && "isBoxWrapper" in n && n.isBoxWrapper === true,
  });

  if (boxNode) {
    // If inside a box, update its styles
    const [, path] = boxNode;
    const start = Editor.start(editor, path); // Fix: Convert BaseRange to Path using Editor.start

    const end = Editor.end(editor, path);
    Transforms.setNodes(
      editor,
      // @ts-ignore
      { style: { [property]: value } },
      { at: { anchor: start, focus: end } }
    );
  } else {
    Transforms.setNodes(
      editor,
      { [property]: value },
            // @ts-ignore
      { at: editor.selection }
    );
  }
};

export const updateBoxStylesAtSelection = (
  editor: Editor,
  boxStyles: Record<string, string>
) => {
  const [boxNode] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && "isBoxWrapper" in n && n.isBoxWrapper === true,
  });

  if (boxNode) {
    // If inside a box, update its styles
    const [, path] = boxNode;
    const start = Editor.start(editor, path); // Fix: Convert BaseRange to Path using Editor.start
    const end = Editor.end(editor, path);

    Transforms.setNodes(
      editor,
            // @ts-ignore
      { style: boxStyles },
      { at: { anchor: start, focus: end } }
    );
  }
};
export const toggleBoxWrapper = (editor: Editor): void => {
  const isActive = isBoxWrapperActive(editor);

  // If already wrapped, unwrap the box
  if (isActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && "isBoxWrapper" in n && n.isBoxWrapper === true,
      split: true,
    });
  } else {
    // If not wrapped, wrap the selection in a box
    const selection = editor.selection;
    if (selection) {
      const [start, end] = Range.edges(selection);
      const box: CustomElement = {
              // @ts-ignore
        type: "div",
        isBoxWrapper: true,
        children: [],
      };

      Transforms.wrapNodes(editor, box, { at: { anchor: start, focus: end } });
    }
  }
};
