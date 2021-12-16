class PagesController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index]

  def index; end
end
