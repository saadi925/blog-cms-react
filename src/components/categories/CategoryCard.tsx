import { useState } from "react";
import { motion } from "framer-motion";
import { Category } from "./CategoryList";
import DeleteIcon from "../../assets/DeleteIcon";
import EditIcon from "../../assets/EditIcon";
import { darkTheme } from "../../theme/COLORS";
import { useDeleteCategoryMutation } from "../../setup/store/categoryApi";
import { deleteCategoryById } from "../../setup/store/slices/dataSlice";
import { useDispatch } from "react-redux";

const CategoryCard = ({ category }: { category: Category }) => {
  const [isOpen, setOpen] = useState(false);
  const isArray = Array.isArray(category.subcategories);
  const dispatch = useDispatch();
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();
  const handleCategoryDelete = async (id: number) => {
    try {
      const deleted = await deleteCategory(id).unwrap();
      dispatch(deleteCategoryById(deleted.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-4">
      <motion.div
        className="bg-background relative text-white rounded-md cursor-pointer shadow-md px-4 py-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex justify-between">
          <p className="text-lg font-bold" onClick={() => setOpen(!isOpen)}>
            {category.name}
          </p>
          <button
            disabled={deleteLoading}
            className="hover:bg-white/20 disabled:bg-black"
            onClick={() => handleCategoryDelete(category.id)}
          >
            <DeleteIcon size={32} fill={darkTheme.COLORS.error} />
          </button>
        </div>
      </motion.div>
      <div className="relative top-0 w-full">
        {isOpen && category.subcategories && (
          <div className="pl-4 absolute z-50 bg-primary rounded-lg w-full">
            {isArray &&
              category.subcategories.map((subcategory) => (
                <SubCategoryCard
                  loading={deleteLoading}
                  key={subcategory.id}
                  category={subcategory}
                  onDelete={handleCategoryDelete}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SubCategoryCard = ({
  category,
  onDelete,
  loading,
}: {
  category: Category;
  onDelete: (id: number) => void;
  loading: boolean;
}) => {
  return (
    <div className="bg-white/20 rounded-md w-full ">
      <div className="flex justify-between p-2 mb-2">
        <p className="text-md font-medium">{category.name}</p>
        <div className="flex gap-3">
          <EditIcon size={16} fill={darkTheme.COLORS.primary} />
          <button
            disabled={loading}
            className="bg-black"
            onClick={() => onDelete(category.id)}
          >
            <DeleteIcon size={16} fill={darkTheme.COLORS.error} />
          </button>
        </div>
      </div>
      {category.subcategories &&
        category.subcategories.map((subcategory) => (
          <SubCategoryCard
            loading={loading}
            key={subcategory.id}
            category={subcategory}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default CategoryCard;
