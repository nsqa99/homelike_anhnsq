Cloudinary.config do |config|
  config.cloud_name = 'desp-ltd'
  config.api_key = ENV["CLOUDINARY_API_KEY"]
  config.api_secret = ENV["CLOUDINARY_SECRET"]
  config.secure = true
  config.cdn_subdomain = true
end
