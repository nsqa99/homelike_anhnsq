module ApplicationHelper
  def current_user
    @current_user = User.find_by(id: @request_id)
  end

  def current_admin
    @current_admin = Admin.find_by(secure_token: @request_id)
  end
end
