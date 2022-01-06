class CommentService
  def create user, post_id, params
    comment = user.comments.build(params)
    comment.post = Post.find(post_id)

    if comment.save
      comment.post.increment!(:comments_count)
      comment.post.__elasticsearch__.update_document

      return comment
    end

    false
  end

  def get_list_comments_by_post post_id, page, page_size
    post = Post.find(post_id)

    post.comments.page(page).per(page_size)
  end

  def update comment_id, params
  end

  def destroy comment_id
    comment = Comment.find(comment_id)
    if comment.destroy
      comment.post.decrement!(:comments_count)
      comment.post.__elasticsearch__.update_document

      return comment
    end

    false
  end
end
