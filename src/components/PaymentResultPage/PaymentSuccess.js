import React, { useEffect, useState } from 'react'

import './Payment.css'

const PaymentSuccess = () => {
    const [url,setUrl]= useState("");

    const fetchMeme=async()=>{
      const data = await fetch('https://meme-api.com/gimme',{
          method: 'GET'
      })

      const memeData = await data.json();
      if(memeData.nsfw==true){
        fetchMeme();
      }
      else
        setUrl(memeData.url);
    }

    useEffect(()=>{
      fetchMeme();
    },[])

  return (
    <div className='p-success-outer'>
      <div className='p-success-container'>

          <div className='p-top'>

            <i class="fa-regular fa-circle-check"></i>
        
            <h3>Payment Successfull!</h3>
            <p>Your order is Successfull annd will be processed soon!</p>

          </div>
          
          <div className='p-bottom'>
            <h4>No Hotels are booked for <i class="fa-solid fa-indian-rupee-sign"></i> 1</h4>
            <div>
              Here is a meme instead : 
            </div>
            <img src={url} alt='img'></img>
          </div>
      </div>
    </div>
  )
}

export default PaymentSuccess