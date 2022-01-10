class Api::V1::TagsController < ApplicationController
  skip_before_action :authenticate_request_token, only: [:index]

  def index
    tags = Tag.all

    json_response(
      serialize(tags),
    )
  end
end
