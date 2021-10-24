user1 = User.create({
  username: "nsqa",
  password: "123123123",
  email: "nguyensyquanganh@gmail.com"
})

address = Address.create({
  user: user1,
  home_number: "501",
  street: "Le Trong Tan",
  ward: "La Khe",
  district: "Ha Dong",
  city: "Ha Noi"
})
