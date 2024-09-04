import React, { createContext, useContext, useState } from 'react';

const TimetableContext = createContext<any>(undefined);

export const TimetableProvider: React.FC<any> = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
  return (
    <TimetableContext.Provider
      value={{
        showSidebar, setShowSidebar
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};
export default TimetableContext;

export const useTimetableContext = () => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error('useSetupContext must be used within a SetupProvider');
  }
  return context;
};
