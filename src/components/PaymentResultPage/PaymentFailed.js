import React, {useState,useEffect} from 'react'

const PaymentFailed = () => {

  const [url,setUrl]= useState("");

  const fetchMeme=async()=>{
    const data = await fetch('https://meme-api.com/gimme',{
        method: 'GET',
        // headers: {
        //   'X-RapidAPI-Key': '064a565b0fmshc4871aedc663148p130920jsnc2b7e4108731',
        //   'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
        // }
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

          <div className='p-f-top'>

            <i class="fa-regular fa-circle-xmark"></i>
        
            <h3>Oops Payment Failed!</h3>
            <p>Some Problem Occurred. Please revisit the payment!</p>

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

export default PaymentFailed