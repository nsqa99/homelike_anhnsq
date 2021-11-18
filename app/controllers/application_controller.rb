class ApplicationController < ActionController::API
  include JsonResponse
  include ErrorHandler
  include ApplicationHelper
  include ActionController::Serialization

  prepend_before_action :authenticate_request_token

  private

  def current_ability
    @current_ability ||= current_admin ? Ability.new(current_admin) : Ability.new(current_user)
  end

  def auth_service
    @auth_service ||= AuthenticationService.new
  end
  
  def authenticate_request_token
    @request_id = auth_service.validate_access_token(request.headers)

    unless current_user || current_admin
      json_response([], :unauthorized)
    end
  end
end
