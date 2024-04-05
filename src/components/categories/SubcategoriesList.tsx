import React, { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "./CategoryList";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from "../../assets/CloseIcon";

interface SubCategoriesProps {
    category: Category
    onClose : ()=>void
    handleSelected: (category: Category) => void
}

const notify = () => toast.error("No categories found!");

 const Subcategories: React.FC<SubCategoriesProps> = ({
    category , onClose, handleSelected, 
}) => {
    const exists = category.subcategories && Array.isArray(category.subcategories) && category.subcategories.length > 0;
  useEffect(()=>{
  if (!exists) {
    notify()
    onClose()
  }
  },[exists])
    if (exists) {
        return (
            <div className="relative top-0 border border-surface/10 bg-background py-4 px-2 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className="py-2 text-surface font-semibold text-3xl">{category.name}</h1>
                 <div onClick={onClose}>
                    <CloseIcon />
                 </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3">
                    {category.subcategories.map((subcategory) => (
                        <CategoryCard
                            handleSelected={handleSelected}
                            key={subcategory.id}
                            category={subcategory}
                        />
                    ))}
                </div>
            </div>
        );
    } 
};


export default Subcategories