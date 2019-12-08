require 'test_helper'

class CarPageTest < ActionDispatch::IntegrationTest
  test "can get cars cards" do
    get '/cars'
    assert_select "div", class: "card"
  end
  test "add car button" do
    get '/cars'
    assert_select "div", class: "header-button"
  end
end
