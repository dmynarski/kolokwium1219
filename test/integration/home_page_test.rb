require 'test_helper'

class HomePageTest < ActionDispatch::IntegrationTest
  test "can get h4 from home page" do
    get '/'
    assert_select "h4", "Check our offert"
  end
end
