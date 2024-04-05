import { useState, useEffect } from "react";
import AddIcon from "../../assets/AddIcon";
import { darkTheme } from "../../theme/COLORS";
import MinHeading from "../MinHeading";
import { ButtonWithIcon } from "../buttons/Buttons";
import CategoryModal from "./CategoryModal";
import CategoryList from "./CategoryList";

import { setCategories } from "../../setup/store/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../setup/store/store";
import { HOST } from "../../keys";

const Categories = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const categoriesInStore = useSelector(
    (state: RootState) => state.data.categories
  );
  useEffect(() => {
    const fetchCat = async () => {
      const res = await fetch(`${HOST}/categories`);
      const obj = await res.json();
      dispatch(setCategories(obj));
    };
    fetchCat();
  }, [categoriesInStore.length,dispatch]);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className={`${isModalOpen ? "blur" : ""} `}>
      <div className="flex w-full justify-between px-4 pt-3">
        <MinHeading name="Categories" />
        <div className="">
          <ButtonWithIcon
            text="Add Category"
            onClick={handleModalToggle}
            icon={<AddIcon color={darkTheme.COLORS.surface} fill="#fff" />}
          />
          <CategoryModal
            categories={categoriesInStore}
            isOpen={isModalOpen}
            onClose={handleModalToggle}
          />
        </div>
      </div>
      <CategoryList data={categoriesInStore} />
    
    </div>
  );
};

export default Categories;
