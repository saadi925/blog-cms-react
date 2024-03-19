import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import AddIcon from "../../assets/AddIcon";
import { darkTheme } from "../../theme/COLORS";
import MinHeading from "../MinHeading";
import { ButtonWithIcon } from "../buttons/Buttons";
import { useCreateCategoryMutation } from "../../setup/store/categoryApi";
import { Category } from "./CategoryList";
import Selectable from "../Selectable";
import { useDispatch } from "react-redux";
import { createCategoryData } from "../../setup/store/slices/dataSlice";
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
  const activeInputRef = useRef(null);
  const dispatch = useDispatch();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const handleSaveCategory = async () => {
    try {
      const res = await createCategory({
        name: categoryName,
        description: categoryDescription,
        parentId: parentCategory,
      }).unwrap();
      if (res.name === categoryName) {
        setCategoryName("");
        setCategoryDescription("");
        setParentCategory("");
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
        <div className="bg-primary w-full max-w-md p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <MinHeading name="Add Category" />
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 tex-gray hover:text-gray-500 cursor-pointer"
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
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-white"
            >
              Category Name
            </label>
            <input
              ref={activeInputRef}
              type="text"
              id="categoryName"
              className="mt-1 p-2 block w-full outline-none border-white/20 border rounded-md shadow-sm focus:ring-accent/40 focus:border-accent sm:text-sm"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <Selectable
            value={parentCategory}
            setValue={setParentCategory}
            categories={categories}
          />
          <div className="mb-4">
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="categoryDescription"
              rows={3}
              className="mt-1 p-2 block w-full border-white/30 border rounded-md shadow-sm focus:ring-surface/30 focus:border-surface/80 outline-none sm:text-sm"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <ButtonWithIcon
              text="Save"
              disabled={isLoading}
              onClick={handleSaveCategory}
              icon={<AddIcon color={darkTheme.COLORS.surface} fill="#fff" />}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
