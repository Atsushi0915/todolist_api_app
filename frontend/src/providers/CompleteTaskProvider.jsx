import React, { createContext, useState } from 'react';

export const CompleteTaskContext = createContext({});

export const CompleteTaskProvider = (props) => {
  const { children } = props;
  const [completeTasks, setCompleteTasks] = useState([])

  return (
    <CompleteTaskContext.Provider value={{ completeTasks, setCompleteTasks }} >
      {children}
    </CompleteTaskContext.Provider>
  )
}
