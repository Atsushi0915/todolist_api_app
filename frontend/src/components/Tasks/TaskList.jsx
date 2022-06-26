import React, { useContext } from 'react'
import styled from "styled-components";
import axios from 'axios'
import { useEffect } from 'react';
import { TaskContext } from '../../providers/TaskProvider';
import { TodoCard } from "../TaskCard/TaskCard";
import { FlashContext } from '../../providers/FlashProvider';

export const TaskList = () => {
  const { taskLists, setTaskLists } = useContext(TaskContext);
  const { setFlashFlag } = useContext(FlashContext)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(resp => {
        setTaskLists(resp.data.tasks.filter((value) => value.complete_flag === false))

      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  console.log(taskLists)

  const onClickConplete = (index, task) => {
    const taskData = {
      id: task.id,
      title: task.title,
      content: task.content,
      complete_flag: !task.complete_flag
    }


    axios.patch(`http://localhost:3000/api/v1/tasks/${task.id}`, taskData)
      .then(resp => {
        console.log(resp)
        const newTasks = [...taskLists]

        console.log(resp.data.complete_flag)
        newTasks[index].complete_flag = resp.data.task.complete_flag
        setTaskLists(newTasks);
      })
    setFlashFlag('taskConplete')
  }


  return (
    <>
      <TodoCard cardHeaderColor={"#00fbff"}
        cardHeaderIcon={'FiEdit3'}
        cardBodyColor={"#e9fcfe"}
        cardTitle={'TODOリスト'}
        cardMessage={`未完了のタスクは${taskLists.length}件です`} >

        {taskLists.map((task, index) => {
          return (
            <div key={index}>
              {
                (task.complete_flag === false) && (
                  <SListDiv className={BListDiv}>
                    <li >{index + 1} : {task.title}</li>
                    <SConpleteButton onClick={() => onClickConplete(index, task)} className={BConpleteButton}>
                      完了
                    </SConpleteButton>
                  </SListDiv>
                )}
            </div>
          )
        })}

      </TodoCard>
    </>
  )
}


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
