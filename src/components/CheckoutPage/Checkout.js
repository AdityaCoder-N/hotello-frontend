import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Checkout.css'


const Checkout = (props) => {

    const host = "https://hotello-backend-pjrg.onrender.com";

    const [credentials,setCredentials] = useState({name:'',email:'',number:'',adhaar:''});

    const navigate = useNavigate();

    const onchange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleCheckout  = async(e)=>{

        e.preventDefault();

        const res = await fetch(`${host}/payment/checkout`,{
            method: 'POST', 
                  
            headers: {
              'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify({amount : 1})
        });
        
        const data = await res.json();
        console.log(data);
        console.log(data.order.id);
        const keyres = await fetch(`${host}/payment/getKey`,{
            method: 'GET', 
                  
            headers: {
              'Content-Type': 'application/json',
            }
        })
        const parsed = await keyres.json();
        const key = parsed.key;

        const verification_body={razorpay_payment_id:'',razorpay_order_id:'',razorpay_signature:''};
        const options = {
            key: key, // the razorpay Key ID generated from the Dashboard
            amount: data.order.amount, 
            currency: "INR",
            name: "Hotello",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: data.order.id, 
            handler: async function (response){
                verification_body.razorpay_payment_id=  response.razorpay_payment_id;
                verification_body.razorpay_order_id=  response.razorpay_order_id;
                verification_body.razorpay_signature=  response.razorpay_signature;
              
                const data = await fetch(`${host}/payment/paymentVerification`,{
                    method: 'POST', 
                          
                    headers: {
                      'Content-Type': 'application/json',
                    }
                    ,
                    body: JSON.stringify(verification_body)
                });

                const res = data.json();

                if(res){
                    navigate('/paymentSuccess');
                }
                else{
                    navigate('/paymentFailed');
                }
            },
            prefill: {
                "name": credentials.name,
                "email": credentials.email,
                "contact": credentials.number
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#D0826C"
            }
        };

        const razor = new window.Razorpay(options);
        
        razor.open();
        razor.on('payment.failed', function (response){
            alert(response.error.code);
        });

    }


    const {checkin,checkout, roomsBooked, hotelName,image} = useSelector((state)=>{
        return (state);
    })

    const [total,setTotal] = useState(0);

    
    console.log("rooms booked", roomsBooked);


    const calculateTotal=()=>{
        var cost = 0;

        roomsBooked.map((item)=>{
            cost += item.roomPrice * item.roomNumbers.length;
        })

        setTotal(cost);
    }

    useEffect(() => {
      calculateTotal();
    }, [])
    

    return (
        <div  id='c-page'>
     
        
        
        <div className='c-container'> 
        
            <div className='c-bookingDetails'>

                
                <h3 className=''>Booking Info</h3>

                <div >

                    <div className='booking-name-section'>

                        
                        <img src={image} alt='img' className='booking-name-img'></img>
                        
                        

                        <div style={{padding:"4px"}}>
                            <div className='booking-hotel-name'>{hotelName}</div>

                            <div className='booking-date'>
                                <div className='checkin'>
                                    <b>Checkin</b>
                                    <div>{checkin}</div>
                                </div>
                                <i class="fa-solid fa-arrow-right-long"></i> 
                                <div className='checkout'>
                                    <b>Checkout</b>
                                    <div>{checkout}</div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    
                    <div className='booking-room-container'>
                    <h4>Rooms Booked</h4>
                    { roomsBooked.map((item)=>{
                        console.log(item);
                        
                        return (
                            <div className='room-type' key={item.roomType}>
                                <h6>{item.roomType} : </h6>
                                
                                {
                                    item.roomNumbers.map((num)=>{
                                        return (
                                            <b>{num}</b>
                                        )
                                    })
                                }
                            </div>
                            
                        )
                    }) }
                    </div>

                    <h4 className='cost'>Booking total : </h4> <span style={{display:"inline-block"}}><b>   <i class="fa-solid fa-indian-rupee-sign"></i> {total}</b></span>
                </div>

            </div>

            <div className='c-paymentDetails'>
                <div>
                    <form onSubmit={handleCheckout}>
                        <div className='form-components c-out'>Please fill the Details to checkout</div>
                        <div className='form-components c-out'>
                            <label>Name</label>
                            <input type='text' className='form-control' placeHolder='eg : John' name='name' onChange={onchange} value={credentials.name}></input>
                        </div>

                        <div className='form-components c-out'>
                            <label>Email</label>
                            <input type='email' className='form-control' placeHolder='eg : abc@gmail.com' name='email' onChange={onchange} value={credentials.email}></input>
                        </div>

                        <div className='form-components c-out'>
                            <label>Mobile Number</label>
                            <input class="form-control" type="text" placeholder="+91 - " name='number' onChange={onchange} value={credentials.number}></input>
                        </div>
                        <div className='form-components c-out'>
                            <label>Adhaar Number</label>
                            <input class="form-control" type="text" placeholder="Adhaar card Number" name='adhaar' onChange={onchange} value={credentials.adhaar}></input>
                        </div>

                        <div className='form-components c-out'>
                            <label style={{ opacity: "0" }} >.</label>
                            <button type='submit' className='main-btn btn search-btn'>Pay Now</button>
                        </div>

                        </form>
                </div>
            </div>
        
        </div>

    </div>
  )
}

export default Checkout