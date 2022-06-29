import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskContext } from '../../providers/TaskProvider';
import { taskCreateUrl } from '../../urls/urls';


export const InputTask = memo(() => {
  const [taskText, setTaskText] = useState('');
  const { setFlashFlag } = useContext(FlashContext)
  const { taskLists, setTaskLists } = useContext(TaskContext)

  const onChangeTaskText = (event) => {
    setTaskText(event.target.value)
  }

  const onClickAdd = () => {
    if (taskText === "") return;
    const taskData = {
      title: taskText,
      content: '内容を入力してください。',
      complete_flag: false
    }

    axios.post(taskCreateUrl, taskData)
      .then(resp => {
        const newTasks = [...taskLists, resp.data.task]
        setTaskLists(newTasks)
        setTaskText('')
        if (newTasks.length >= 5) {
          setFlashFlag('todoAddAndError')
        } else {
          setFlashFlag('todoAdd')
        };
      })
  };

  return (
    <>
      <SAddFormDiv className={BAddFormDiv}>
        <SAddInput disabled={taskLists.length >= 5}
          type='text'
          placeholder='TODOを入力'
          value={taskLists.length >= 5 ?
            ('※ TODOは5件以上入力できません') :
            (taskText)}
          onChange={onChangeTaskText}
          taskLists={taskLists}
          className={BAddInput} />
        <SAddButton disabled={taskLists.length >= 5 ||
          (!taskText || /^\s*$/.test(taskText))}
          onClick={onClickAdd}
          className={BAddButton} >
          追加
        </SAddButton>
      </SAddFormDiv>
    </>
  );
});

// ######## styled ################################################

const BAddFormDiv = "d-flex flex-row alert alert-info my-1 py-3"
const SAddFormDiv = styled.div`
  background-color: #ffffff23;
  border: none;
`
const BAddButton = "btn btn-primary mx-3 "
const SAddButton = styled.button`
  font-size: 18px;
  background-color: #0318d7b7;
  border-radius: 15px;
  border: none;
  &:hover {
    cursor: pointer;
    /* background-color: #0008ff; */
  }
`
const BAddInput = "form-control w-75 "
const SAddInput = styled.input`
  border-radius: 15px;
  ${props => props.taskLists.length >= 5 && `color:#ff0000`};
  
`
