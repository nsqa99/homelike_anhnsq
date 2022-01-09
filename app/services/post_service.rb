class PostService
  def create user, params, item_ids, shared_id
    post = user.posts.build(params)

    # Attach Item to post

    if (item_ids)
      items = Item.where(id: item_ids).approved
      
      if items.count < item_ids.count
        return false
      end

      post.items.concat(items)
    end

    # Share posts

    if (shared_id)
      shared = Post.find(shared_id)
      post.child = shared
    end

    if post.save
      if shared.present?
        shared.try(:increment!, :shares)
        shared.__elasticsearch__.update_document
      end

      return post
    end
    false
  end

  def get_list_posts username, page, page_size
    if username
      User.find_by(username: username).posts.order(id: :desc).page(page).per(page_size)
    else
      Post.order(id: :desc).page(page).per(page_size)
    end
  end

  def get_one post_id
    Post.find(post_id)
  end

  def destroy post_id
    post = Post.find(post_id)

    return post if post.destroy
  end

  def update post_id, params
    post = Post.find(post_id)

    return post if post.update(params)
  end

  def like_post user, post_id
    post = Post.find(post_id)
    
    like = post.likes.build
    like.user = user
    
    if like.save
      post.increment!(:likes_count)
      post.__elasticsearch__.update_document

      return post
    end

    false
  end

  def unlike_post user, post_id
    post = Post.find(post_id)
    like = post.likes.find_by(user_id: user.id)
    
    if like.destroy
      post.decrement!(:likes_count)
      post.__elasticsearch__.update_document

      return post
    end

    false
  end
end
