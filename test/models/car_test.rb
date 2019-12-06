require 'test_helper'

class CarTest < ActiveSupport::TestCase
  test "car cant be save without brand and model" do
    car = Car.new
    car.year = 2001
    assert_not car.save
  end
end
