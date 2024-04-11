import { Editor } from "slate";
import { CustomEditor } from "./helpers";
import { useState } from "react";
import "../../styles/heading.css";

export const HeadingButtons = ({ editor }: { editor: Editor }) => {
  const [selectedHeading, setSelectedHeading] = useState<number | null>(0);

  const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = parseInt(event.target.value, 10);
    setSelectedHeading(selectedOption);
    CustomEditor.toggleHeading(editor, selectedOption);
  };

  return (
    <div className={` text-black max-w-lg ${selectedHeading !== null ? "open" : ""}`}>
      <select
        className="heading-select"
        value={selectedHeading !== null ? selectedHeading : undefined}
        onChange={handleHeadingChange}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((option) =>
          option === 0 ? (
            <option key={option} value={option}>
              Normal
            </option>
          ) : (
            <option key={option} value={option}>
              Heading {option}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export function calculateHeadingFontSize(level: number) {
  const baseFontSize = 16; // Default browser font size in pixels
  const sizeMultiplier = 1.5; // You can adjust this multiplier
  const fontSize = baseFontSize / Math.pow(sizeMultiplier, 6 - level);
  console.log(fontSize);
  return `${fontSize}px`;
}
