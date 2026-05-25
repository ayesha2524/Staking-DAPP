import { createContext, useState } from "react";

const EventContext = createContext();
export const EventContextProvider = ({ children }) => {
  const [isReload, setIsReload] = useState(false);

  return (
    <EventContext.Provider value={{ isReload, setIsReload }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
