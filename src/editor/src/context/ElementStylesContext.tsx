import React, { createContext, useState } from "react";
type propertiesAvailable = { inputElements: string[]; selectables: string[] };
export interface Availableproperties {
  availableProperties: propertiesAvailable | undefined;
  handleAvailableProperties: (properties: propertiesAvailable) => void;
}

export const ElementsContext = createContext<Availableproperties | undefined>(
  undefined
);

export const GetElementsContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [availableProperties, setAvailableproperties] = useState<
    propertiesAvailable | undefined
  >(undefined);
  const handleAvailableProperties = (properties: propertiesAvailable) => {
    setAvailableproperties(properties);
  };
  return (
    <ElementsContext.Provider
      value={{ availableProperties, handleAvailableProperties }}
    >
      {children}
    </ElementsContext.Provider>
  );
};
