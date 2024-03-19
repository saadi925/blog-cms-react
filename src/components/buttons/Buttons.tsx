export const ButtonWithIcon = (props: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      className="bg-surface flex items-center border border-transparent transtion-all duration-300 text-white font-semibold rounded-full hover:bg-surface/60 active:bg-black active:border-primary py-1 px-5 "
    >
      <IconButton icon={props.icon} className="" />
      <p className="hidden md:block"> {props.text}</p>
    </button>
  );
};
export const IconButton = ({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className: string;
}) => {
  return <span className={className ?? ""}>{icon}</span>;
};

const AppButton = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className="bg-surface border border-transparent transtion-all duration-300 text-white font-semibold rounded-full hover:bg-surface/60 active:bg-black active:border-primary py-3 px-5 "
    >
      {name}
    </button>
  );
};

export default AppButton;
