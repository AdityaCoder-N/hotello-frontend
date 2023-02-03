import React,{useState,useEffect} from 'react'
import { useParams ,Link,  useNavigate} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

// import Razorpay from 'razorpay';
import './Reserve.css'
import { updateHotelName, updateCheckin,updateCheckout, updateRoomsBooked,updateImage } from '../../reducers/orderReducer'

const Reserve = ({setOpen,hotelId,hotelName,img}) => {

    const navigate = useNavigate();
    const host = 'http://localhost:3001'

    const [data,setData] = useState([{}]);
    const params = useParams();

    const fetchRooms= async ()=>{

        const response = await fetch(`${host}/hotels/getHotelRooms/${hotelId}`,{
            method: 'GET', 
                  
            headers: {
              'Content-Type': 'application/json',
            }

        });

        const list = await response.json();
        console.log("data : ",list)
        setData(list);
    }

    const [selectedRooms,setSelectedRoomsID] = useState([]);
    const [selectedRoomsNum,setSelectedRoomsNum] = useState([{ roomType:"",roomNumbers:[],roomPrice:"" }]);

    const dispatch = useDispatch();

    const handleSelect = async(e)=>{

        const parsed = JSON.parse(e.target.value);
        // console.log("parsed data : ",parsed);
        
        const checked = e.target.checked;
        const {id,num,type,price} = parsed;

        dispatch(updateRoomsBooked({id,num,type,price,checked}));      

        setSelectedRoomsID(checked?[...selectedRooms,id] :
                          selectedRooms.filter((item)=> item!==id))
                        
    }
    // console.log(selectedRooms);
    
    const handleReserve = async ()=>{

        try {

            await Promise.all(selectedRooms.map(async (roomId)=>{
                const res =  await fetch(`${host}/rooms/updateAvailableDates/${roomId}`,{

                    method: 'PUT', 
                  
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({dates : allDates})

                })
                console.log(res)
            }))
            dispatch(updateHotelName(hotelName))
            dispatch(updateImage(img))

        } catch (error) {
            console.log(error);
        }

    }

    const isAvailable=(roomNumber)=>{

        const isFound = roomNumber.unavailableDates.some(date=>allDates.includes(new Date(date).getTime()));

        return !isFound;
    }

    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let list=[];

        while(date<=end){
            list.push( new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }

        // console.log(list)
        return list;
    }

    const allDates = getDatesInRange(params.checkin.substring(1),params.checkout.substring(1));


    useEffect(() => {
      fetchRooms();

      dispatch(updateCheckin(params.checkin.substring(1)));
      dispatch(updateCheckout(params.checkout.substring(1)));
    //   dispatch(updateCost())

    }, [])


  return (
    <div className='reserve'>

        <div className='rContainer'>
            
            <i className="fa-solid fa-xmark rClose" onClick={()=>{setOpen(false)}}></i>
            <span>Select your rooms :</span>

            {data.map((item)=>{
                return(
                    <div className='rItem'>

                        <div className='rItemInfo'>
                            <div className='rTitle'>{item.title}</div>
                            <div className='rDesc'>{item.desc}</div>
                            <div className='rMax'>Max People : <b>{item.maxPeople}</b></div>
                            <div className='rPrice'>Price : {item.price}</div>
                        </div>
                        
                        <div className='rSelectRooms'>
                            {
                            (data.length-1) && item.roomNumbers.map((roomNumber)=>{
                                
                                return (
                                    <div className='rRoom'>
                                            <label>{roomNumber.number}</label>
                                            <input disabled={!isAvailable(roomNumber) } type="checkbox" 
                                            value={`{"id":"${roomNumber._id}","num":"${roomNumber.number}","type":"${item.title}","price":"${item.price}"}`} onChange={handleSelect}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <Link to={{pathname:'/checkout'}}><button className='rButton' onClick={handleReserve}>Reserve Now !</button></Link>
        </div>
        
    </div>
  )
}

export default Reserve