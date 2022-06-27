import axios from "axios";
import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlashContext } from "../../providers/FlashProvider";
import { OldTaskContext } from "../../providers/OldTaskProvider";
import { SearchNameContext } from "../../providers/SearchNameProvider";
import { SearchTasks } from "../inputform/SearchTasks";
import { TaskCard } from "../TaskCard/TaskCard";


export const OldTasks = memo(() => {
  const { oldTasks, setOldTasks } = useContext(OldTaskContext)
  const { searchName } = useContext(SearchNameContext)
  const { setFlashFlag } = useContext(FlashContext)
  const navigate = useNavigate()

  const searchTasks = oldTasks.filter((value) => {
    if (searchName === '') {
      return value
    } else if (value.title.includes(searchName)) {
      return value
    } else {
      return ''
    }
  })


  const onClickOldDelete = () => {
    const sure = window.confirm('過去のタスクを削除しますか？');
    if (sure) {
      axios.delete('http://localhost:3000/api/v1/tasks/destroy_all')
        .then(setOldTasks([])
        )
        .catch(e => {
          console.log(e)
        })
      setFlashFlag('allDelete')
      navigate('/tasks')
    }
  }

  return (
    <>
      <TaskCard cardHeaderColor={'#0066ffb6'}
        cardHeaderIcon={'RiEraserLine'}
        cardBodyColor={'#e9fcfe'}
        cardTitle={'過去のタスク一覧'}
        cardMessage={`過去に削除したタスクは${oldTasks.length}件です。`} >

        <SearchTasks >
          <SOldDeleteButton onClick={onClickOldDelete}
            className={BOldDeleteButton} >
            全件削除
          </SOldDeleteButton>
        </SearchTasks>

        {searchTasks.length === 0 ? (
          <SSearchMessage>※ 該当するタスクはありません。</SSearchMessage>
        ) : (
          searchTasks.map((todo, index) => {
            return (
              <SListDiv key={index} className={BListDiv}>
                <li>{index + 1} : {todo.title}</li>
              </SListDiv>
            )
          })
        )}

      </TaskCard>
    </>
  )
})

// ######## styled ################################################


const BOldDeleteButton = "btn btn-danger mx-4"
const SOldDeleteButton = styled.button`
  font-size: 14px;
  background-color: #ff0000;
  border-radius: 10px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #f985b1;
  }
`

const SSearchMessage = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #a70000;
`

const BListDiv = 'border-top pt-3 align-items-center my-2'
const SListDiv = styled.div`
`
