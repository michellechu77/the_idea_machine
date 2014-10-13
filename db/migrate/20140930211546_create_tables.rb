class CreateTables < ActiveRecord::Migration
  def change

    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.integer :list_count

      t.timestamps
    end

    create_table :lists do |t|
      t.string :title
      t.integer :user_count
      t.boolean :active?,  default: false
      t.datetime :made_active

      t.timestamps
    end

    create_table :idea_machines do |t|
      t.references :user
      t.references :list
      t.boolean :public?, default: true

      t.timestamps
    end

    create_table :ideas do |t|
      t.string :idea
      t.references :idea_machine

      t.timestamps
    end
  end
end
