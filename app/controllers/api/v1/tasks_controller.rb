class Api::V1::TasksController < ApplicationController
  protect_from_forgery

  def index
    tasks = Task.all
    render json: {
      tasks: tasks
    }, statas: :ok
  end


  def create
    task = Task.create(task_params)
    if task.save
      render json:{
        task: task
      }, statas: :ok
    else
      render json: todo.errors, status: 422
    end

  end

  def show
    task = Task.find(params[:id])
    render json:{
      task: task
    }, status: :ok
  end


  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: {
        task: task
      }, statas: :ok
    else
      render json: todo.errors, status: 422
    end
  end


  def destroy
    if Task.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    tasks = Task.where(del_flag: true)
    if tasks.destroy_all
      head :no_content
    else
      render json: {error: "Failed to destroy"}, status: 422
    end
  end

  

  private
    def task_params
      params.require(:task).permit(:title, :content, :complete_flag, :del_flag)
    end
end
