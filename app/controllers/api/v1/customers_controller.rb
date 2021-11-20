class Api::V1::CustomersController < ApplicationController
  load_and_authorize_resource

  skip_before_action :authenticate_request_token, only: [:create, :index, :show]
  skip_load_and_authorize_resource only: [:create, :index, :show]

  def create
    user = User.new(user_params)
    user.roles << Role.customer

    if user.save
      json_response(json_decorator.user_json(user))
    else
      json_response([], :bad_request, message: user.errors.full_messages.to_sentence)
    end
  end

  def show
    customer = Customer.joins(:user).find_by!(user: {username: params[:id]})

    json_response(serialize(customer))
  end

  def update; end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email,
      address_attributes: [:home_number, :street, :ward, :district, :city, :country],
      customer_attributes: [:all]
    )
  end
end
