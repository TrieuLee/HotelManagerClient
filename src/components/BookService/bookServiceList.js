import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './bookService';
 
 
function RoomList({payBill}) {
    const [rooms, setRooms] = useState([]);
    const {user} = useContext(UserContext)

    useEffect(() =>{
		if(!user) setRooms([]);
		else getRooms();
	},[user]);

    async function getRooms() {
		const roomData = await Axios.get("http://localhost:5000/bookService/manager");
		let sortedEmployees  = [...roomData.data];
        console.log(sortedEmployees);
		sortedEmployees = sortedEmployees.filter(a => a.state===payBill);
        console.log(sortedEmployees);
		setRooms(sortedEmployees);	
	}

    function renderEmployees() {
		
			const sortedEmployees =  rooms.map((room,i) =>{
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
              {rooms.length > 0 ? renderEmployees() : (
					<h3>Bạn chưa thuê phòng. Hãy đặt phòng yêu thích của bạn.</h3>
				)}</>
          )
      }
    </>;
};

export default RoomList;