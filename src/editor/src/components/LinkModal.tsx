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
    <div className="absolute top-6 z-50 flex gap-3  justify-center w-full ">
      <div className="  flex flex-col gap-3 px-4 bg-slate-950 rounded-2xl py-2">
        <h2>Add Link</h2>
        <input className='flex mt-2 outline-none rounded-md px-2 text-black  '
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text" className='flex mt-2 outline-none rounded-md px-2 text-black '
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

