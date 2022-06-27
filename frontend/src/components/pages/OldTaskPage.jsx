import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { OldTaskContext } from '../../providers/OldTaskProvider';
import { taskIndexUrl } from '../../urls/urls';
import { OldTasks } from '../Tasks/OldTasks';



export const OldTaskPage = () => {
  const { setOldTasks } = useContext(OldTaskContext)

  useEffect(() => {
    axios.get(taskIndexUrl)
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

