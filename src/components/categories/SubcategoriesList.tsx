import  { useEffect } from "react";
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

 const Subcategories = ({
    category , onClose, handleSelected, 
} : SubCategoriesProps) : JSX.Element=> {
    const exists = category.subcategories && Array.isArray(category.subcategories) && category.subcategories.length > 0;
  useEffect(()=>{
  if (!exists) {
    notify()
    onClose()
  }
} , [exists])
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold text-center">{category.name}</h1>
                <button onClick={onClose} className="p-2">
                    <CloseIcon />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4">
                {exists && category.subcategories.map((subcategory: Category) => (
                    <div key={subcategory.id}>
                        <CategoryCard category={subcategory} handleSelected={handleSelected} />
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Subcategories