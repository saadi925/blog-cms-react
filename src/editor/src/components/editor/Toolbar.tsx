import { CustomEditor } from "./helpers";
import { useSlate } from "slate-react";
import { IconButton } from "./ToggleButton";
import { AlignIcon, ColorIcon, MenuIcon } from "../../assets/icons";
import { MarksMapper } from "./MarksMapper";
import { getIconFromStyle } from "./helpers/getIconFromStyle";
import React, { SetStateAction, useContext, useState } from "react";
import { ColorPallete } from "../color/ColorPallete";
import { BlocksMapper } from "./BlocksMapper";
import { ViewTypesContext } from "../../context/ViewTypesContext";
import EyeIcon, { EyeOffIcon } from "../../assets/icons/EyeIcon";
import { isLinkNodeAtSelection } from "./helpers/insertions";
import { LinkModal } from "../LinkModal";
import { HeadingButtons } from "./HeadingButtons";
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const BLOCKS = ["numbered-list", "bulleted-list", "quote"];
type Align = "left" | "right" | "center" | "justify";
export const MARKS_ELEMENTS = ["bold", "italic", "underline", "code"];
export default function Toolbar({
  // setSelection,
  // previousSelection,
  setSideBar,
}: {
  isSidebar: boolean;
  setSideBar: React.Dispatch<SetStateAction<boolean>>;
  setSelection: any;
  previousSelection: any;
}) {
  const [isLinkModal, setLinkModal] = useState(false);
  const viewTypesCtx= useContext(ViewTypesContext);
  const [isColorPicker, setColorPicker] = useState(false);
  const editor = useSlate();
  const [color, setColor] = useState("");
  const handleColorChange = (
    property: "color" | "backgroundColor",
    color: string
  ) => {
    setColor(color);
    CustomEditor.toggleColorMark(editor, property, color);
  };

  const handleColorPicker = () => {
    setColorPicker(!isColorPicker);
  };
  const { isViewTypes, switchViewTypes }  = viewTypesCtx as any
  return (
    <div className="flex overflow-x-auto py-2    max-w-[95vw]" >
        <MarksMapper elements={MARKS_ELEMENTS} editor={editor} />
        <BlocksMapper editor={editor} elements={BLOCKS} />
        {TEXT_ALIGN_TYPES.map((e, index) => (
          <IconButton
            key={index}
            // @ts-ignore
            icon={<AlignIcon fill="#fff" alignment={e} />}
            func={() => CustomEditor.toggleAlignMark(editor, e as Align)}
            active={CustomEditor.isAlignActive(editor, e)}
          />
        ))}
        <IconButton
          icon={getIconFromStyle("insert-image")}
          func={() => {
            const url = window.prompt("Enter the URL of the image:");
            if (!url) return;
            CustomEditor.insertImage(editor, url);
          }}
          active={false}
        />

       <IconButton
          icon={getIconFromStyle("insert-link")}

          func={() => {
            setLinkModal(!isLinkModal);
          }}
          active={isLinkNodeAtSelection(editor, editor.selection)}
        />
  {isLinkNodeAtSelection(editor, editor.selection) || isLinkModal && (
    <LinkModal onClose={()=> setLinkModal(false)} editor={editor}/>
  )}
        <IconButton
          icon={getIconFromStyle("box")}
          func={() => {
            CustomEditor.toggleBoxWrapper(editor);
          }}
          active={CustomEditor.isBoxWrapperActive(editor)}
        />
        <IconButton
          icon={isViewTypes ? <EyeIcon /> : <EyeOffIcon />}
          active={isViewTypes}
          func={switchViewTypes}
        />
      {isColorPicker && (
        <ColorPallete close={()=> setColorPicker(false)}
          selectedColor={color}
          handleColorChange={handleColorChange}
          handleColorPicker={handleColorPicker}
        />
      )}
      
      <HeadingButtons editor={editor}/>
      <div className="flex">
        <span onClick={handleColorPicker}>
          <IconButton
            icon={<ColorIcon fill={color} />}
            func={() => {}}
            active={false}
          />
        </span>
        <span className="cursor-pointer" onClick={() => setSideBar((prev) => !prev)}>
          <MenuIcon fill="#fff" />Menu
        </span>
      </div>
    </div>
  );
}


