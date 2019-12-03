require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "Create user with valid email" do
    user = User.new
    user.email = 'email123'
    assert_not user.save
  end
end
