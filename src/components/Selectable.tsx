import React from 'react'
import { Listbox } from "@headlessui/react";

const Selectable = ({ value, setValue, categories }: any) => {
  const findCategoryById = (categoryId: number) => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category;
      } else if (category.subcategories) {
        const subcategory = category.subcategories.find(
          (sub: any) => sub.id === categoryId
        );
        if (subcategory) return subcategory;
      }
    }
    return null;
  };

  const selectedCategory = value ? findCategoryById(value) : null;
  const renderCategories = (categories: any[]) => {
    return categories.map((category: any) => (
      <React.Fragment key={category.id}>
        <Listbox.Option value={category.id}>
          {({ selected, active }) => (
            <div
              className={`${
                active ? "bg-primary text-white" : ""
              } c{ value && categories.find((cat: any) => cat.id === value)?.name
                || "Select a category"
                } select-none relative py-2 pl-3 pr-9 cursor-pointer`}
            >
              <span
                className={`${
                  selected ? "font-semibold text-surface" : "font-normal"
                } block truncate `}
              >
                {category.name}
              </span>
       
            </div>
          )}
        </Listbox.Option>
        {category.subcategories && renderCategories(category.subcategories)}
      </React.Fragment>
    ));
  };

  return (
<div className="" >
<Listbox value={value} onChange={setValue} >
      <div className="mb-4 ">
        <Listbox.Label className="block text-xl font-semibold text-gray-400 ">
           Category
        </Listbox.Label>
        <Listbox.Button className="mt-1 bg-primary text-white font-semibold p-2 block w-full outline-none border-white/20 border rounded-md shadow-sm focus:ring-accent/40 focus:border-accent sm:text-sm">
          <span className="block truncate">
            {
            selectedCategory ? selectedCategory.name : "Select a category"
            }
          </span>
        </Listbox.Button>
      <div className="relative">
      <Listbox.Options className=" z-10 mt-1 font-semibold text-white w-full bg-background rounded-md shadow-lg absolute top-0 ">
          {categories && renderCategories(categories)}
        </Listbox.Options>
      </div>
      </div>
    </Listbox>
</div>
  );
};

export default Selectable;
