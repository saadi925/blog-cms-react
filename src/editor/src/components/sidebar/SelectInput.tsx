import { Editor } from "slate";
import {
  updateStylesByUser,
} from "../editor/helpers/blocks";
import { getSideBarSelectables } from "./SideBarValues";

export function SelectInput({
  editor,
  property,
}: {
  editor: Editor;
  property: string;
}) {
  const selectables = getSideBarSelectables(property);

  return (
    <div className="select-input-box">
      <label htmlFor={property}>{property}</label>
      <select
        onChange={(e) => {
          updateStylesByUser(editor, property, e.target.value);
          console.log(property, e.target.value);
        }}
      >
        {selectables &&
          selectables?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
      </select>
    </div>
  );
}
