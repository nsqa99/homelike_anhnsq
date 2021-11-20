module JsonSerializer
  def serialize instance, includes = nil
    ActiveModelSerializers::SerializableResource.new(instance, include: includes).as_json
  end

  def paginate page, page_size, total_pages, total_entries
    {
      page: page,
      page_size: page_size,
      total_pages: total_pages,
      total_entries: total_entries
    }
  end
end
