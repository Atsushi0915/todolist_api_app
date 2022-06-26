import React, { createContext, useState } from "react";

export const TaskContext = createContext({})

export const TaskProvider = (props) => {
  const { children } = props;
  const [taskLists, setTaskLists] = useState([])

  return (
    <TaskContext.Provider value={{ taskLists, setTaskLists }} >
      {children}
    </TaskContext.Provider>
  )
}
