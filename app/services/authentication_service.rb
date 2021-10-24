class AuthenticationService
  def validate_token(headers)
    token = bearer_token(headers)
    if token
      data = JwtService.decode(token)
      return data[:user_id] unless is_expired?(data[:exp])
    end
  end

  def generate_token(user_id)
    JwtService.encode(user_id: user_id)
  end

  def validate_user(user_param)
    user = User.find_by(username: user_param[:username])
    return user if (user && user.valid_password?(user_param[:password]))
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
