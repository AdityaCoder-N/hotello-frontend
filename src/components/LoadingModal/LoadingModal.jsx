import React from 'react'
import Loading from '../Loading/Loading'
import './LoadingModal.css'
const LoadingModal = () => {
  return (
    <div className='loading-modal'>

        <div className="loading-modal-content">
            <Loading></Loading>    
        </div> 
        
    </div>
  )
}

export default LoadingModal