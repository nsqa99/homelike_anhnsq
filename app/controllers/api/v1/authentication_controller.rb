class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:sign_in, :refresh_tokens]

  def sign_in
    type = params[:type]
    if !type || !ACTOR_TYPE.include?(type)
      return json_response([], :bad_request, message: :bad_request)
    end

    if type == "user"
      signer = auth_service.validate_user(user_params)
    else
      signer = auth_service.validate_admin(admin_params)
    end

    if signer
      payload = type == "user" ? signer.id : signer.secure_token
      access_token, refresh_token = auth_service.generate_tokens(signer.id, payload, type)

      json_response(
        {
          refresh_token: refresh_token,
          access_token: access_token
        }, :ok)
    else
      json_response([], :bad_request, message: :bad_request)
    end
  end

  def refresh_tokens
    token = params[:token]
    type = current_admin ? "admin" : "user"
    
    unless token && type
      return json_response([], :bad_request, message: :bad_request)
    end

    access_token, refresh_token = auth_service.validate_refresh_token(token, type)
    
    json_response(
      { refresh_token: refresh_token, access_token: access_token }, :ok
    )
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end
  
  def admin_params
    params.require(:admin).permit(:username, :password)
  end
end
