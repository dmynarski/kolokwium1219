import React from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import _ from 'lodash'
import AddNewCar from './new'
import EditCar from './edit'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      userLogged: this.props.userLogged
    }
    this.renderCarCard = this.renderCarCard.bind(this)
    this.deleteCar = this.deleteCar.bind(this)
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

  deleteCar(id) {
    axios.delete(`/cars/${id}`)
    .then(response => (
      alert("Car deleted!"),
      setTimeout(window.location.reload(), 1000)
    ))
    .catch(error => (
      console.log(error)
    ))
  }

  renderCarCard(cars) {
    return (
      _.map(cars, car => (
        <div style={{ marginLeft: 'auto', marginRight: 'auto'}}>
        <Card style={{ width: '18rem', float: 'left', marginRight: '15px', marginTop: '10px' }}>
          <Card.Img variant="top" src="http://cam-l.pl/wp-content/uploads/2019/06/cc30.jpg" />
          <Card.Body>
            <Card.Title>{car.brand} {car.model}</Card.Title>
            <Card.Text>
              <p>Year: {car.year}</p>
              <p>Engine: {car.engine} cm3</p>
              <p>Power: {car.power}HP</p>
              <p>Color: {car.color}</p>
              <p>Price per 24h: {car.price}PLN</p>
            </Card.Text>
            { _.isNil(this.state.userLogged) ? 
            null 
            :
             <React.Fragment>
               <a href={`/cars/${car.id}/edit`} className="btn btn-primary">Edit</a>
               <Button variant="danger" onClick={() => window.confirm(`Delete ${car.brand} ${car.model}?`) && this.deleteCar(car.id)}>Delete</Button>
             </React.Fragment> }
            <Button variant="dark">Order</Button>
          </Card.Body>
        </Card>
        </div>
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