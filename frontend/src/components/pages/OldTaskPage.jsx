import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { OldTaskContext } from '../../providers/OldTaskProvider';
import { OldTasks } from '../Tasks/OldTasks';



export const OldTaskPage = () => {
  const { setOldTasks } = useContext(OldTaskContext)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(resp => {
        setOldTasks(resp.data.tasks.filter((value) => {
          return (
            value.complete_flag === true &
            value.del_flag === true
          )
        }))
      })
      .catch(e => {
        console.log(e)
      })
  }, [setOldTasks])

  return (
    <>
      <OldTasks />
    </>
  )
}

