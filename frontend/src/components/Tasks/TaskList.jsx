import React, { memo, useContext, useState } from 'react'
import axios from 'axios'
import styled from "styled-components";
import { taskDeleteUrl, taskUpdataUrl } from '../../urls/urls';

import { TaskCard } from "./TaskCard/TaskCard";
import { ShowTask } from './ShowTask ';
import { ShowIconButton } from '../iconButton/ShowIconButton';

import { FlashContext } from '../../providers/FlashProvider';
import { CompleteTaskContext } from '../../providers/CompleteTaskProvider';
import { TaskContext } from '../../providers/TaskProvider';


export const TaskList = memo(() => {
  const { taskLists, setTaskLists } = useContext(TaskContext);
  const { completeTasks, setCompleteTasks } = useContext(CompleteTaskContext)
  const { setFlashFlag } = useContext(FlashContext)
  const [taskId, setTaskId] = useState('')



  const onClickConplete = (index, task) => {
    const taskData = {
      id: task.id,
      title: task.title,
      content: task.content,
      complete_flag: !task.complete_flag
    }
    axios.patch(taskUpdataUrl(task.id), taskData)
      .then(resp => {
        const newTasks = [...taskLists]
        newTasks[index].complete_flag = resp.data.task.complete_flag
        newTasks.splice(index, 1)
        setTaskLists(newTasks)
        setCompleteTasks([...completeTasks, resp.data.task])
        setFlashFlag('taskConplete')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const onClickCancel = (index, task) => {
    const sure = window.confirm('タスクを取り消しますか？');
    if (sure) {
      axios.delete(taskDeleteUrl(task.id))
        .then(resp => {
          console.log(resp.data)
          const newTasks = [...taskLists]
          newTasks.splice(index, 1)
          setTaskLists(newTasks)
          setFlashFlag('todoCancel')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const onClickTaskIdSet = () => {
    alert('TaskId')
  }



  return (
    <>
      <TaskCard cardHeaderColor={"#00fbff"}
        cardHeaderIcon={'FiEdit3'}
        cardBodyColor={"#e9fcfe"}
        cardTitle={'TODOリスト'}
        cardMessage={`未完了のタスクは${taskLists.length}件です`} >

        {taskLists === 0 || taskLists.map((task, index) => {
          return (
            <SListDiv key={index} className={BListDiv}>
              <li className="me-2">
                {index + 1} : {task.title}
              </li>

              <ShowIconButton task={task} />
              <ShowTask task={task} />

              <div>
                <SConpleteButton onClick={() => onClickConplete(index, task)}
                  className={BConpleteButton}>
                  完了
                </SConpleteButton>

                <SCancelButton
                  onClick={() => onClickCancel(index, task)}
                  className={BCancelButton}>
                  取消
                </SCancelButton>
              </div>
            </SListDiv>
          )
        })}
      </TaskCard>
    </>
  )
});


// ######## styled ################################################

const BListDiv = 'd-flex flex-row flex-wrap border-top pt-3 align-items-center my-2'
const SListDiv = styled.div`
`

const BConpleteButton = 'btn-sm btn-outline-info text-primary me-2'
const SConpleteButton = styled.button`
  border-radius: 10px;
  background-color: #c6eeff;
  font-weight: bold;
  font-size: 12px;
`

const BCancelButton = 'btn-sm btn-outline-warning '
const SCancelButton = styled.button`
  border-radius: 10px;
  font-weight: bold;
  font-size: 12px;
  color: #7c7a00;
  text-align: right;
`
