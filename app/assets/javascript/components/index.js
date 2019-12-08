import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './HomePage'
import Index from './Cars/index'
import EditCar from './Cars/edit'
import Login from './Login'
import _ from 'lodash'


const initComponent = (selector, component) => {
  _.each(document.querySelectorAll(selector), element => {
    let data = {};
    if (typeof element.dataset.props !== "undefined") {
      data = JSON.parse(element.dataset.props);
    }

    const reactComponent = React.createElement(component, data);
    ReactDOM.render(reactComponent, element);
  });
};

document.addEventListener("turbolinks:load", () => {
  initComponent(".home_page", HomePage);
  initComponent(".login", Login);
  initComponent(".index", Index);
  initComponent(".edit", EditCar);
});
