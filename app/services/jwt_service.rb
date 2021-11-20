class JwtService
  class TokenExpired < StandardError; end
  class VerificationError < StandardError; end
  class DecodeError < StandardError; end
  SECRET = Rails.application.secrets.secret_key_base

  def self.encode(payload, expire_time = DEFAULT_EXPIRE_TIME.from_now)
    payload.merge!(exp: expire_time.to_i)

    JWT.encode(payload, SECRET)
  end

  def self.decode(token)
    body = JWT.decode(token, SECRET)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::ExpiredSignature
    raise JwtService::TokenExpired
  rescue JWT::VerificationError
    raise JwtService::VerificationError
  rescue JWT::DecodeError
    raise JwtService::DecodeError
  end
end
