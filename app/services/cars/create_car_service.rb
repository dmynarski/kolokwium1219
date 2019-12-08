module Cars
  class CreateCarService < ApplicationService
    attr_accessor :permitted_attributes, :car

    def initialize(args)
      @permitted_attributes = args[:permitted_attributes].to_h
      @car = Car.new
    end

    def call
      run_transactions
      return @car
    end

    private

    def run_transactions
        determine_attributes
        @car.save
    end

    def determine_attributes
      @car.assign_attributes(@permitted_attributes)
    end

  end
end