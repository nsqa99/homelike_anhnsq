module JsonResponse
  def json_response(data, status = :ok, **kwargs)
    response = { data: data }
    if kwargs
      response.merge!(message: kwargs[:message]) if kwargs[:message]
      response.merge!(pagination: pagin_data(kwargs[:pagination])) if kwargs[:pagination]
    end

    render(
      json: response,
      status: status
    )
  end

  private

  def pagin_data(pagination)
    {
      page: pagination[:page],
      page_size: pagination[:page_size],
      total_pages: pagination[:total_pages],
      total_entries: pagination[:total_entries]
    }
  end
end
