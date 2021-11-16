Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get "users/:username", to: "users#show"
      resources :users
      post "/auth", to: "authentication#sign_in"
      post "/auth/refresh", to: "authentication#refresh_tokens"
    end
  end
end
