import { useState } from "react";
import { SketchPicker } from "react-color";
import { RemoveItemIcon } from "../../assets/icons/AddLink";
export function ColorPallete({
  selectedColor,
  handleColorChange,close
}: {
  selectedColor: string;

  handleColorChange: (
    colorProperty: "color" | "backgroundColor",
    color: string,
  ) => void;
  close :()=> void

  handleColorPicker: () => void;
}) {
  const [colorProperty, setColorProperty] = useState<
    "color" | "backgroundColor"
  >("color");
  const handleColorProperty = () => {
    setColorProperty(colorProperty === "color" ? "backgroundColor" : "color");
  };
  return (
    <div className="absolute top-0 right-6  z-50">
      <div className="flex bg-gray-600 cursor-pointer font-semibold px-4 py-1 text-center text-white" onClick={handleColorProperty}>
        {colorProperty}
      </div>
 <div className="absolute top-0 right-0 cursor-pointer bg-black border" onClick={()=> close()}>
 <RemoveItemIcon />
 </div>
      <SketchPicker
        className="sketch-picker"
        color={selectedColor}
        onChange={(color) => handleColorChange(colorProperty, color.hex)}
      />
    </div>
  );
}
