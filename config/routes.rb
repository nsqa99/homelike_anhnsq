Rails.application.routes.draw do
  root "pages#index"
  
  devise_for :admins
  devise_for :users
  namespace :api do
    namespace :v1 do
      # User
      resources :users do
        collection do
          get "search"
        end

        resources :posts do
          post "like_post"
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
      end

      get "items/search", to: "items#search"
      get "items/:id", to: "items#show"
      post "items/:item_id/reviews", to: "reviews#create"
      delete "items/:item_id/reviews/:id", to: "reviews#destroy"
      
      # Customer
      resources :customers do
        resources :orders do
          post "payments/complete", to: "payments#complete"
          post "payments/payout", to: "payments#payout"
          resources :payments, only: [:create]
        end
      end
    end
  end

  get "*path", to: "pages#index", via: :all
end
