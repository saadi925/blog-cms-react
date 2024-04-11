import React, { createContext } from "react";
interface ViewTypesCtx {
  isViewTypes: boolean;
  switchViewTypes: () => void;
}

export const ViewTypesContext = createContext<null | ViewTypesCtx>(null);

const ViewTypesProvider = ({ children }: any) => {
  const [isViewTypes, setViewTypes] = React.useState(false);

  const switchViewTypes = () => {
    setViewTypes(!isViewTypes);
  };

  return (
    <ViewTypesContext.Provider value={{ isViewTypes, switchViewTypes }}>
      {children}
    </ViewTypesContext.Provider>
  );
};

export default ViewTypesProvider;
