import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './bookRoom';
 
 
function RoomList({payBill}) {
    const [rooms, setRooms] = useState([]);
    const {user,userDecentralize} = useContext(UserContext)

    useEffect(() =>{
		if(!user) setRooms([]);
		else getRooms();
	},[user]);

    async function getRooms() {
		const roomData = await Axios.get("http://localhost:5000/bookRoom/manager");
		console.log(roomData);
		let sortedEmployees  = [...roomData.data];
		sortedEmployees = sortedEmployees.filter(a => a.stateGiveMoney===payBill);
		console.log(roomData);
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
   
   return (
	<>
	<div className="table-title">
			 <div className="row">
				 <div className="col-sm-6">
					 <h2>Trả phòng</h2>
				 </div>
				 </div>
				 </div>
   {user !== null && userDecentralize ===1 &&(
	   <table className="table table-striped table-hover">
	   <thead>
		   <tr>
				<th>Số phòng </th>
				<th>Loại phòng</th>
				<th>Giá</th>
				<th>Ngày thuê</th>
				<th>Ngày trả phòng</th>
				<th>Tổng tiền</th>	
				<th>Tình trạng</th>
				<th>Tên khách hàng</th>
				<th>Số điện thoại</th>
				<th>ChứcNăng</th>
				
		   </tr>
	   </thead>
	   <tbody>
			{rooms.length > 0 ? renderEmployees()
			: (
				<h3>Không có dữ liệu</h3>
			)
		}
		</tbody>
			</table>
   )}
   {user === null&&(
		 <h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
   )}
  
 </>
   ) 
};

export default RoomList;