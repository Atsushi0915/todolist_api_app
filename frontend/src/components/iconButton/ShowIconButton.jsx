import { Button } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { AiOutlineFileSearch } from "react-icons/ai";

export const ShowIconButton = (props) => {

  return (
    <>
      <Button
        className="ms-3 me-5"
        data-bs-toggle="modal"
        data-bs-target={`#task${props.task.id}Modal`} >
        <IconContext.Provider value={{ color: '#470077', size: '33px' }}>
          <AiOutlineFileSearch />
        </IconContext.Provider>
      </Button>
    </>
  )
}
