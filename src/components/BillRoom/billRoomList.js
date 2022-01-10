import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './billRoom';
import './billRoom.css';
 
 
function RoomList({payBill}) {
    const [rooms, setRooms] = useState([]);
	const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut]= useState(""); 
    const [totalPrice, setTotalPrice]= useState(0);
    const {user} = useContext(UserContext);

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
					 <h2>Doanh Thu Phòng</h2>
				 </div>
				 </div>
				 </div>
   {user !== null &&(	   
	  <>
	  	<div className='lblDate' style={{marginTop:'20px'}}>
			<div className='lblcheckIn'>
					<label className="lblColor"  style={{marginRight:'10px'}} htmlFor ='typeofRoom'>Ngày thuê</label>
					<input id = 'typeofRoom' 
					type = 'date' 
					value={dateIn}
					onChange={(e) => setDateIn(e.target.value)}
					className='roomInput1'
					
					/>
			</div> 
			<div className='lblcheckOut'>
					<label className="lblColor" style={{marginRight:'10px'}} htmlFor ='typeofRoom'>Ngày trả phòng</label>
					<input id = 'typeofRoom' 
					type = 'date' 
					value={dateOut}
					onChange={(e) => setDateOut(e.target.value)}
					className='roomInput1'
					
					/>
					<label className="lblColor"  style={{marginLeft:'50px',background:'rgb(205, 166, 85)', padding:'5px', cursor:'pointer'}}onClick={getRooms} htmlFor ='typeofRoom'>Thống kê</label>
			</div>
     </div>
		<table className="table table-striped table-hover">
			<thead>
				
				<tr>
					<th>Tên khách hàng</th>
					<th>Số điện thoại</th>
					<th>CMND/CCCD</th>
					<th>Số phòng </th>
					<th>Loại phòng</th>
					<th>Đơn Giá</th>
					<th>Ngày thuê</th>
					<th>Ngày trả phòng</th>
					<th>Tổng tiền</th>	
					<th>Tình trạng</th>						
				</tr>
			</thead>
			<tbody>
					{rooms.length > 0 ? <>
						{renderEmployees()}
						Tổng doanh thu :{totalPrice}
					</>
					: (
						<h3>Không có dữ liệu</h3>
					)
				}
				</tbody>
		</table>
	  </>
   )}
   {user === null&&(
		 <h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
   )}
  
 </>
   ) 
};

export default RoomList;