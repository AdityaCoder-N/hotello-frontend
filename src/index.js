import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import orderReducer from './reducers/orderReducer'

const store = configureStore({
  reducer:orderReducer
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider  store = {store}>

      <App/>
      
    </Provider>
    {/* <App/> */}
  </React.StrictMode>
);

