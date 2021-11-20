DEFAULT_PAGE_SIZE=10
DEFAULT_PAGE=0
DEFAULT_EXPIRE_TIME= Rails.env.development? ? 15.days : 15.minutes
DEFAULT_REFRESH_EXPIRE_TIME= Rails.env.development? ? 100.days : 1.days
DEFAULT_ROLES = %w(customer merchant)
ADMIN_ROLES = %w(admin super_admin)
ACTOR_TYPE = %w(user admin)

