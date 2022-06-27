import axios from 'axios';
import React, { memo, useContext, useEffect } from 'react';
import { CompleteTaskContext } from '../../providers/CompleteTaskProvider';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskContext } from '../../providers/TaskProvider';
import { InputTodo } from '../inputform/InputTodo';
import { CompleteTasks } from '../Tasks/CompleteTasks';
import { TaskList } from '../Tasks/TaskList';

export const TaskListPage = memo(() => {
  const { setFlashFlag } = useContext(FlashContext)
  const { taskLists, setTaskLists } = useContext(TaskContext)
  const { completeTasks, setCompleteTasks } = useContext(CompleteTaskContext)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(resp => {
        setTaskLists(resp.data.tasks.filter((value) => value.complete_flag === false))
        setCompleteTasks(resp.data.tasks.filter((value) => {
          return (
            value.complete_flag === true &
            value.del_flag === false
          )
        }))
      })
      .catch(e => {
        console.log(e)
      })
  }, [setTaskLists, setCompleteTasks])

  useEffect(() => {
    setFlashFlag('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskLists, completeTasks])

  return (
    <>
      <InputTodo />
      <TaskList />
      <CompleteTasks />
    </>
  );
})



