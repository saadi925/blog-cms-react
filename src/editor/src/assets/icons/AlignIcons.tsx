export const JustifyAlignIcon = ({ size = 32, fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" y1="6" x2="3" y2="6"></line>
      <line x1="21" y1="10" x2="3" y2="10"></line>
      <line x1="21" y1="14" x2="3" y2="14"></line>
      <line x1="21" y1="18" x2="3" y2="18"></line>
    </svg>
  );
};

export const LeftAlignIcon = ({ size = 32, fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      id="left-alignment"
    >
      <path d="M13,16H3a1,1,0,0,0,0,2H13a1,1,0,0,0,0-2ZM3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,3H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
    </svg>
  );
};

export const RightAlignIcon = ({ size = 32, fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M13,16H21a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2ZM3,8H3A1,1,0,0,0,3,10H21A1,1,0,0,0,21,8ZM5,13H21a1,1,0,0,0,0-2H5a1,1,0,0,0,0,2Z" />
    </svg>
  );
};

export const CenterAlignIcon = ({ size = 32, fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      id="center-alignment"
    >
      <path d="M3,7H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,7ZM7,9a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm14,4H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z"></path>
    </svg>
  );
};

export const AlignCenterIcon = ({ size = 32, fill = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      id="align-center"
    >
      <path d="M5,8H19a1,1,0,0,0,0-2H5A1,1,0,0,0,5,8Zm16,3H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-2,5H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"></path>
    </svg>
  );
};

export const AlignIcon = ({ size = 32, fill = "#000", alignment = "left" }) => {
  switch (alignment) {
    case "left":
      return <LeftAlignIcon size={size} fill={fill} />;
    case "right":
      return <RightAlignIcon size={size} fill={fill} />;
    case "justify":
      return <JustifyAlignIcon size={size} fill={fill} />;
    case "center":
      return <CenterAlignIcon size={size} fill={fill} />;
  }
};
