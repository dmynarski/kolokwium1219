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
    response = ::Cars::CreateCarService.new(permitted_attributes: car_params).call
  end

  def show
    
  end

  def delete
    
  end

  def destroy
    set_car.destroy
  end

  def edit
    set_car
  end
  def update
    set_car.update(car_params)
  end

  private
  def set_car
    @car = Car.find(params[:id])
  end

  def car_params
    params.require(:car).permit(
    :brand,
    :model,
    :year,
    :power,
    :color,
    :engine,
    :price
    )
  end
end