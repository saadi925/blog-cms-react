import React from 'react';

interface Props {
 size? : number
  fill? : string
}

const CloseIcon: React.FC<Props> = ({
    size =32
}) => {
  return (
<svg height={size} width={size} 
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-surface hover:text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
  );
};

export default CloseIcon;