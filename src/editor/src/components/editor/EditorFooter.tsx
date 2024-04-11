import React, { SetStateAction } from "react";
import { InputComponent } from "../SearchInput";
import { FontSizeComponent } from "./FontSizeComponent";
import { Editor } from "slate";
interface EditorFooterProps {
  editor: Editor;
  setSearch: React.Dispatch<SetStateAction<string | undefined>>;
}
export default function EditorFooter({ editor, setSearch }: EditorFooterProps) {
  return (
    <div className="px-5  text-white">
      <FontSizeComponent editor={editor} />
      <InputComponent setSearch={setSearch} />
    </div>
  );
}
