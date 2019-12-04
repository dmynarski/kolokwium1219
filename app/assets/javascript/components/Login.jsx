import React from 'react';
import Popup from "reactjs-popup";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import _ from 'lodash'



class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current_user: this.props.user_logged,
      fields: {
        email: '',
        password: ''
      }
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleFieldValue = this.handleFieldValue.bind(this)
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  }

  handleFieldValue = (fieldName, value) => {
    this.setState(prevState => {
      const { fields } = prevState;
      const newFields = Object.assign({}, fields, { [fieldName]: value });
      return { fields: newFields };
    });
  };

  login() {
    const {
      fields: {
        email,
        password
      }
    } =  this.state

    const csrfToken = () =>
      document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const formData = new FormData()
    formData.append('user[email]', email)
    formData.append('user[password]', password)
    formData.append('authenticity_token', csrfToken())


    axios.post('/users/sign_in', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(response => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
  }

  logout() {
    const formData = new FormData()
    formData.append('authenticity_token', document.querySelector('meta[name="csrf-token"]').getAttribute("content"))
    axios.get('/users/sign_out')
      .then(response => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const popupStyle = {
      backgroundColor: "rgb(82, 82, 82)",
      border: "1px solid rgb(82, 82, 82)",
      width: "30%",
      borderRadius: "3px",
      padding: "25px"
    }

    const {
      current_user
    } = this.state
    
    const userNotLoggedPopup = (close) => (
      <div>
        <h3>Login</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            onChange={e => this.handleFieldValue('email', e.target.value)}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" 
            placeholder="Password" 
            onChange={e => this.handleFieldValue('password', e.target.value)}/>
        </Form.Group>
        
        <Button variant="outline-light" onClick={close} style={{ marginRight: '15px'}}>
          Cancel
        </Button>

        <Button variant="dark" onClick={this.login}>
          Login
        </Button>
      </div>
    )
    const userLoggedPopup = (close) => (
      <div>
        <h3>Logged as:</h3>
        <h4>{current_user.email}</h4>
        
        <Button variant="outline-light" onClick={close} style={{ marginRight: '15px'}}>
          Cancel
        </Button>

        <Button variant="dark" onClick={this.logout}>
          Logout
        </Button>
      </div>
    )
    
console.log(this.props)
    return (
      <div>
        <Popup trigger={<i className="fa fa-male"></i>} modal contentStyle={popupStyle}>
          {close => (
            <Form>
              {_.isNil(current_user) ? userNotLoggedPopup(close) : userLoggedPopup(close)}
            </Form>
          )}
        </Popup>
      </div>
    );
  }
}

export default HomePage