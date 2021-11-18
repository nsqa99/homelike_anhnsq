module ErrorHandler
  extend ActiveSupport::Concern
  included do
    # rescue_from StandardError do |ex|
    #   internal_server_error(ex.message)
    # end
    rescue_from(JwtService::TokenExpired, with: :token_expired)
    rescue_from(JwtService::VerificationError, with: :verification_failed)
    rescue_from(JwtService::DecodeError, with: :verification_failed)
    rescue_from(ActiveRecord::RecordNotFound, with: :not_found)
    rescue_from(CanCan::AccessDenied, with: :forbidden)
  end

  private

  def not_found
    error_response(:not_found.to_s.humanize, :not_found)
  end

  def token_expired
    error_response(:token_expired.to_s.humanize, :bad_request)
  end

  def verification_failed
    error_response(:verification_failed.to_s.humanize, :bad_request)
  end

  def forbidden
    error_response(:forbidden.to_s.humanize, :forbidden)
  end

  def internal_server_error(message)
    error_response(message, :internal_server_error)
  end

  def error_response(message, status = :internal_server_error)
    json_response([], status, message: message)
  end
end
