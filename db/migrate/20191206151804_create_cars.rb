class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :brand
      t.string :model
      t.integer :year
      t.integer :power
      t.string :color
      t.decimal :engine
      t.decimal :price

      t.timestamps
    end
  end
end
