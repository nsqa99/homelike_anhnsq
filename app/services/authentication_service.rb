require 'securerandom'

class AuthenticationService
  def validate_access_token(headers)
    token = bearer_token(headers)
    if token
      data = JwtService.decode(token)
      return data[:payload] unless is_expired?(data[:exp])
    end
  end

  def validate_refresh_token(token=nil)
    refresh_token = RefreshToken.find_by(token: token)
    if refresh_token && refresh_token.status_active?
      data = JwtService.decode(token)
      unless is_expired?(data[:exp])
        user_id = refresh_token.user_id
        # Mark used refresh token as expired
        refresh_token.status_expired!
        
        return generate_tokens(user_id)
      end
    else
      user = User.find(refresh_token.user_id)
      invalidate_tokens(user)
    end

    raise JwtService::TokenExpired
  end

  def generate_tokens(user_id, expire_refresh_time = DEFAULT_REFRESH_EXPIRE_TIME)
    access_token = JwtService.encode(payload: user_id)
    
    # Random payload for refresh token
    random_refresh_payload = SecureRandom.base64(12)
    
    refresh_token = JwtService.encode(
      {payload: random_refresh_payload},
      expire_refresh_time
    )
    RefreshToken.create!(token: refresh_token, user_id: user_id)

    [access_token, refresh_token]
  end

  def validate_user(user_param)
    user = User.find_by(username: user_param[:username])
    return user if (user && user.valid_password?(user_param[:password]))
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
