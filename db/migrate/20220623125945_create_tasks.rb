class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.boolean :complete_flag, default: false, null: false

      t.timestamps
    end
  end
end
