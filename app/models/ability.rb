class Ability
  include CanCan::Ability

  def initialize(actor)
    return unless actor.present?

    case actor.class
    when Admin
      if actor.role_admin?
        can :manage, :all
      end
    when User
      if actor.merchant?
      elsif actor.customer?
    else
      return
    end
  end
end
