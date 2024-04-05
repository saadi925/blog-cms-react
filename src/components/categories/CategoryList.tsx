import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import SubcategoriesWithToast from "./SubcategoriesList";
import { useState } from "react";
export type Category = {
  id: number;
  name: string;
  thumbnail?: string;
  subcategories: Category[];
  parentId?: string;
  description? : string
};

const CategoryList = ({ data}: { data: Category[] }) => {
  
  const [selectedCategory, setSelectedCategory] = useState<null | Category >(null)
  const handleSelected = (category : Category)=>{
    setSelectedCategory(category)
  }
  const resetSelected = ()=>{
    setSelectedCategory(null)
  }
  return (
 <div className={`relative top-0 ${selectedCategory ? '' :''}`}>
     <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {data &&
        data.map((category: Category) => (
          <div key={category.id}>
            <CategoryCard category={category} handleSelected={handleSelected} />
          </div>
        ))}
    </motion.div>
     <div className="md:px-8 lg:px-12 py-2  rounded-lg lg:h-[80vh] lg:max-h-min overflow-y-auto  top-0 absolute">
     {
          selectedCategory && <SubcategoriesWithToast handleSelected={handleSelected} onClose={resetSelected} category={selectedCategory} />
          
           }
     </div>
 </div>
  );
};

export default CategoryList;
