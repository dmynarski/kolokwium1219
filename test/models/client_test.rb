require 'test_helper'

class ClientTest < ActiveSupport::TestCase
  test "create a new client" do
    client = Client.new
    client.first_name = "Adam"
    client.last_name = "Kowalski"
    client.email = "adam.kowalski@onet.pl"
    assert client.save
  end
end
