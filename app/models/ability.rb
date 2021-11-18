class Ability
  include CanCan::Ability

  def initialize(actor)
    actor ||= User.new
    
    case actor
    when Admin
      if actor.role_admin?
        can :manage, :all
      end
    when User
      can [:update, :destroy], Merchant, user_id: actor.id if actor.merchant?
      
      can [:update, :destroy], Customer, user_id: actor.id if actor.customer?
    else
      return
    end
  end
end
