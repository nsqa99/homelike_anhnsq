class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:sign_in, :sign_up, :refresh_tokens]

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

  def sign_up
    user = User.new(register_params)
    user.roles.concat([Role.customer, Role.merchant])

    if user.save
      customer = Customer.new(user: user)
      merchant = Merchant.new(user: user)
      
      ActiveRecord::Base.transaction do
        customer.save
        merchant.save
      end
      
      json_response([], :ok)
    else
      json_response([], :bad_request, message: user.errors.full_messages.to_sentence)
    end
  end

  def refresh_tokens
    token = params[:token]
    
    unless token
      return json_response([], :bad_request, message: :bad_request)
    end

    access_token, refresh_token = auth_service.validate_refresh_token(token)
    
    json_response(
      { refresh_token: refresh_token, access_token: access_token }, :ok
    )
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def register_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email, :avatar,
      address_attributes: [:home_number, :street, :ward, :district, :city, :country],
      customer_attributes: [:all], merchant_attributes: [:all], full_name_attributes: [:first_name, :last_name],
      contact_attributes: [:phone_number, :twitter_url, :facebook_url]
    )
  end
  
  def admin_params
    params.require(:admin).permit(:username, :password)
  end
end
