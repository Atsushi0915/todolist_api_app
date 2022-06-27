import React, { memo, useContext } from 'react'
import styled from "styled-components";
import axios from 'axios'
import { TaskContext } from '../../providers/TaskProvider';
import { TaskCard } from "../TaskCard/TaskCard";
import { FlashContext } from '../../providers/FlashProvider';
import { CompleteTaskContext } from '../../providers/CompleteTaskProvider';
import { taskDeleteUrl, taskUpdataUrl } from '../../urls/urls';


export const TaskList = memo(() => {
  const { taskLists, setTaskLists } = useContext(TaskContext);
  const { completeTasks, setCompleteTasks } = useContext(CompleteTaskContext)
  const { setFlashFlag } = useContext(FlashContext)


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
              <li >{index + 1} : {task.title}</li>
              <SConpleteButton onClick={() => onClickConplete(index, task)} className={BConpleteButton}>
                完了
              </SConpleteButton>
              <SCancelButton onClick={() => onClickCancel(index, task)} className={BCancelButton}>
                取消
              </SCancelButton>
            </SListDiv>
          )
        })}
      </TaskCard>
    </>
  )
});


const BListDiv = 'd-flex flex-row flex-wrap border-top pt-3 align-items-center my-2'
const SListDiv = styled.div`
`

const BConpleteButton = 'btn-sm btn-outline-info text-primary mx-3'
const SConpleteButton = styled.button`
  border-radius: 10px;
  background-color: #c6eeff;
  font-weight: bold;
  font-size: 11px;
`

const BCancelButton = 'btn-sm btn-outline-warning '
const SCancelButton = styled.button`
  border-radius: 10px;
  font-weight: bold;
  font-size: 11px;
  color: #7c7a00;
`
