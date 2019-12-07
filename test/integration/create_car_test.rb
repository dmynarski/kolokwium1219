require 'test_helper'

class CreateCarTest < ActionDispatch::IntegrationTest
  test "Add car" do
    get '/cars/new'
    assert_response :success

    post '/cars',
      params: { car: { brand: 'Audi', model: 'A3'} }
      assert_response :redirect
      follow_redirect!
      assert_response :success
  end
end
