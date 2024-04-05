import { useState } from 'react';
import CloseIcon from '../assets/CloseIcon';

const Tags = ({
    tags,
    setTags
}) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border focus-within:border-surface bg-background rounded-md shadow-sm">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center bg-background rounded-md px-3 py-1">
          <span className="mr-2">{tag}</span>
          <button onClick={() => handleTagRemove(index)} className="focus:outline-none">
            <CloseIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e)=> {
            if (e.key === 'Enter') {
                e.preventDefault();
            handleInputKeyPress(e)
            }
        }}
        placeholder="Enter tag..."
        className="flex-grow px-3 bg-background  py-1 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default Tags;
