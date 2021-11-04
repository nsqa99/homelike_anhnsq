module ApplicationHelper
  def current_user
    @current_user ||= User.find_by(id: @user_id)
  end
end
