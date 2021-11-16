class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    if user.admin?
      can :manage, :all
    elsif user.merchant?
    elsif user.customer?
    end
  end
end
