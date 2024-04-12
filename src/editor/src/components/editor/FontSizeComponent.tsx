import { useState, useEffect } from "react";
import { toggleFontSize } from "./helpers/marks";
import { Editor } from "slate";

export function FontSizeComponent({ editor }: { editor: Editor }) {
  const [fontSize, setFontSize] = useState("16");


  const handleFontSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value >= "0" && value < "92") {
      setFontSize(value);
      toggleFontSize(editor, `${value}px`);
    }
  };

  const handleFontSizeSelect = (selectedSize: string) => {
    toggleFontSize(editor, `${selectedSize}px`);
    setFontSize(selectedSize);
  };

  return (
    <div className={"font-size-container"}>
      <label>Font Size</label>
      <input
        className="bg-gray-600 rounded-lg text-white px-2"
        style={{ outline: "none", border: "none", width: "5rem" }}
        type="number"
        placeholder="Font Size"
        value={fontSize}
        onChange={handleFontSizeChange}
      />
      <select
        className="bg-gray-600 text-white px-2 py-1 rounded-lg"
        value={fontSize}
        onChange={(e) => handleFontSizeSelect(e.target.value)}
      >
        <option value="12">12px</option>
        <option value="16">16px</option>
        <option value="20">20px</option>
        <option value="24">24px</option>
        <option value="28">28px</option>
        <option value="32">32px</option>
        <option value="36">36px</option>
      </select>
    </div>
  );
}
