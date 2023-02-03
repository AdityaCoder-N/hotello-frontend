import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    hotelName : "",
    checkin: "",
    checkout: "",
    // roomsBooked : [{ roomType:"",roomNumbers:[],roomPrice:""}],
    roomsBooked : [],
    cost: 1,
    image:''
}

const orderReducer = createSlice({
    name:'order',
    initialState:initialState,
    reducers: {
        updateImage(state,action){
            state.image = action.payload;
        },
        updateHotelName(state,action){
            state.hotelName = action.payload;
        },
        updateCheckin(state,action){
            state.checkin = action.payload;
        },
        updateCheckout(state,action){
            state.checkout = action.payload;
        },
        updateRoomsBooked(state,action){

            const {num,type,checked,price,id} = action.payload;
            const booked = state.roomsBooked;

            console.log(checked)
            console.log(num)
            
            
            const present = state.roomsBooked.filter((item)=>item.roomType===type);
            // console.log("is present : ",present)

            if(!checked){
                const i = state.roomsBooked.indexOf(present[0]);
                state.roomsBooked[i].roomNumbers  =  state.roomsBooked[i].roomNumbers.filter((item)=>item!==num)

                if(state.roomsBooked[i].roomNumbers.length<=0)
                {
                    state.roomsBooked = state.roomsBooked.filter((item)=>item.type!==type);
                }
            }
            else{
                if(present.length>0){

                    // console.log("this type is already present")
                    const i = state.roomsBooked.indexOf(present[0]);
                    
                    state.roomsBooked[i].roomNumbers = [...state.roomsBooked[i].roomNumbers,num]
                }
                else{
                    // console.log("this type is not present")
                    state.roomsBooked = [...state.roomsBooked,{roomType:type,roomNumbers:[num],roomPrice:price}]
                }
            }

            console.log(state.roomsBooked);
        },
        updateCost(state,action){
            state.cost = action.payload;
        }
    }
})


export const {updateCost,updateCheckin,updateCheckout,updateHotelName,updateRoomsBooked,updateImage} = orderReducer.actions
export default orderReducer.reducer