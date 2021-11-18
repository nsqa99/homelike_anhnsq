class MerchantsController < ApplicationController
  def create
    user = User.new(user_params)
    user.roles << Role.merchant

    if user.save
      json_response(UserSerializer.new(user).as_json)
    else
      json_response([], :bad_request)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation,
      address_attributes: [:home_number, :street, :ward, :district, :city, :country],
      merchant_attributes: []
    )
  end
end
