import { SetStateAction } from "react";
import { Editor } from "slate";
import { ListSideBarElements } from "./ListSideBarElements";
import { RemoveItemIcon } from "../../assets/icons/AddLink";
interface SideBarProps {
  isSideBar: boolean;
  setSideBar: React.Dispatch<SetStateAction<boolean>>;
  editor: Editor;
}
export default function SideBar({
  isSideBar,
  setSideBar,
  editor,
}: SideBarProps) {
  return (
    <div className={`sidebar ${isSideBar ? "sidebar-open" : "sidebar-close"}`}>
      <div className={`sidebar-wrapper `}>
        <div className="sidebar-header" onClick={() => setSideBar(!isSideBar)}>
          <h2>Menu</h2>
          <RemoveItemIcon />
        </div>
        <ListSideBarElements editor={editor} />
      </div>
    </div>
  );
}
