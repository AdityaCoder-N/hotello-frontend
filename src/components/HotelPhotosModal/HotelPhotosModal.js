import React from 'react'
import './photosModal.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelPhotosModal = ({setPhotosModal, photosModal, images}) => {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
      };

    //   console.log(images);
  return (

    <div className='photosModal'>


        <div style={{width:"100%" ,position:"relative" ,zIndex:"5"}}>

          <i className="fa-solid fa-xmark pClose" onClick={()=>{setPhotosModal(false)}}></i>
          <Slider {...settings} >
            <div className="photoModal-container">
                <img src={images[0]} className='modal-img'/>
            </div>
            <div className="photoModal-container">
                <img src={images[1]} className='modal-img'/>
            </div>
            <div className="photoModal-container">
                <img src={images[2]} className='modal-img'/>
            </div>
            <div className="photoModal-container">
                <img src={images[3]} className='modal-img'/>
            </div>
            
          </Slider>
        </div>

    </div>

  )
}

export default HotelPhotosModal