type SlateBtnProps = {
  active: boolean;
  label: string;
  activeClass?: string;
  styles?: string;
  onMouseDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export const SlateButton: React.FC<SlateBtnProps> = ({
  active,
  label,
  activeClass,
  styles,
  onMouseDown = () => {},
}) => (
  <button
    className={`${styles ? styles : "option"} ${
      active ? `${activeClass ? activeClass : "active"} ` : ""
    }`}
    onMouseDown={onMouseDown}
  >
    {label}
  </button>
);

type IconBtnProps = {
  icon: React.ReactElement;
  active: boolean;
  func: () => void;
};

export const IconButton = ({ icon, active, func }: IconBtnProps) => {
  return (
    <button
      className={`icon-btn  mx-2 ${active ? "bg-blue-600 rounded-md px-2" : ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
        func();
      }}
    >
      {icon}
    </button>
  );
};
