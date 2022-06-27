import React, { createContext, useState } from "react";

export const OldTaskContext = createContext({});

export const OldTaskProvider = (props) => {
  const { children } = props;
  const [oldTasks, setOldTasks] = useState([])

  return (
    <OldTaskContext.Provider value={{ oldTasks, setOldTasks }}>
      {children}
    </OldTaskContext.Provider>
  )
}
