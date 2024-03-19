import { Listbox } from "@headlessui/react";

const Selectable = ({ value, setValue, categories }: any) => {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className="mb-4">
        <Listbox.Label className="block text-sm font-medium text-white">
          Parent Category
        </Listbox.Label>
        <Listbox.Button className="mt-1 bg-white p-2 block w-full outline-none border-white/20 border rounded-md shadow-sm focus:ring-accent/40 focus:border-accent sm:text-sm">
          <span className="block truncate">
            {value
              ? categories.find((category: any) => category.id === value)
                  ?.name || "Select a category"
              : "Select a category"}
          </span>
        </Listbox.Button>
        <Listbox.Options className=" z-10 mt-1  bg-white rounded-md shadow-lg">
          {categories &&
            categories.map((category: any) => (
              <Listbox.Option key={category.id} value={category.id}>
                {({ selected, active }) => (
                  <div
                    className={`${
                      active ? "bg-primary text-white" : ""
                    } cursor-pointer select-none relative py-2 pl-3 pr-9`}
                  >
                    <span
                      className={`${
                        selected ? "font-semibold" : "font-normal"
                      } block truncate`}
                    >
                      {category.name}
                    </span>
                    {selected && (
                      <span
                        className={`${
                          active ? "text-white" : "text-gray-400"
                        } absolute inset-y-0 right-0 flex items-center pr-4`}
                      >
                        ok
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Selectable;
