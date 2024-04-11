import {  useSelected } from "slate-react";
export default function ImageComponent({
  style,
  attributes,
  element,
  children
} : any) {
  const isSelected = useSelected();
 
  return (
    <div contentEditable={false} className={`${isSelected ? 'active' :''}`}>
      <img 
       className="img"
        style={style}
        src={element.url}
        {...attributes}
        alt="img"
      />
      {children}
    </div>
  );
}
