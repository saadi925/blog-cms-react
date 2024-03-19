import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
export type Category = {
  id: number;
  name: string;
  subcategories: Category[];
  parentId?: string;
};

const CategoryList = ({ data }: { data: Category[] }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {data &&
        data.map((category: Category) => (
          <div key={category.id}>
            <CategoryCard category={category} />
          </div>
        ))}
    </motion.div>
  );
};

export default CategoryList;
