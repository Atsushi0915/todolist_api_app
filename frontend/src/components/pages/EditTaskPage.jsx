import axios from "axios";
import React, { memo, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import { FlashContext } from "../../providers/FlashProvider";
import { TaskDataContext } from "../../providers/TaskDataProvide";
import { taskEditUrl, taskUpdataUrl } from "../../urls/urls";
import { EditTaskContent } from "../inputform/EditTaskContent";
import { EditTaskTitle } from "../inputform/EditTaskTitle";


export const EditTaskPage = memo(() => {
  const params = useParams();
  const navigate = useNavigate()
  const { setFlashFlag } = useContext(FlashContext)
  const { taskData, setTaskData } = useContext(TaskDataContext)

  const onClickEdit = () => {
    axios.patch(taskUpdataUrl(taskData.id), taskData)
      .then(
        setFlashFlag('taskEdit')
      )
      .catch(e => {
        console.log(e)
      })
    navigate('/tasks')
  }

  const onClickBackTask = () => {
    navigate('/tasks')
  }

  useEffect(() => {
    axios.get(taskEditUrl(params.id))
      .then(resp => {
        return (
          setTaskData(resp.data.task)
        )
      })
  }, [])

  return (
    <>
      <div className='container mt-3'>
        <h3>タスク編集</h3>
        <EditTaskTitle taskData={taskData} />
        <EditTaskContent taskData={taskData} />
        <button onClick={onClickBackTask}
          className='btn btn-success me-3'>
          戻る
        </button>
        <SEditButton onClick={onClickEdit}
          className={BEditButton}>
          登録
        </SEditButton>
      </div>
    </>
  )
})

// ######## styled ################################################

const BEditButton = "btn btn-primary"
const SEditButton = styled.button`
  
`
