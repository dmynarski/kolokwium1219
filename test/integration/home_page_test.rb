require 'test_helper'

class HomePageTest < ActionDispatch::IntegrationTest
  test "can get home page" do
    get '/'
    assert_select "home#index"
  end
end
