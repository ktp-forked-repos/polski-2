/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { store } from './store'

/* eslint-disable no-undef */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
/* eslint-enable no-undef */
