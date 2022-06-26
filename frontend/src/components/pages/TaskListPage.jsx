import React, { memo, useContext, useEffect } from 'react';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskContext } from '../../providers/TaskProvider';
import { InputTodo } from '../inputform/InputTodo';
import { TaskList } from '../Tasks/TaskList';

export const TaskListPage = memo(() => {
  console.log('TaskListページ コンポーネント')
  const { setFlashFlag } = useContext(FlashContext)
  const { taskLists } = useContext(TaskContext)


  useEffect(() => {
    setFlashFlag('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskLists])

  return (
    <>
      <InputTodo />
      <TaskList />
    </>
  );
})



