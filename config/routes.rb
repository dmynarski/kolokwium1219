Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  devise_for :users, controllers: { sessions: 'users/sessions'}
  resources :clients
  resources :orders
  resources :cars
end
