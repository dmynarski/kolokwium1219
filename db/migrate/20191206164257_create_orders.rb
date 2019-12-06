class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :car_id
      t.integer :client_id
      t.datetime :date_start
      t.datetime :date_end
      t.boolean :paid
      
      t.timestamps
    end
  end
end
