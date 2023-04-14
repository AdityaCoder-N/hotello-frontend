import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HotelPhotosModal from '../HotelPhotosModal/HotelPhotosModal';
import Reserve from '../Reserve/Reserve';
import './HotelItem.css'

function HotelItem(props) {

  const host = "https://hotello-backend-pjrg.onrender.com";
  // const host = "http://localhost:3001";

  const navigate = useNavigate();

  const [reserveModal,setReserveModal] = useState(false);
  const [photosModal,setPhotosModal] = useState(false);
  const [hotelId,setHotelId] = useState();

  const bookHotel=async()=>{

    if(!(localStorage.getItem("token")))
    {
      navigate('/login');
    }

    const response = await fetch(`${host}/hotels/createhotel`,{
      method: 'POST', 
            
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name : props.name, address: props.address, rating: props.rating, price:props.price })

    });

    const res = await response.json();
    console.log("response from create hotel : ",res)
    const hotel = res.hotel;
    setHotelId(hotel._id);

    // saving default rooms in hotels
    if(!res.found){
    const res1 = await fetch(`${host}/rooms/createRoom/${hotel._id}`,{

      method:'POST',

      headers:{
          'content-type':'application/json'
      },

      body:JSON.stringify({
          "title":"King size room",
          "desc":"King size room with balcony and washroom ",
          "price":"4000",
          "maxPeople":3,
          "roomNumbers" : [{"number":101} , {"number":102}, {"number":103}, {"number":104}, {"number":105} ]
      })
  })
  const res2 = await fetch(`${host}/rooms/createRoom/${hotel._id}`,{

      method:'POST',

      headers:{
          'content-type':'application/json'
      },

      body:JSON.stringify({
          "title":"Regular room",
          "desc":"Regular room with attached washroom",
          "price":"2500",
          "maxPeople":3,
          "roomNumbers" : [{"number":301} , {"number":302}, {"number":303}, {"number":304}]
      })
  })
  
    console.log("Response of room : ",res1,res2)
}
    setReserveModal(true);

  }

  const showPhotos = ()=>{
    setPhotosModal(true);
  }


  return (
    <div>
      <div className="card mb-3" style={{maxWidth:"100%"}} >
        <div className="row g-0">
          <div className="col-md-4 hItemImage">
            <img src={props.image} className="card-image img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              
              <h6> Average Price : {props.price}</h6>
              <h6 >Ratings : {props.rating}</h6>
              
              <div className='h-photos' onClick={showPhotos} >
                <i class="fa-regular fa-images"></i>
                Photos
              </div>
              <p className="card-text"><small className="text-muted">{props.address}</small></p>
              <div className='btn-container'>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                <button className='main-btn btn item-btn' onClick={bookHotel}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      { reserveModal && <Reserve setOpen={setReserveModal} hotelId={hotelId} open={reserveModal} hotelName={props.name} img={props.image}/> }
      { photosModal && < HotelPhotosModal setPhotosModal= {setPhotosModal} images = {props.hotelImages} photosModal={photosModal}/> }
    </div>
  )
}

export default HotelItem