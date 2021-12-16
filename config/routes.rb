Rails.application.routes.draw do
  root "pages#index"
  get "*path", to: "pages#index", via: :all
  
  devise_for :admins
  devise_for :users
  namespace :api do
    namespace :v1 do
      # User
      resources :users do
        collection do
          get "search"
        end

        member do
          post "follow/:followed", to: "users#follow"
          post "unfollow/:unfollowed", to: "users#unfollow"
        end
      end
      
      # Auth
      post "auth", to: "authentication#sign_in"
      post "auth/refresh", to: "authentication#refresh_tokens"
      
      # Merchant
      resources :merchants do
        resources :items do
          collection do
            get "search"
          end
        end
        resources :posts
      end

      get "items/search", to: "items#search"
      
      # Customer
      resources :customers do
        resources :posts
        resources :orders
      end
    end
  end
end
