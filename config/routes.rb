Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      delete '/tasks/destroy_all', to: 'tasks#destroy_all'
      resources :tasks
    end
  end
end
