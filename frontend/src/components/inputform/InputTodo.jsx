import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { FlashContext } from '../../providers/FlashProvider';
import { TaskContext } from '../../providers/TaskProvider';


export const InputTodo = memo(() => {
  const [todoText, setTodoText] = useState('');
  const { setFlashFlag } = useContext(FlashContext)
  const { taskLists, setTaskLists } = useContext(TaskContext)

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value)
  }

  const onClickAdd = () => {
    if (todoText === "") return;
    const taskData = {
      title: todoText,
      content: '内容を入力してください。',
      Complete_flag: false
    }

    axios.post('http://localhost:3000/api/v1/tasks', taskData)
      .then(resp => {
        const newTasks = [...taskLists, resp.data.task]
        setTaskLists(newTasks)
        setTodoText('')
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
            (todoText)}
          onChange={onChangeTodoText}
          taskLists={taskLists}
          className={BAddInput} />
        <SAddButton disabled={taskLists.length >= 5 ||
          (!todoText || /^\s*$/.test(todoText))}
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
