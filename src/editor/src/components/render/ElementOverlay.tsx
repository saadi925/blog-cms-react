import { useContext } from "react";
import { useSelected } from "slate-react";
import { ViewTypesContext } from "../../context/ViewTypesContext";

const ElementOverlay = (props: any) => {
  const selected = useSelected();
  const { attributes, children, type } = props
  const ctx = useContext(ViewTypesContext);
 const { isViewTypes } = ctx as any
  return (
    <div
      {...attributes}
      style={{
        position: "relative",
      }}
    >
      <div
        className={`
    ${selected ? 'border rounded-md border-blue-600' : ''}
        `}
      >
        {isViewTypes && <TypeDisplayer type={type} />}
        {children}
      </div>
    </div>
  );
};

export default ElementOverlay;

const TypeDisplayer = ({ type }: any) => {
  return (
    <div
      style={{
        position: "absolute",
        top: type === "div" ? "-40px" : "-20px",
        right: "0",
        backgroundColor: "gray",
        padding: "0.2rem 0.5rem",
        borderRadius: "4px",
        color: "white",
        fontSize: "0.8rem",
        zIndex: 2,
      }}
    >
      {type}
    </div>
  );
};
