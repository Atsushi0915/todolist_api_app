import React, { memo, useContext } from "react";
import axios from "axios";
import styled from "styled-components"
import { taskUpdataUrl } from "../../urls/urls";

import { TaskCard } from "./TaskCard/TaskCard";
import { FlashContext } from "../../providers/FlashProvider";

import { CompleteTaskContext } from "../../providers/CompleteTaskProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { ShowIconButton } from "../iconButton/ShowIconButton";
import { ShowTask } from "./ShowTask ";


export const CompleteTasks = memo(() => {
  const { taskLists, setTaskLists } = useContext(TaskContext)
  const { completeTasks, setCompleteTasks } = useContext(CompleteTaskContext)
  const { setFlashFlag } = useContext(FlashContext)

  const onClickBack = (index, task) => {
    const taskData = {
      id: task.id,
      title: task.title,
      content: task.content,
      complete_flag: !task.complete_flag
    }
    axios.patch(taskUpdataUrl(task.id), taskData)
      .then(resp => {
        const newTasks = [...completeTasks]
        newTasks[index].complete_flag = resp.data.task.complete_flag
        newTasks.splice(index, 1)
        setCompleteTasks(newTasks)
        setTaskLists([...taskLists, resp.data.task])
        if (newTasks.length >= 5) {
          setFlashFlag('todoBackAndError')
        } else {
          setFlashFlag('todoBack')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }


  const onClickDelete = (index, task) => {
    const sure = window.confirm('完了履歴から削除しますか？');
    if (sure) {
      const taskData = {
        del_flag: !task.del_flag
      }
      axios.patch(taskUpdataUrl(task.id), taskData)
        .then(resp => {
          const newTasks = [...completeTasks]
          newTasks[index].del_flag = resp.data.task.del_flag
          newTasks.splice(index, 1)
          setCompleteTasks(newTasks)
          setFlashFlag('todoDelete')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }


  return (
    <>
      <TaskCard cardHeaderColor={"#64ff69a7"}
        cardHeaderIcon={'FiCheckSquare'}
        cardBodyColor={"#e9fcfe"}
        cardTitle={'Conpleteリスト'}
        cardMessage={`完了したタスクは${completeTasks.length}件です`}>

        {completeTasks === 0 || completeTasks.map((task, index) => {
          return (
            <SListDiv key={index} className={BListDiv}>
              <li >{index + 1} : {task.title}</li>

              <ShowIconButton task={task} />
              <ShowTask task={task} />

              <div>
                <SBackButton onClick={() => { onClickBack(index, task) }} className={BBackButton}>
                  戻す
                </SBackButton>
                <SDeleteButton onClick={() => { onClickDelete(index, task) }} className={BDeleteButton}>
                  削除
                </SDeleteButton>
              </div>
            </SListDiv>
          )
        })}
      </TaskCard>
    </>
  )
})

// ######## styled #################################################

const BListDiv = 'd-flex flex-row flex-wrap border-top pt-3 align-items-center my-2'
const SListDiv = styled.div`
  
`

const BBackButton = 'btn-sm btn-outline-success me-2'
const SBackButton = styled.button`
  border-radius: 10px;
  background-color: #e0ffe2;
  font-weight: bold;
  font-size: 12px;
`

const BDeleteButton = 'btn-sm btn-outline-danger'
const SDeleteButton = styled.button`
  border-radius: 10px;
  background-color: #ffe1e1;
  font-weight: bold;
  font-size: 12px;
`

