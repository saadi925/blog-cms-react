const Rating = ({ defaultValue = 0, max = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          className={`text-yellow-500 ${
            index < defaultValue ? "fill-current" : "text-gray-300"
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
