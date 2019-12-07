class CarsController < ApplicationController
  def index
    @cars = Car.all
    respond_to do |format|
      format.html { render 'index'}
      format.json { render json: @cars }
    end
  end

  def new
    
  end

  def create
    
  end

  def show
    
  end

  def delete
    
  end

  def update
    
  end

  private
end