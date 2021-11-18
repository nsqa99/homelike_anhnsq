require 'securerandom'

class RandomService
  def self.base64_random(length = 12)
    SecureRandom.base64(length)
  end

  def self.hex_random(length = 12)
    SecureRandom.hex(length)
  end
end
