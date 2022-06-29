import React, { memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TaskDataContext } from '../../providers/TaskDataProvide';


export const EditTaskContent = memo((props) => {
  const [taskContent, setTaskContent] = useState('');
  const { taskData } = useContext(TaskDataContext)

  const onChangeEditTitle = (event) => {
    setTaskContent(event.target.value)
    taskData.content = taskContent
  }

  useEffect(() => {
    setTaskContent(props.taskData.content)
  }, [props])

  return (
    <>
      <div className="mb-3">
        <label className="form-label">TaskTitle</label>
        <SAddTextarea
          type='text'
          rows="5"
          value={taskContent || ''}
          onChange={onChangeEditTitle}
          className={BAddTextarea} />
      </div>
    </>
  );
});

// ######## styled ################################################


const BAddTextarea = "form-control"
const SAddTextarea = styled.textarea`
  border-radius: 5px; 
`
