import React, { useContext } from 'react';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskList } from '../Tasks/TaskList';

export const TaskListPage = () => {
  const { setFlashFlag } = useContext(FlashContext)


  return (
    <>
      <TaskList />
    </>
  );
}



