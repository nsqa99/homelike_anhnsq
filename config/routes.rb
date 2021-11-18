Rails.application.routes.draw do
  devise_for :admins
  devise_for :users
  namespace :api do
    namespace :v1 do
      # User
      resources :users
      
      # Auth
      post "/auth", to: "authentication#sign_in"
      post "/auth/refresh", to: "authentication#refresh_tokens"
      
      # Merchant
      get "merchants/:username", to: "merchants#show"
      resources :merchants
      
      # Customer
      get "customers/:username", to: "customers#show"
      resources :customers
    end
  end
end
