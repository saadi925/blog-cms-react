import { useContext, useEffect } from "react";
import {
  Availableproperties,
  ElementsContext,
} from "../../../context/ElementStylesContext";
import { getAvailableProperties } from "../helpers/editorstyles/getAvailableProperties";
import { CustomElement } from "../../editor/editor";

export default function useGetProperties(
  focused: boolean,
  selected: boolean,
  element: CustomElement
) {
  const { availableProperties, handleAvailableProperties } = useContext(
    ElementsContext
  ) as Availableproperties;
  useEffect(() => {
    if (selected && focused) {
      const properties = getAvailableProperties(element);
      if (properties.inputElements && properties.selectables) {
        handleAvailableProperties(properties);
      }
    }
  }, [selected, focused, element]);
  return { availableProperties, handleAvailableProperties };
}
