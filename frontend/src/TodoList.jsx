import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(resp => {
        setTodos(resp.data)
        console.log(resp.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])



  return (
    <>
      aaaaaaaaaaaaaaaaaaaaaaaaaa
      {/* {todos.map((todo, index) => {
        return (
          <div key={todo}>
            <div>{index + 1} : sssss</div>
          </div>

        )
      })} */}
    </>
  )
}
