import React from 'react'
import './Alert.css'

const Alert = ({message, setShowAlert}) => {

  return (
    <div className='alert' >
        
        <div className='alert-container' data-aos="fade-down" data-aos-delay="10" data-aos-duration="500">
          
            <i className="fa-solid fa-xmark alertClose" onClick={()=>{setShowAlert(false)}}></i>
            <h3>
                {message}
            </h3>
        </div>
    </div>
  )
}

export default Alert