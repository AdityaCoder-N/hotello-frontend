import React, { useEffect, useRef, useState } from 'react'
import HotelItem from './HotelItem';
import { useParams,useNavigate } from 'react-router-dom';

import './Hotels.css'
import Alert from '../Alert/Alert';

const axios = require("axios");

// prakh 'ce8ead3737msh5b6f79144344637p10eba4jsnaf4455442cc9',
// aditya '064a565b0fmshc4871aedc663148p130920jsnc2b7e4108731',
const key = '064a565b0fmshc4871aedc663148p130920jsnc2b7e4108731';

const Hotels = (props) => {

    
    const [hotels,setHotels] = useState([]);
    const idArray  = useRef([]);

    const [count,setCount] = useState(0);

    const [loading,setLoading] = useState(true);
    
    const params = useParams();
    const navigate = useNavigate();

    function todaysDate() {
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    function tomDate() {
        var tomorrow = new Date(); // The Date object returns today's timestamp
        tomorrow.setDate(tomorrow.getDate() + 1);

        var dd = String(tomorrow.getDate()).padStart(2, '0');
        var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tomorrow.getFullYear();

        tomorrow = yyyy + '-' + mm + '-' + dd;

        return tomorrow;
    }

    const getDestinationId = async (destination) => {

        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/regions',
            params: {locale: 'en_IN', query: destination, domain: 'IN'},
            headers: {
              'X-RapidAPI-Key': key,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        };


        axios.request(options).then((response) => {

            let id = response.data.data[0].gaiaId;
            // console.log("destination id : ", id);
            getHotelById(id);
        })
    }

    const setIdArray = (arr) =>{
        idArray.current = idArray.current.concat(arr);
    }

    const getHotelById = async (id) => {


        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
            params: {
                domain: 'IN',
                sort_order: 'REVIEW',
                checkin_date: params.checkin.substring(1) ? params.checkin.substring(1) : todaysDate(),
                checkout_date: params.checkout.substring(1) ? params.checkin.substring(1) : tomDate(),
                region_id: id,
                adults_number: params.adults.substring(1) ? params.adults.substring(1) : '1',
                locale: 'en_IN',
            },
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        };


        axios.request(options).then((response) => {

            const hotelArray = response.data.properties;
            // console.log("hotel array", hotelArray);
            const tempArr = [];

            for (let i = 0; i <Math.min(hotelArray.length,20); i++) {
                tempArr.push({ id: hotelArray[i].id, image: hotelArray[i].propertyImage.image.url, price : hotelArray[i].price.lead.formatted });
            }
            // console.log("array sent to getHotelDetails : ",tempArr);

            // console.log("temp arr ",tempArr)
            setIdArray(tempArr);
            

            getHotelDetails();

        })


    }

    const getNearbyHotels = async (latitude, longitude) => {
   
        const res = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
        
        const address = await res.json();
        // console.log(address);

        const destination = address.address.city;
        getDestinationId(destination);
    }


    const getHotelDetails = async () => {

        // console.log("id array : ",idArray);

        setCount(count+4);

        let parsedData = [];

        for (let i = count; i < Math.min(idArray.current.length, count+4); i++) {

            setTimeout(()=>{
                const temp_options = {
                    method: 'GET',
                    url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
                    params: {
                        
                        domain: 'IN', 
                        locale: 'en_IN',
                        hotel_id: idArray.current[i].id,
                        
                    },
                    headers: {
                        'X-RapidAPI-Key': key,
                        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
                    }
                };
    
                axios.request(temp_options).then((response)=>{
                    const hotelImages=[];
                    const imageArr = response.data.propertyGallery.images;
                    for(let i=0;i< Math.min(imageArr.length,4);i++)
                    {
                        hotelImages.push(imageArr[i].image.url);
                    }
                    // console.log(response.data);
                    const obj = {
                        id: response.data.summary.id,
                        name: response.data.summary.name,
                        address: response.data.summary.location.address.firstAddressLine +" "+ response.data.summary.location.address.secondAddressLine,
                        price: idArray.current[i].price,
                        rating: response.data.summary.overview.propertyRating.rating,
                        thumbnail: idArray.current[i].image,
                        images:hotelImages,
                        mapImage : response.data.summary.location.staticImage.url
                    }
                    parsedData.push(obj);
                    const newhotels = hotels.concat(parsedData);
                    setHotels(newhotels);
                    setLoading(false);
        
                })
            },1000)
            
        }
        
    }

    const [showAlert,setShowAlert] = useState(false);
    useEffect(() => {

        
        setLoading(true);
        if (params.location.length > 1) {
            getDestinationId(params.location.substring(1));
        }
        else {
            getNearbyHotels(params.latitude.substring(1), params.longitude.substring(1));
        }
        

    }, []);

    const [request,setRequest] = useState({checkin:"",checkout:"",adults:"",location:""});

    const submit =(e)=>{
        
        e.preventDefault();
        var inputCheckin = new Date(request.checkin);
        var inputCheckout = new Date(request.checkout);

        let today = new Date();
        
        if((inputCheckin.getTime() < today.getTime()) || (inputCheckout.getTime() < today.getTime()))
        {
            setShowAlert(true);
            return;
        }
        navigate(`hotels/:${request.checkin}/:${request.checkout}/:${request.adults}/:${request.location}/:/:`);
    }

    const onchange=(e)=>{
        setRequest({...request,[e.target.name]:e.target.value});
    }

    const fetchMoreHotels = ()=>{
        getHotelDetails();
    }
    
    return (

        <div className='hotels-container'>
        <div className='row'>

            <div className='left-side col-md-8'  id='hotels-list'>
                
                {loading && <div> 
                    <div className='text-center my3'>
                        <img src='./images/loading.gif' alt='Loading . . .'></img>
                    </div> 
                    
                </div> }
                <div className='row'>
                    {hotels.map((element) => {
                        return (
                            <div key={element.name} className="col-md-12">
                                {/* {console.log("hotel state : ",hotels)} */}
                                {/* {console.log(element.images)} */}
                                <HotelItem name={element.name} address={element.address} price={element.price}
                                    rating={element.rating}
                                    image={element.thumbnail}
                                    hotelImages={element.images}
                                    />
                            </div>
                        );
                    })}
                    
                </div>

                {!loading && <button onClick={fetchMoreHotels} className='btn search-btn'>Find More</button>}
            </div>

            <div className='right-side col-md-4'>

                <div className='hotels-booking-area'>

                    <form onSubmit={submit}>

                        <div className='form-components h-formComp'>
                            <label>Check-In</label>
                            <input type='date' className='form-control' placeHolder='date' name='checkin' onChange={onchange} value={request.checkin}></input>
                        </div>

                        <div className='form-components h-formComp'>
                            <label>Check-Out</label>
                            <input type='date' className='form-control' placeHolder='date' name='checkout' onChange={onchange} value={request.checkout}></input>
                        </div>

                        <div className='form-components h-formComp'>
                            <label>Guests</label>
                            <select className='form-control' name='adults' onChange={onchange} value={request.adults}>
                                <option selected >Adults</option>
                                <option value='1' >1</option>
                                <option value='2' >2</option>
                                <option value='3' >3</option>
                                <option value='4' >4</option>
                                <option value='5' >5</option>
                            </select>
                        </div>

                        <div className='form-components h-formComp'>
                            <label>Location</label>
                            <input class="form-control" type="text" placeholder="Enter Location" name='location' onChange={onchange} value={request.location}></input>
                        </div>
                        <div className='form-components h-formComp'>
                            <label style={{ opacity: "0" }} >.</label>
                            <button type='submit' className='main-btn btn search-btn'>Search</button>
                        </div>

                    </form>
                </div>

                <div className='offers'>

                    <div style={{fontSize:"20px"}}>
                        Holidays
                        <br/>
                        <div style={{fontSize:"28px",fontWeight:"700"}}>
                            10% Off
                        </div>
                    </div>

                    <div className='offers-content'>
                        <ul>
                            <li>-Minimum Stay 2 nights</li>
                            <li>-Early Booking</li>
                            <li>-Breakfast Included</li>
                            <li>-Free Cancellations (see terms)</li>
                            <li>-Cleaning Included</li>
                        </ul>
                    </div>

                    <button className='btn search-btn' style={{marginTop:"20px"}}>See Deal</button>

                </div>

            </div>
            </div>

        {showAlert && <Alert message={"Please select a valid Date !"} setShowAlert={setShowAlert}/>}
        </div>

    )
}

export default Hotels