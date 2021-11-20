class AuthenticationService
  TYPE_MAPPING = {
    user: {
      klass: User,
      refresh_token: RefreshToken,
      id: :user_id,
      payload: :id
    },
    admin: {
      klass: Admin,
      refresh_token: AdminRefreshToken,
      id: :admin_id,
      payload: :secure_token
    }
  }.with_indifferent_access

  def validate_access_token(headers)
    token = bearer_token(headers)
    if token
      data = JwtService.decode(token)
      return data[:payload] unless is_expired?(data[:exp])
    end
  end

  def validate_refresh_token(token)
    if (refresh_token = RefreshToken.find_by(token: token))
      type = "user"
    else
      refresh_token = AdminRefreshToken.find_by(token: token)
      type = "admin"
    end

    token_owner_type = TYPE_MAPPING[type]
    raise JwtService::VerificationError unless refresh_token
    
    owner_id = refresh_token.send(token_owner_type[:id])
    token_owner = token_owner_type[:klass].find_by(id: owner_id)
    
    if token_owner && refresh_token.status_active?
      payload = token_owner.send(token_owner_type[:payload])
      data = JwtService.decode(token)

      unless is_expired?(data[:exp])
        # Mark used refresh token as expired
        refresh_token.status_expired!
        
        return generate_tokens(owner_id, payload, type)
      end
      
      raise JwtService::TokenExpired
    else
      invalidate_tokens(token_owner) if token_owner
      
      raise JwtService::VerificationError
    end
  end

  def generate_tokens(owner_id, payload, type, expire_refresh_time = DEFAULT_REFRESH_EXPIRE_TIME.from_now)
    access_token = JwtService.encode(payload: payload)

    [access_token, generate_refresh_token(owner_id, type, expire_refresh_time)]
  end

  def generate_refresh_token(owner_id, type, expire_refresh_time)
    token_owner_type = TYPE_MAPPING[type]

    # Random payload for refresh token
    random_refresh_payload = RandomService.base64_random
    
    refresh_token = JwtService.encode(
      {payload: random_refresh_payload},
      expire_refresh_time
    )

    token_owner_type[:refresh_token].create!(token: refresh_token, token_owner_type[:id] => owner_id)

    refresh_token
  end

  ACTOR_TYPE.each do |actor|
    define_method "validate_#{actor}" do |params|
      actor = TYPE_MAPPING[actor][:klass].find_by(username: params[:username])
      return actor if (actor && actor.valid_password?(params[:password]))
    end
  end

  def validate_user(params)
    user = User.find_by(username: params[:username])
    return user if (user && user.valid_password?(params[:password]))
  end

  def validate_admin(params)
    admin = Admin.find_by(username: params[:username])
    return admin if (admin && admin.valid_password?(params[:password]))
  end

  def invalidate_tokens(user)
    user.refresh_tokens.each do |token|
      token.status_expired!
    end
  end

  private
  
  def jwt_service
    @jwt_service ||= JwtService.new
  end
  
  def bearer_token(headers)
    authorization_header = headers["Authorization"]
    if authorization_header.present?
      authorization_header.split(" ").last
    end
  end

  def is_expired?(expire_time)
    Time.current.utc.to_i > expire_time
  end
end
