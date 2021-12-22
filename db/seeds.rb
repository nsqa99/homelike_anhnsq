ELASTIC_MODELS = [User, Item]

DEFAULT_ROLES.each do |role|
  Role.create!(title: role)
end

ELASTIC_MODELS.each do |model|
  model.__elasticsearch__.create_index! force: true
end

dev_admin = Admin.create!({
  email: "dev_admin@nsqa.com",
  username: "dev_admin",
  password: "123123123",
  secure_token: RandomService.hex_random
})

dev_user = User.create!({
  username: "dev_user",
  password: "123123123",
  email: "dev_user@nsqa.com",
  address_attributes: {
    home_number: "501",
    street: "Le Trong Tan",
    ward: "La Khe",
    district: "Ha Dong",
    city: "Ha Noi"
  },
  customer_attributes: {},
  merchant_attributes: {},
  full_name_attributes: {
    first_name: "Anh user",
    last_name: "NSQ"
  }
})

dev_customer = User.create!({
  username: "dev_customer",
  password: "123123123",
  email: "dev_customer@nsqa.com",
  address_attributes: {
    home_number: "501",
    street: "Le Trong Tan",
    ward: "La Khe",
    district: "Ha Dong",
    city: "Ha Noi"
  },
  customer_attributes: {},
  full_name_attributes: {
    first_name: "Anh customer",
    last_name: "NSQ"
  }
})

dev_merchant = User.create!({
  username: "dev_merchant",
  password: "123123123",
  email: "dev_merchant@nsqa.com",
  address_attributes: {
    home_number: "501",
    street: "Le Trong Tan",
    ward: "La Khe",
    district: "Ha Dong",
    city: "Ha Noi"
  },
  merchant_attributes: {},
  full_name_attributes: {
    first_name: "Anh merchant",
    last_name: "NSQ"
  }
})

dev_user.roles.concat([Role.customer, Role.merchant])
dev_customer.roles.concat([Role.customer])
dev_merchant.roles.concat([Role.merchant])
