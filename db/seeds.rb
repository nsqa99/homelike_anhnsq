DEFAULT_ROLES.each do |role|
  Role.create!(title: role)
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
  email: "user@nsqa.com",
  address_attributes: {
    home_number: "501",
    street: "Le Trong Tan",
    ward: "La Khe",
    district: "Ha Dong",
    city: "Ha Noi"
  },
  customer_attributes: {},
  merchant_attributes: {}
})

dev_user.roles.concat([Role.customer, Role.merchant])
