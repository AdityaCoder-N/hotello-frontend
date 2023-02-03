import './App.css';

import Navbar from './components/navbar/Navbar';

import React from 'react';

import Footer from './components/footer/Footer';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Hotels from './components/Hotels/Hotels';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import PaymentSuccess from './components/PaymentResultPage/PaymentSuccess';
import PaymentFailed from './components/PaymentResultPage/PaymentFailed';
import Checkout from './components/CheckoutPage/Checkout';



function App() {

  return (
    <>
    
    <div>

      <BrowserRouter>

        <Navbar/>
       
        <Routes>

          <Route exact path='/' element ={ <Home/> }></Route>
          {/*  */}
          <Route exact path='/hotels/:checkin/:checkout/:adults/:location/:latitude/:longitude' element ={ <Hotels/> }></Route>

          <Route exact path='/signup' element={ <SignUp/> } ></Route>

          <Route exact path='/login' element = { <Login/> }></Route>

          <Route exact path='/paymentSuccess' element = { <PaymentSuccess/> }></Route>
          <Route exact path='/paymentFailed' element = { <PaymentFailed/> }></Route>

          <Route exact path='/checkout' element = { <Checkout/> }></Route>
          


        </Routes>

        <Footer/>
        
      </BrowserRouter>
      
    </div>
    </>
  );
}

export default App;
