User::DEFAULT_ROLES.each do |role|
  Role.create!(title: role)
end

dev_admin = User.create!({
  username: "dev_admin",
  password: "123123123",
  email: "admin@nsqa.com"
})

dev_user = User.create!({
  username: "dev_user",
  password: "123123123",
  email: "user@nsqa.com"
})

dev_admin.roles << Role.admin.first
dev_user.roles.concat([Role.customer.first, Role.merchant.first])

address = Address.create!({
  user: dev_user,
  home_number: "501",
  street: "Le Trong Tan",
  ward: "La Khe",
  district: "Ha Dong",
  city: "Ha Noi"
})
