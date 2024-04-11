import { Editor, Transforms } from "slate";
import imageExtensions from "image-extensions";
import { ImageElement } from "../../editor/editor";
import isUrl from "is-url";
import { Range } from "slate";
import { Element } from "slate";
import { ReactEditor } from "slate-react";
import { identifyLinksInTextIfAny } from "./withEmbeds";

export const insertImage = (editor: Editor, url: string) => {
  const image: ImageElement = {
    type: "image",
    url,
    width: "200px",
    height: "150px",
    // @ts-ignore
    children: [{ text: "" }],
  };

  // Insert the image as a void element
  Transforms.insertNodes(editor, image);

  // Move to the next line
  Transforms.insertNodes(editor, {
    type: "paragraph",
    // @ts-ignore

    children: [{ text: "" }],
  });

  // Move the selection to the new paragraph
  Transforms.move(editor);

  // Ensure the editor is focused
  ReactEditor.focus(editor);
};

export const removeImage = (editor: Editor, imageUrlToRemove: string) => {
  Transforms.removeNodes(editor, {
    match: (node) =>
      Element.isElement(node) &&
      node.type === "image" &&
      node.url === imageUrlToRemove,
  });
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  if (!ext) return false;
  return imageExtensions.includes(ext);
};


export const removeLink = (editor: Editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};




const embedRegexes = [
  {
    // https://youtu.be/yXd0z1shhoU  && https://www.youtube.com/watch?v=yXd0z1shhoU && https://www.youtube.com/watch?v=5qap5aO4i9A
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
    embed: (id: string) => ({
      type: "youtube",
      youtubeId: id,
      children: [{ text: "" }],
    }),
  },
];

export const handleEmbed = (
  editor: Editor,
  event: React.ClipboardEvent<HTMLDivElement>
) => {
  const text = event.clipboardData?.getData("text/plain");
  if (!text) return;
  for (const { regex, embed } of embedRegexes) {
    const match = text.match(regex);
    if (match) {
      event.preventDefault();
      const id = match[1];
      const element = embed(id);
            // @ts-ignore
      Transforms.insertNodes(editor, element);

      // Insert a new paragraph after the embedded video
      const newParagraph = { type: "paragraph", children: [{ text: "" }] };
            // @ts-ignore
      Transforms.insertNodes(editor, newParagraph, {
        at: Editor.end(editor, []),
      });

      return;
    }
  }
};

export const handlePaste = (
  event: React.ClipboardEvent<HTMLDivElement>,
  editor: Editor
) => {

  handleEmbed(editor, event);
  identifyLinksInTextIfAny(editor)
  console.log(event.clipboardData?.getData("text/plain"));
};
      // @ts-ignore
export function isLinkNodeAtSelection(editor: Editor, selection) {
  if (selection == null) {
    return false;
  }

  return (
    Editor.above(editor, {
      at: selection,
            // @ts-ignore
      match: (n) => n.type === "link",
    }) != null
  );
}

      // @ts-ignore
export function toggleLinkAtSelection(editor, link , name) {
  if (!isLinkNodeAtSelection(editor, editor.selection)) {
    const isSelectionCollapsed =
      Range.isCollapsed(editor.selection);
    if (isSelectionCollapsed) {
      Transforms.insertNodes(
        editor,
        {
          type: "link",
          url: link,
    // @ts-ignore
     
          children: [{ text: name }],
        },
        { at: editor.selection }
      );
    } else {
      Transforms.wrapNodes(
        editor,
    // @ts-ignore

        { type: "link", url: link, children: [{ text: '' }] },
        { split: true, at: editor.selection }
      );
    }
  } else {
    Transforms.unwrapNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "link",
    });
  }
}