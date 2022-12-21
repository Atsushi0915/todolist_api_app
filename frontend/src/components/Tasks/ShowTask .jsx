import { useNavigate } from "react-router-dom"

export const ShowTask = (props) => {
  const { task } = props


  const navigate = useNavigate()

  const onClickNavigate = () => {
    navigate(`/edittask/${task.id}`)
  }

  return (
    <>
      <div className="modal fade" id={`task${task.id}Modal`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >{task.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              タスク詳細：<br />
              {task.content}
              <br />
              <br />
            </div>


            <div className="modal-footer">
              <button type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                戻る
              </button>

              {task.complete_flag === false &&
                <button type="button"
                  onClick={onClickNavigate}
                  data-bs-dismiss="modal"
                  className="btn btn-primary">
                  編集
                </button>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
