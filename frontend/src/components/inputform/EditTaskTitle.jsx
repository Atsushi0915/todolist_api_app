import React, { memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TaskDataContext } from '../../providers/TaskDataProvide';


export const EditTaskTitle = memo((props) => {
  const [taskTitle, setTaskTitle] = useState('');
  const { taskData } = useContext(TaskDataContext)

  const onChangeEditTitle = (event) => {
    setTaskTitle(event.target.value)
    taskData.title = taskTitle
  }

  useEffect(() => {
    setTaskTitle(props.taskData.title)
  }, [props])

  return (
    <>
      <div className="mb-3">
        <label className="form-label">TaskTitle</label>
        <SAddInput
          type='text'
          value={taskTitle || ''}
          onChange={onChangeEditTitle}
          className={BAddInput} />
      </div>
    </>
  );
});

// ######## styled ################################################


const BAddInput = "form-control"
const SAddInput = styled.input`
  border-radius: 5px; 
`
