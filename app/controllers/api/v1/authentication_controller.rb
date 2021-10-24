class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:sign_in]

  def sign_in
    if (user = auth_service.validate_user(user_param))
      json_response({ access_token: auth_service.generate_token(user.id) }, :ok)
    else
      json_response([], :bad_request, message: :bad_request)
    end
  end

  def sign_up
  end

  private
  
  def user_param
    params.require(:user).permit(:username, :password)
  end
end
