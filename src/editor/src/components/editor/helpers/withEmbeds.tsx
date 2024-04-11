import isUrl from "is-url";
import { Editor, Point, Range, Text, Transforms } from "slate";

export const withEmbeds = (editor: Editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "youtube" ? true : isVoid(element);
  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);
  return editor;
};


export function identifyLinksInTextIfAny(editor : any) {
  // if selection is not collapsed, we do not proceed with the link  
  // detection
  if (editor.selection == null || !Range.isCollapsed(editor.selection)) {
    return;
  }

  const [node, _] = Editor.parent(editor, editor.selection);

  // if we are already inside a link, exit early.
        // @ts-ignore
  if (node.type === "link") {
    return;
  }

  const [currentNode, currentNodePath] = Editor.node(editor, editor.selection);

  // if we are not inside a text node, exit early.
  if (!Text.isText(currentNode)) {
    return;
  }

  let [start] = Range.edges(editor.selection);
  const cursorPoint = start;

  const startPointOfLastCharacter = Editor.before(editor, editor.selection, {
    unit: "character",
  });

  const lastCharacter = Editor.string(
    editor,
          // @ts-ignore
    Editor.range(editor, startPointOfLastCharacter, cursorPoint)
  );

  if(lastCharacter !== ' ') {
    return;
  }
 
  if (lastCharacter !== " ") {
    return;
  }
  let end = startPointOfLastCharacter;
  // @ts-ignore
  start = Editor.before(editor, end, {
    unit: "character",
  });

  const startOfTextNode = Editor.point(editor, currentNodePath, {
    edge: "start",
  });

  while (
    Editor.string(editor, Editor.range(editor, start, end)) !== " " &&
    !Point.isBefore(start, startOfTextNode)
  ) {
    end = start;
          // @ts-ignore
    start = Editor.before(editor, end, { unit: "character" });
  }
      // @ts-ignore
  const lastWordRange = Editor.range(editor, end, startPointOfLastCharacter);
  const lastWord = Editor.string(editor, lastWordRange);
  if (isUrl(lastWord)) {
    Promise.resolve().then(() => {
      Transforms.wrapNodes(
        editor,
    // @ts-ignore

        { type: "link", url: lastWord, children: [{ text: lastWord }] },
        { split: true, at: lastWordRange }
      );
    });
  }

}