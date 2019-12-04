class HomeController < ApplicationController
  def index
    puts current_user
  end
end
