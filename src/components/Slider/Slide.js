import React from 'react'
import {useNavigate} from 'react-router-dom'
import { vacationsData } from "./vacationsData";
import "./Slider.css"

function Slide(props) {

  const navigate = useNavigate();

  const search = ()=>{

    navigate(`hotels/:/:/:/:${vacationsData[props.index].name}/:/:`);

  }

  return (
    <div className='vacation-container' onClick={search}>
        <img src={vacationsData[props.index].img} alt="" className="vactaion-image" />
        <p className={`vacation-content`}>{vacationsData[props.index].title}</p>
    </div>
  )
}

export default Slide