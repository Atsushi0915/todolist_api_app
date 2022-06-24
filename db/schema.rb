

ActiveRecord::Schema.define(version: 2022_06_23_125945) do

  create_table "tasks", force: :cascade do |t|
    t.string "title", null: false
    t.string "content", null: false
    t.boolean "complete_flag", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
