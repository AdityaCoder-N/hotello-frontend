import React,{useState,useEffect} from 'react'
import { sliderData } from './sliderData'
import "./Carrousel.css"
import {useNavigate } from 'react-router-dom'
import Alert from '../Alert/Alert';

function Carrousel() {

  const [current,setCurrent] = useState(0);
  const [showAlert,setShowAlert] = useState(false);

  const [autoplay,setAutoplay] = useState(true);

  const navigate = useNavigate();

  const length = sliderData.length;

  const nextSlide=()=>{
    setCurrent((current+1)%length);
  }
  const prevSlide=()=>{
    setCurrent((current-1<0)?current-1+length:current-1);
  }
  
  let timeout=null;

  useEffect(()=>{
     timeout = autoplay && setTimeout(()=>{
      nextSlide();
    },3500)
  })
  

  // booking card


  const [request,setRequest] = useState({checkin:"",checkout:"",adults:"",location:""});

  const submit =(e)=>{

    e.preventDefault();

    var inputCheckin = new Date(request.checkin);
    var inputCheckout = new Date(request.checkout);

    let today = new Date();
    
    if((inputCheckin.getTime() < today.getTime()) || (inputCheckout.getTime() < today.getTime()))
    {
        setShowAlert(1);
        return;
    }
    
    navigate(`hotels/:${request.checkin}/:${request.checkout}/:${request.adults}/:${request.location}/:/:`);
  }

  const onchange=(e)=>{
    setRequest({...request,[e.target.name]:e.target.value});
  }


  return (
    <div>

      <section className='slider' onMouseEnter={()=>{setAutoplay(false); clearTimeout(timeout);}} onMouseLeave={()=>{setAutoplay(true)}}>
          <i className="fa-solid fa-angle-left left-arrow" onClick={prevSlide}></i>

          {sliderData.map((element,index)=>{

              return (
                <div className={(index===current)?"slide current":"slide"} key={index} >
                  {index===current && (
                  <>
                    <div className='image-container'>
                      <img src={element.img} alt="img" className={'image darken'}/>

                      <h2 className='content'>{element.title}</h2>
                    </div>
                  </>
                  )}
                </div>
              )
            })
          }
          <i className="fa-solid fa-angle-right right-arrow" onClick={nextSlide}></i>
      </section>

      {/* booking card */}
      <div className='container booking-area'>

        <form className='row' onSubmit={submit}>

          <div className='col-md-3'>
          <label>Check-In</label>
            <input type='date' className='form-control' placeholder = 'date' name='checkin' onChange={onchange} value={request.checkin}></input>
          </div>

          <div className='col-md-3'>
            <label>Check-Out</label>
            <input type='date' className='form-control' placeholder = 'date' name='checkout' onChange={onchange} value={request.checkout}></input>
          </div>

          <div className='col-md-2'>
            <label>Guests</label>
            <select className='form-control' name='adults' onChange={onchange} value={request.adults}>
              <option defaultValue={1} >Adults</option>
              <option value='1' >1</option>
              <option value='2' >2</option>
              <option value='3' >3</option>
              <option value='4' >4</option>
              <option value='5' >5</option>
            </select>
          </div>

          <div className='col-md-2'>
            <label>Location</label>
            <input className="form-control" type="text" placeholder="Enter Location" name='location' onChange={onchange} value={request.location}></input>
          </div>
          <div className='col-md-2' >
            <label style={{opacity:"0"}} >.</label>
            <button type='submit' className='main-btn btn search-btn' style={{width:"100%"}}>Search</button>
          </div>

        </form>
      </div>

      {showAlert && <Alert message={"Please select a valid Date !"} setShowAlert={setShowAlert}/>}
    </div>
  )
}

export default Carrousel