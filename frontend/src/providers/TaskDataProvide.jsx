import React, { createContext, useState } from "react";

export const TaskDataContext = createContext({})

export const TaskDataProvider = (props) => {
  const { children } = props;
  const [taskData, setTaskData] = useState([])

  return (
    <TaskDataContext.Provider value={{ taskData, setTaskData }} >
      {children}
    </TaskDataContext.Provider>
  )
}
