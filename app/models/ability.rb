class Ability
  include CanCan::Ability

  def initialize(actor)
    actor ||= User.new
    
    case actor
    when Admin
      if actor.role_admin?
        can :manage, :all

        cannot :manage, Item
        cannot :follow, User
      end
    when User
      can [:follow, :unfollow], User
      can [:read, :create], Post
      can [:update, :destroy], Post, user_id: actor.id
      
      if actor.merchant?
        can [:update, :destroy], Merchant, user_id: actor.id
        can :manage, Item, merchant_id: actor.merchant.id
      end
      
      if actor.customer?
        can [:update, :destroy], Customer, user_id: actor.id

        can :manage, Order, customer_id: actor.customer.id
      end
    else
      return
    end
  end
end
