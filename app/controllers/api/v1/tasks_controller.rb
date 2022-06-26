class Api::V1::TasksController < ApplicationController
  protect_from_forgery

  def index
    tasks = Task.all
    render json: {
      tasks: tasks
    }, statas: :ok
  end

  def update
    p '-----------------'
    task = Task.find(params[:id])
    p '================'
    p task_params
    p '================'
    if task.update(task_params)
      render json: {
        task: task
      }, statas: :ok
    else
      render json: todo.errors, status: 422
    end
  end


  private
    def task_params
      params.require(:task).permit(:title, :content, :complete_flag)
    end
end
