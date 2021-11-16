class ApplicationController < ActionController::API
  include JsonResponse
  include ErrorHandler
  include ApplicationHelper
  include ActionController::Serialization

  before_action :authenticate_request_token

  private

  def auth_service
    @auth_service ||= AuthenticationService.new
  end
  
  def authenticate_request_token
    @user_id = auth_service.validate_access_token(request.headers)

    unless current_user
      json_response([], :unauthorized)
    end
  end
end
