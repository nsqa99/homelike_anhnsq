class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:sign_in, :refresh_tokens]

  def sign_in
    if (user = auth_service.validate_user(user_param))
      access_token, refresh_token = auth_service.generate_tokens(user.id)

      json_response(
        {
          refresh_token: refresh_token,
          access_token: access_token
        }, :ok)
    else
      json_response([], :bad_request, message: :bad_request)
    end
  end

  def sign_up
  end

  def refresh_tokens
    token = params[:token]
    access_token, refresh_token = auth_service.validate_refresh_token(token)
    
    json_response(
      {
        refresh_token: refresh_token,
        access_token: access_token
      }, :ok)
  end

  private
  
  def user_param
    params.require(:user).permit(:username, :password)
  end
end
