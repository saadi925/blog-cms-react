import { useState } from 'react';
import './linkmodal.css'; // Import the SCSS file for styling
import { toggleLinkAtSelection } from './editor/helpers/insertions';
import { Editor } from 'slate';

export const LinkModal = ({ editor, onClose } :{
  editor : Editor, onClose : ()=> void
}) => {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  const handleApply = () => {
    onClose();
    toggleLinkAtSelection(editor, link, name)
  };

  return (
    <div className="fixed z-50 flex gap-3  justify-center w-full ">
      <div className="bg-gray-600 text-white flex flex-col gap-3 px-4">
        <h2>Add Link</h2>
        <input className='flex mt-2 outline-none rounded-md px-2 text-back '
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text" className='flex mt-2 outline-none rounded-md px-2 text-back'
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="flex items-center justify-between w-full">
          <button className='px-5 py-2 text-white bg-gray-900 rounded-md' onClick={handleApply}>Apply</button>
          <button className='rounded-md px-5 py-2 text-white bg-gray-900' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

