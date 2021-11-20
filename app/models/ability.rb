class Ability
  include CanCan::Ability

  def initialize(actor)
    actor ||= User.new
    
    case actor
    when Admin
      if actor.role_admin?
        can :manage, :all

        cannot [:create, :update, :destroy], Item
      end
    when User
      if actor.merchant?
        can [:update, :destroy], Merchant, user_id: actor.id
        can :manage, Item, merchant_id: actor.merchant.id
      end
      
      if actor.customer?
        can [:update, :destroy], Customer, user_id: actor.id
      end
    else
      return
    end
  end
end
