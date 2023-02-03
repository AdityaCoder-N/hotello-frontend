import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../Alert/Alert';
import './Search.css'

const Search = () => {
    
    const navigate = useNavigate();
    
    const [request,setRequest] = useState({checkin:"",checkout:"",adults:""});
    
    const onchange=(e)=>{
        setRequest({...request,[e.target.name]:e.target.value});
    }

    const searchHotel =() => {


        var inputCheckin = new Date(request.checkin);
        var inputCheckout = new Date(request.checkout);

        let today = new Date();
        
        if((inputCheckin.getTime() < today.getTime()) || (inputCheckout.getTime() < today.getTime()))
        {
            setShowAlert(1);
            return;
        }

        navigator.geolocation.getCurrentPosition((position)=>{
            
            // navigate(`hotels/:/:/:/:/:${position.coords.latitude}/:${position.coords.longitude}`);
            navigate(`hotels/:${request.checkin}/:${request.checkout}/:${request.adults}/:/:${position.coords.latitude}/:${position.coords.longitude}`);
    
        },()=>{
            console.log("Unable to get location");
        })

    }
    const [showAlert,setShowAlert] = useState(false);
   

  return (
    <div className='search-container container' id='search'>

        <div className='row'>

        <div className='search-component col-md-4'>

            <div className='search-body'>

                <div className='search-content' data-bs-toggle="modal" data-bs-target="#exampleModal" >

                    <div className='text'>
                    <i className="fa-solid fa-location-dot" style={{margin:"10px"}}></i>Get Hotels Near You
                    </div>
                </div>

            </div>
        </div>

        <div className='col-md-8'>
            <img src='./images/h6-img-3.jpg' id='search-img'/>
        </div>
        
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Set Additional info</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className='hotels-booking-area-modal'>
                        <form>
                            <div className='form-components'>
                                <label>Check-In</label>
                                <input type='date' className='form-control' placeHolder='date' name='checkin' onChange={onchange} value={request.checkin}></input>
                            </div>

                            <div className='form-components'>
                                <label>Check-Out</label>
                                <input type='date' className='form-control' placeHolder='date' name='checkout' onChange={onchange} value={request.checkout}></input>
                            </div>

                            <div className='form-components'>
                                <label>Guests</label>
                                <select className='form-control' name='adults' onChange={onchange} value={request.adults}>
                                    <option selected >Adults</option>
                                    <option value='1' >1</option>
                                    <option value='2' >2</option>
                                    <option value='3' >3</option>
                                    <option value='4' >4</option>
                                    <option value='5' >5</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary modal-btn" data-bs-dismiss="modal" onClick={searchHotel}>Search</button>
                </div>
                </div>
            </div>
        </div>
        {showAlert && <Alert message={"Please select a valid Date !"} setShowAlert={setShowAlert}/>}
    </div>
  )
}

export default Search