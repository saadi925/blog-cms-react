import { useState } from "react";

const Rating = ({ defaultValue = 0, max = 5 }) => {
  const [value, setValue] = useState(defaultValue);

  // const handleClick = (newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          className={`text-yellow-500 ${
            index < value ? "fill-current" : "text-gray-300"
          }`}
          // onClick={() => handleClick(index + 1)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;
