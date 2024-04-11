import { ChangeEvent, useContext } from "react";
import { ElementsContext } from "../../context/ElementStylesContext";
import { Editor } from "slate";
import {
  updateStylesByUser,
} from "../editor/helpers/blocks";
import { SelectInput } from "./SelectInput";
type ListBarElements = {
  editor: Editor;
};
export function ListSideBarElements({ editor }: ListBarElements) {
  const context = useContext(ElementsContext);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    updateStylesByUser(editor, property, event.target.value);
  };
  const selectables = context?.availableProperties?.selectables;
  const inputElements = context?.availableProperties?.inputElements;

  return (
    <div className="sidebar-elements">
      {selectables ? (
        selectables.map((e) => (
          <SelectInput key={e} editor={editor} property={e} />
        ))
      ) : (
        <div>no selectables available</div>
      )}
      {inputElements ? (
        inputElements.map((e) => (
          <div key={e} className="input-elements-wrapper">
            <label htmlFor={e}>{e}</label>
            <InputElement
              className=""
              type="string"
              placeHolder={e}
              name={e}
              handleOnChange={handleChange}
            />
          </div>
        ))
      ) : (
        <div>no input elements available</div>
      )}
    </div>
  );
}

export const InputElement = ({
  type,
  placeHolder,
  className = "",
  name,
  value,
  handleOnChange,
}: {
  type: string;
  placeHolder?: string;
  className?: string;
  name: string;
  value?: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
}) => {
  return (
    <input
      className={`input-element  ${className}`}
      type={type}
      name={name}
      
      value={value}
      max={999}
      onChange={(e) => handleOnChange(e, name)}
      placeholder={placeHolder}
    />
  );
};
