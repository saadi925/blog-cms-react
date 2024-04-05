import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import AddIcon from "../../assets/AddIcon";
import { darkTheme } from "../../theme/COLORS";
import MinHeading from "../MinHeading";
import AppButton, { ButtonWithIcon } from "../buttons/Buttons";
import { useCreateCategoryMutation } from "../../setup/store/categoryApi";
import { Category } from "./CategoryList";
import Selectable from "../Selectable";
import { useDispatch } from "react-redux";
import { createCategoryData } from "../../setup/store/slices/dataSlice";
import CloseIcon from "../../assets/CloseIcon";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  categories,
  isOpen,
  onClose,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const activeInputRef = useRef(null);
  const dispatch = useDispatch();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
   const [error, setError] = useState('')
  const handleSaveCategory = async () => {
    try {
      if (!categoryName || categoryName.length < 3) {
        setError('invalid category name')
        return
      }
      const res = await createCategory({
        name: categoryName,
        description: categoryDescription,
        parentId: parentCategory,
        thumbnail: thumbnail, // Add thumbnail to the request
      }).unwrap();
      if (res.name === categoryName) {
        setCategoryName("");
        setCategoryDescription("");
        setParentCategory("");
        setThumbnail("");
        onClose();
        dispatch(createCategoryData(res));
      }
    } catch (error) {
      console.log("Error creating category", error);
    }
  };

  return (
    <Dialog
      initialFocus={activeInputRef}
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-primary border border-surface/50 w-full max-w-md p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <MinHeading name="Add Category" />
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-500"
            >
              Category Name
            </label>
            <input
              ref={activeInputRef}
              type="text"
              id="categoryName"
              className="mt-1 p-2 block w-full outline-none border-gray-500/20 border rounded-md shadow-sm focus:ring-accent/40 focus:border-accent sm:text-sm"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-500"
            >
              Thumbnail (URL)
            </label>
            <input
              type="text"
              id="thumbnail"
              className="mt-1 p-2 block w-full outline-none border-gray-500/20 border rounded-md shadow-sm focus:ring-accent/40 focus:border-accent sm:text-sm"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
            {thumbnail && (
              <div className="mt-2">
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
          <Selectable
            value={parentCategory}
            setValue={setParentCategory}
            categories={categories}
          />
          <div className="mb-4">
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-gray-500"
            >
              Description
            </label>
            <textarea
              id="categoryDescription"
              rows={3}
              className="mt-1 p-2 block w-full border-gray-500/30 border rounded-md shadow-sm focus:ring-surface/30 focus:border-surface/80 outline-none sm:text-sm"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
           <AppButton name='Save' onClick={()=> handleSaveCategory()}/>
          </div>
          <p className="text-center text-error">{error}</p>
        </div>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
