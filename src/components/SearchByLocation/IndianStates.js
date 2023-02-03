import React from 'react'
import {locations} from "./locations"
import "./IndianStates.css"
import { Link } from "react-router-dom";


const IndianStates = () => {
  return (
    <div className='states'>
      <h2>Explore New Places</h2>

      <div className='states-container'>

        {locations.map((element,index)=>{

          return(
            <div className='items' key={index}>
              <div className='card-image'>
                <Link to='/hotels'><img src={element.img} alt="" className="image"/></Link>
              </div>
              <div className='card-content'>
                <p>{element.name}</p>
              </div>
            </div>
          );

        })}

      </div>
    </div>
  )
}

export default IndianStates