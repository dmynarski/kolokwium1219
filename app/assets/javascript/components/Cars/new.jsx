import React from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import _ from 'lodash'

class AddNewCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        year: '',
        brand: '',
        model: '',
        engine: null,
        power: null,
        price: null,
        color: ''
      },
      getMakes: [],
      getModels: [],
      getTrims: [],
      models: [],
      engines: [],
      trims: [],
      responseMessage: ''
    }
    this.submit = this.submit.bind(this)
  }

  handleFieldValue = (fieldName, value) => {
    this.setState((prevState) => {
      const { fields } = prevState
      const newFields = Object.assign({}, fields, { [fieldName]: value })
      return (
        { fields: newFields }
      )
    })
  }

  submit() {
    const {
      fields: {
        year,
        brand,
        model,
        engine,
        power,
        price,
        color
      }
    } = this.state
    const formData = new FormData();
    _.each({year, brand, model, engine, power, price, color}, (value, key) => (
      formData.append(`car[${key}]`, value)
    ))
    formData.append('authenticity_token', document.querySelector('meta[name="csrf-token"]').getAttribute("content"))

    axios.post('cars', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
    .then(response => (
      this.setState({
        responseMessage: 'Car added succesfully!'
      }),
      window.location.reload()
    ))
    .catch(error => (
      console.log(error)
    ))
  }

  searchCar(whatToGet, arg) {
    let data;
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=${whatToGet}${arg}`)
    .then(response => (
      data = Object.values(JSON.parse(response.data.slice(2,response.data.length -2))),
      this.setState({
        [whatToGet]: _.map(data[0], object => ({
          value: Object.values(object)[0],
          label: Object.values(object)[0].toUpperCase()
        }))
      })
    ))
    .catch(error => (
      console.log(error)
    ))
  }

  getTrims(arg) {
    let data;
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&${arg}`)
    .then(response => (
      data = Object.values(JSON.parse(response.data.slice(2,response.data.length -2))),
      this.setState({
        getTrims: data,
        engines: _.map(data[0], object => ({
          value: object.model_engine_cc,
          label: object.model_engine_cc
        }))
      })
    ))
    .catch(error => (
      console.log(error)
    ))
  }
  render() {
    const {
      fields: {
        year,
        brand,
        model,
        engine,
        power
      },
      getMakes,
      getModels,
      getTrims,
      trims,
      engines,
      models,
      responseMessage
    } = this.state
    return(
     <Popup
      trigger={<Button className="header_button">Add new car</Button>}
      modal
      contentStyle={{
        border: 'none',
        background: 'none',
        width: '30%'
      }}
     >
       {close => (
       <div className="modal-content">
         <div className="modal-header">
           <h3>Add new car</h3>
         </div>
         <div className="modal-body">
          <Form>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control placeholder="Input Year" onChange={event => (this.handleFieldValue('year', event.target.value), event.target.value.length === 4 ? this.searchCar(`getMakes`,`&year=${event.target.value}`) : '')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Brand</Form.Label>
              <Select 
              options={getMakes}
              onChange={event => (this.handleFieldValue('brand', event.value), this.searchCar(`getModels`,`&make=${event.value}&year=${year}`))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Model</Form.Label>
              <Select 
              options={getModels}
              onChange={event => (this.handleFieldValue('model', event.value), this.getTrims(`&make=${brand}&year=${year}&model=${event.value}`))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Engine (CM3)</Form.Label>
              <Select 
              options={engines}
              onChange={event => (this.handleFieldValue('engine', event.value),
                                  this.setState({ trims: _.find(getTrims[0], ['model_engine_cc', event.value.toString()])}),
                                  this.handleFieldValue('power', trims.model_engine_power_ps)
                                  )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Power: {power} HP</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control placeholder="Input price per day" onChange={event => (this.handleFieldValue('price', event.target.value))} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control placeholder="Input color of car" onChange={event => (this.handleFieldValue('color', event.target.value))} />
            </Form.Group>
          </Form>
         </div>
         <div className="modal-footer">
            { _.isEmpty(responseMessage) ? '' : <Alert variant="success">{responseMessage}</Alert>}
            <Button variant="outline-dark" onClick={close}>Close</Button>
            <Button variant="dark" onClick={this.submit}>Add</Button>
         </div>
       </div>
       )}
     </Popup>
    )
  }
}

export default AddNewCar