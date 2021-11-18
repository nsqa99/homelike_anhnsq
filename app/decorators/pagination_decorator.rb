class PaginationDecorator
  def paginate page, page_size, total_pages, total_entries
    {
      page: page,
      page_size: page_size,
      total_pages: total_pages,
      total_entries: total_entries
    }
  end
end
