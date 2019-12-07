import React from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import _ from 'lodash'
import AddNewCar from './new'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: []
    }
    this.renderCarCard = this.renderCarCard.bind(this)
  }

  componentDidMount() {
    this.getCars()
  }
  getCars() {
    axios.get('/cars/')
    .then(response => {
      const { 
        data: cars
      } = response
      this.setState({
        cars: cars
      })
    })
    .catch(error => (
      console.log(error)
    ))
  }

  renderCarCard(cars) {
    return (
      _.map(cars, car => (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://cam-l.pl/wp-content/uploads/2019/06/cc30.jpg" />
          <Card.Body>
            <Card.Title>{car.brand}{car.model}</Card.Title>
            <Card.Text>
              <p>Year: {car.year}</p>
              <p>Horsepower: {car.power}</p>
              <p>Color: {car.color}</p>
              <p>Price per 24h: {car.price}</p>
            </Card.Text>
            <Button variant="dark">Order</Button>
          </Card.Body>
        </Card>
      ))
    )
  }

  render() {
    const {
      cars
    } = this.state
    return(
     <div>
       <div className="header_button">
         <AddNewCar />
       </div>
       { _.isEmpty(cars) ? 
        <Spinner animation="border" variant="light">
          <span className="sr-only">Loading...</span>
        </Spinner>
     :
       this.renderCarCard(cars)
     }
     </div>
    )
  }
}

export default Index