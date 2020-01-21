Rails.application.routes.draw do
  devise_for :users
  root "messages#index"

  # edit user info
  resources :users, only: [:edit,:update]
end