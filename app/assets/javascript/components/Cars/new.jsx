import React from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import _ from 'lodash'

class AddNewCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        year: ''
      },
      brands: [],
      models: [],
      engines: []
    }
  }

  handleFieldValue(value) {
    this.setState({ year: value})
  }

  submit() {
    axios.get('/cars/')
    .then(response => {
      console.log(response)
    })
    .catch(error => (
      console.log(error)
    ))
  }

  searchCar(arg1, arg2) {
    console.log(arguments)
    let data;
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=${arg1}&year=${arg2}`)
    .then(response => (
      data = JSON.parse(response.data.slice(2,response.data.length -2)),
      console.log(data)
    ))
    .catch(error => (
      console.log(error)
    ))
  }
  render() {
    const {
      fields: {
        year
      },
      brands,
      models,
      engines
    } = this.state
    return(
     <Popup
      trigger={<Button className="header_button">Add new car</Button>}
      modal
      open
      contentStyle={{
        border: 'none',
        background: 'none',
        width: '20%'
      }}
     >
       <div className="modal-content">
         <div className="modal-header">
           <h3>Add new car</h3>
         </div>
         <div className="modal-body">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Year</Form.Label>
              <Form.Control placeholder="Input Year" onChange={event => (this.handleFieldValue(event.target.value), event.target.value.length === 4 ? this.searchCar('getMakes', event.target.value) : '')} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Select Brand</Form.Label>
              <Select options={brands}/>
            </Form.Group>
          </Form>
         </div>
         <div className="modal-footer">
           Footer
         </div>
       </div>
     </Popup>
    )
  }
}

export default AddNewCar