import SelectInput from '@material-ui/core/Select/SelectInput';
import axios from 'axios';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react';
import { CompleteTaskContext } from '../../providers/CompleteTaskProvider';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskContext } from '../../providers/TaskProvider';
import { taskIndexUrl } from '../../urls/urls';
import { InputTask } from '../inputform/InputTask';
import { Loading } from '../loading/Loading';

import { CompleteTasks } from '../Tasks/CompleteTasks';
import { TaskList } from '../Tasks/TaskList';

export const TaskListPage = memo(() => {
  const { setFlashFlag } = useContext(FlashContext)
  const { taskLists, setTaskLists } = useContext(TaskContext)
  const { completeTasks, setCompleteTasks } = useContext(CompleteTaskContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(taskIndexUrl)
      .then(resp => {
        setIsLoading(false)
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
      {
        isLoading ?
          <Fragment>
            <Loading>
              タスクを読み込んでいます・・・
            </Loading>
          </Fragment>
          :
          <Fragment>
            <InputTask />
            <TaskList />
            <CompleteTasks />
          </Fragment>
      }
    </>
  );
})



