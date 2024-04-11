import { Editor, Path, Transforms } from "slate";
import { CustomEditor } from ".";

export const keyBoardShortcuts = (event: any, editor: any) => {
  switch (event.key) {
    case "`": {
      event.preventDefault();
      CustomEditor.toggleBlock(editor, "code");
      break;
    }

    case "b": {
      event.preventDefault();
      CustomEditor.toggleMark(editor, "bold");
      break;
    }
    case "i": {
      event.preventDefault();
      CustomEditor.toggleMark(editor, "italic");
      break;
    }

    case "u": {
      event.preventDefault();
      CustomEditor.toggleMark(editor, "underline");
      break;
    }
    case "s": {
      event.preventDefault();
      const content = JSON.stringify(editor.children);
      localStorage.setItem("content", content);
    }
    
  }
};
      // @ts-ignore
export const withShortcuts = (event, editor: Editor) => {
  if (!event.shiftKey) {
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n: Node) => Editor.isBlock(editor, n) && n.type === "image",
    });

    if (match) {
      const [, path] = match;
      const newParagraph = { type: "paragraph", children: [{ text: "" }] };
            // @ts-ignore
      Transforms.insertNodes(editor, newParagraph, {
        at: Path.next(path),
        select: true,
      });
    } else {
      Transforms.insertText(editor, "\n");
    }
  }
};
