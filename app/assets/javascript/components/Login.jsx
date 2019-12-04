import React from 'react';
import Popup from "reactjs-popup";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class HomePage extends React.Component {
  constructor(props) {
    super(props)

    
  }
  render() {
    const popupStyle = {
      backgroundColor: "rgb(82, 82, 82)",
      border: "1px solid rgb(82, 82, 82)",
      width: "30%",
      borderRadius: "3px",
      padding: "25px"
    }
    return (
      <div>
        <Popup trigger={<i className="fa fa-male"></i>} modal contentStyle={popupStyle}>
          {close => (
            <Form>
              <h3>Login</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="outline-light" onClick={close} style={{ marginRight: '15px'}}>
              Cancel
            </Button>

            <Button variant="dark" type="submit">
              Login
            </Button>
          </Form>
          )}
        </Popup>
      </div>
    );
  }
}

export default HomePage