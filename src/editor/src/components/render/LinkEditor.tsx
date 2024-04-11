import { useCallback, useEffect, useRef, useState } from "react";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
      // @ts-ignore
export default function LinkEditor({ editor, editorOffsets, selectionForLink }) {
    const linkEditorRef = useRef(null);
          // @ts-ignore
    const [linkNode, path] = Editor.above(editor, {
        at: selectionForLink,
              // @ts-ignore
        match: (n) => n.type === "link",
    });
    useEffect(() => {
        const linkEditorEl = linkEditorRef.current;
        if (linkEditorEl == null) {
          return;
        }
    
        const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode);
        const {
          x: nodeX,
          height: nodeHeight,
          y: nodeY,
        } = linkDOMNode.getBoundingClientRect();
        let top = nodeY + nodeHeight - editorOffsets.y;
        let left = nodeX - editorOffsets.x;
              // @ts-ignore
        linkEditorEl.style.display = "block"
              // @ts-ignore
        linkEditorEl.style.top = `${top}px`
              // @ts-ignore
        linkEditorEl.style.left = `${left}px`
      }, [editor, editorOffsets.x, editorOffsets.y, linkNode]);

    if (!editorOffsets) {
        return null;
    }
    const [linkURL, setLinkURL] = useState(linkNode.url);

    useEffect(() => {
        setLinkURL(linkNode.url);
    }, [linkNode]);

    const onLinkURLChange = useCallback(
              // @ts-ignore
        (event) => setLinkURL(event.target.value),
        [setLinkURL]
    );

    const onApply = useCallback(
              // @ts-ignore
        (event) => {
            Transforms.setNodes(editor, { url: linkURL }, { at: path });
        },
        [editor, linkURL, path]
    );

    return <div style={{
        zIndex: 1000,
        padding: "1rem",
        backgroundColor: "",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
    }} ref={linkEditorRef} className={"link-editor"}>
        <input style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid blue",
            borderRadius: "5px",
            marginBottom: "0.5rem",

        }}
            type="text"
            value={linkURL}
            onChange={onLinkURLChange}
        />
        <button style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#121212",
            color: "white",
            border: "none",
            cursor: "pointer",
            

        }} onClick={onApply}>Apply</button>
    </div>;
}
