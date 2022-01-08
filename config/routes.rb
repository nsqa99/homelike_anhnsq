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
          post "like", to: "posts#like_post"
          post "unlike", to: "posts#unlike_post"
        end

        member do
          post "follow/:followed", to: "users#follow"
          post "unfollow/:unfollowed", to: "users#unfollow"
        end
      end

      resources :posts, except: [:create, :udpate, :destroy] do

        resources :comments
      end
      
      # Auth
      post "auth", to: "authentication#sign_in"
      post "auth/signup", to: "authentication#sign_up"
      post "auth/refresh", to: "authentication#refresh_tokens"
      
      # Merchant
      resources :merchants do
        get "orders", to: "orders#index_for_merchant"
        post "orders/:order_id/payout", to: "payments#payout"
        resources :items do
          collection do
            get "search"
          end
        end
      end

      get "items/search", to: "items#search"
      get "items/:id", to: "items#show"
      get "items/:item_id/reviews", to: "reviews#index"
      post "items/:item_id/reviews", to: "reviews#create"
      delete "items/:item_id/reviews/:id", to: "reviews#destroy"
      
      # Customer
      resources :customers do
        resources :orders do
          collection do
            get "get_one/by_item", to: "orders#get_one_by_item_and_customer"
          end

          post "payments/complete", to: "payments#complete"
          resources :payments, only: [:create]
        end
      end
    end
  end

  get "*path", to: "pages#index", via: :all
end
