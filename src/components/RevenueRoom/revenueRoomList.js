import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './revenueRoom';

function RoomList({payBill}) {
    const [rooms, setRooms] = useState([]); 
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut]= useState(""); 
    const [totalPrice, setTotalPrice]= useState(0);
    const {user} = useContext(UserContext)

    useEffect(() =>{
		if(!user) setRooms([]);
		else getRooms();
	},[user]);

    async function getRooms() {
		const roomData = await Axios.get("http://localhost:5000/bookRoom/manager");
		let sortedEmployees  = [...roomData.data];
		sortedEmployees = sortedEmployees.filter(a => a.stateGiveMoney===payBill && Date.parse(dateIn)<=Date.parse(a.checkOut)&& Date.parse(dateOut)>=Date.parse(a.checkOut));
         
    if(sortedEmployees.length>0){
      let test= 0;
     sortedEmployees.forEach((a)=> {
         test +=a.price*(parseInt(a.checkOut.slice(8))-parseInt(a.checkIn.slice(8))) 
      })
      setTotalPrice(test);
    }
		setRooms(sortedEmployees);	
	}

    function renderEmployees() {
            
			const sortedEmployees =  rooms.map((room,i) =>{
                //console.log(room.price)
				return <Room key={i} room ={room}
				getRooms={getRooms}
				/>
			})
			return sortedEmployees;
	}
   
   return <>
    {user === null&&(
			<h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
	  )}
      {
          user!==null && (
              <>
              <div>
                        <label className="lblColor" htmlFor ='typeofRoom'>Ngày thuê</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={dateIn}
                        onChange={(e) => setDateIn(e.target.value)}
                        className='roomInput'
                        
                        />
                </div> 
                <div>
                        <label className="lblColor" htmlFor ='typeofRoom'>Ngày trả phòng</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={dateOut}
                        onChange={(e) => setDateOut(e.target.value)}
                        className='roomInput'
                        
                        />
                        <label className="lblColor" onClick={getRooms} htmlFor ='typeofRoom'>Ngày trả phòng</label>
                </div>
              {rooms.length > 0 ? <>
                {renderEmployees()}
                Tổng doanh thu :{totalPrice}
              </> : (
					<h3>Bạn chưa thuê Phòng. Hãy đặt phòng yêu thích của bạn.</h3>
				)}</>
                
          )
      }
    </>;
};

export default RoomList;