# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_06_171016) do

  create_table "addresses", charset: "utf8mb4", force: :cascade do |t|
    t.string "home_number"
    t.string "street"
    t.string "ward"
    t.string "district"
    t.string "city"
    t.string "country"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "admin_refresh_tokens", charset: "utf8mb4", force: :cascade do |t|
    t.string "token", null: false
    t.integer "status", default: 0, null: false
    t.bigint "admin_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["admin_id"], name: "index_admin_refresh_tokens_on_admin_id"
    t.index ["token"], name: "index_admin_refresh_tokens_on_token", unique: true
  end

  create_table "admins", charset: "utf8mb4", force: :cascade do |t|
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "username", null: false
    t.string "role", default: "admin", null: false
    t.string "secure_token", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email", null: false
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["secure_token"], name: "index_admins_on_secure_token", unique: true
    t.index ["username"], name: "index_admins_on_username", unique: true
  end

  create_table "apartments", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.integer "size", null: false
    t.integer "initial_quantity", null: false
    t.integer "initial_allowance", null: false
    t.integer "max_allowance", null: false
    t.float "extra_fee_each_person", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "item_id"
    t.index ["item_id"], name: "index_apartments_on_item_id"
    t.index ["title"], name: "index_apartments_on_title"
  end

  create_table "apartments_facilities", id: false, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "apartment_id", null: false
    t.bigint "facility_id", null: false
    t.index ["apartment_id", "facility_id"], name: "index_apartments_facilities_on_apartment_id_and_facility_id", unique: true
  end

  create_table "apartments_tags", id: false, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "apartment_id", null: false
    t.bigint "tag_id", null: false
    t.index ["apartment_id", "tag_id"], name: "index_apartments_tags_on_apartment_id_and_tag_id", unique: true
  end

  create_table "customers", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_customers_on_user_id"
  end

  create_table "facilities", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "apartment_id", null: false
    t.string "name", null: false
    t.string "quality", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["apartment_id"], name: "index_facilities_on_apartment_id"
  end

  create_table "images", charset: "utf8mb4", force: :cascade do |t|
    t.string "url"
    t.bigint "apartment_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["apartment_id"], name: "index_images_on_apartment_id"
  end

  create_table "items", charset: "utf8mb4", force: :cascade do |t|
    t.float "rate", default: 0.0, null: false
    t.integer "status", default: 0, null: false
    t.float "price", default: 0.0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "merchant_id"
    t.datetime "initial_start_date", null: false
    t.datetime "initial_end_date", null: false
    t.index ["merchant_id"], name: "index_items_on_merchant_id"
  end

  create_table "items_posts", id: false, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "post_id", null: false
    t.bigint "item_id", null: false
    t.index ["post_id", "item_id"], name: "index_items_posts_on_post_id_and_item_id", unique: true
  end

  create_table "items_tags", id: false, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "tag_id", null: false
    t.index ["item_id", "tag_id"], name: "index_items_tags_on_item_id_and_tag_id", unique: true
  end

  create_table "merchants", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_merchants_on_user_id"
  end

  create_table "orders", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "customer_id", null: false
    t.float "total", default: 0.0, null: false
    t.datetime "start_rent_date", null: false
    t.datetime "end_rent_date", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "status", default: 0, null: false
    t.bigint "item_id"
    t.integer "customer_quantity", null: false
    t.float "extra_price", default: 0.0
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["item_id"], name: "index_orders_on_item_id"
    t.index ["start_rent_date", "end_rent_date"], name: "index_orders_on_start_rent_date_and_end_rent_date", unique: true
  end

  create_table "post_images", charset: "utf8mb4", force: :cascade do |t|
    t.string "url", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_post_images_on_post_id"
  end

  create_table "posts", charset: "utf8mb4", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "user_id", null: false
    t.integer "likes", default: 0, null: false
    t.integer "shares", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "refresh_tokens", charset: "utf8mb4", force: :cascade do |t|
    t.string "token", null: false
    t.bigint "user_id", null: false
    t.integer "status", default: 0, null: false
    t.index ["token"], name: "index_refresh_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_refresh_tokens_on_user_id"
  end

  create_table "relationships", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "follower_id", null: false
    t.bigint "followed_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "rent_addresses", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "apartment_id", null: false
    t.string "home_number", null: false
    t.string "street", null: false
    t.string "ward", null: false
    t.string "district", null: false
    t.string "city", null: false
    t.string "country", null: false
    t.integer "latitude", null: false
    t.integer "longitude", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["apartment_id"], name: "index_rent_addresses_on_apartment_id"
  end

  create_table "roles", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["title"], name: "index_roles_on_title"
  end

  create_table "roles_users", id: false, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.index ["user_id", "role_id"], name: "index_roles_users_on_user_id_and_role_id"
  end

  create_table "sharings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "child_id"
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["child_id", "parent_id"], name: "index_sharings_on_child_id_and_parent_id", unique: true
    t.index ["child_id"], name: "index_sharings_on_child_id"
    t.index ["parent_id"], name: "index_sharings_on_parent_id"
  end

  create_table "tags", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.string "type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "username", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "status", default: 0, null: false
    t.integer "following_count", default: 0, null: false
    t.integer "follower_count", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "admin_refresh_tokens", "admins"
  add_foreign_key "apartments", "items"
  add_foreign_key "customers", "users"
  add_foreign_key "facilities", "apartments"
  add_foreign_key "images", "apartments"
  add_foreign_key "merchants", "users"
  add_foreign_key "orders", "customers"
  add_foreign_key "orders", "items"
  add_foreign_key "post_images", "posts"
  add_foreign_key "posts", "users"
  add_foreign_key "refresh_tokens", "users"
  add_foreign_key "rent_addresses", "apartments"
end
