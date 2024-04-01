import { Listbox } from "@headlessui/react";
const Selectable = ({ value, setValue, categories }) => {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className="relative">
        <Listbox.Label className="label">Parent Category</Listbox.Label>
        <Listbox.Button className="mt-1 relative w-full ring-transparent  border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
          <span className="block truncate">
            {value
              ? categories.find((category) => category.id === value)?.name
              : "Select a category"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 8a7 7 0 1114 0 7 7 0 01-14 0zm14 5a2 2 0 11-4 0 2 2 0 014 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-zinc-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {categories &&
            categories.map((category) => (
              <Listbox.Option
                key={category.id}
                value={category.id}
                className={({ active, selected }) =>
                  `${!active ? "text-white bg-indigo-600" : ""}
                       select-none relative py-2 pl-3 cursor-pointer pr-9`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-semibold" : "font-normal"
                      } block truncate`}
                    >
                      {category.name}
                    </span>
                    {selected && (
                      <span
                        className={`${active ? "text-white" : "text-white-600"}
                              absolute inset-y-0 right-0 flex items-center pr-4`}
                      >
                        ✔️
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Selectable;
