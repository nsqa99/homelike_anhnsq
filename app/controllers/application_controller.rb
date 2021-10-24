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
    unless User.find_by(id: auth_service.validate_token(request.headers))
      json_response([], :unauthorized)
    end
  end
end
