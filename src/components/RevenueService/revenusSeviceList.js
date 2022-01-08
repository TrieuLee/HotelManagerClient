import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './revenueService';

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
		const roomData = await Axios.get("http://localhost:5000/bookService/manager");
		let sortedEmployees  = [...roomData.data];
		sortedEmployees = sortedEmployees.filter(a => a.state===payBill);
         
    if(sortedEmployees.length>0){
      let test= 0;
     sortedEmployees.forEach((a)=> {
         test +=a.price*a.quantity
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
               <div className="table-title" >
				<div className="row">
					<div className="col-sm-6">
						<h2>Doanh thu phòng</h2>
					</div>
			</div>	
			</div>
              <div className='lblDate' style={{marginTop:'20px'}}>
              <div className='lblcheckIn'>
                        <label className="lblColor"  style={{marginRight:'10px'}} htmlFor ='typeofRoom'>Ngày thuê</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={dateIn}
                        onChange={(e) => setDateIn(e.target.value)}
                        className='roomInput'
                        
                        />
                </div> 
                <div className='lblcheckOut'>
                        <label className="lblColor" style={{marginRight:'10px'}} htmlFor ='typeofRoom'>Ngày trả phòng</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={dateOut}
                        onChange={(e) => setDateOut(e.target.value)}
                        className='roomInput'
                        
                        />
                        <label className="lblColor"  style={{marginLeft:'50px',background:'rgb(205, 166, 85)', padding:'5px', cursor:'pointer'}}onClick={getRooms} htmlFor ='typeofRoom'>Thống kê</label>
                </div>
              </div>
              
              {rooms.length > 0 ? <>
                {renderEmployees()}
                Tổng doanh thu :{totalPrice}
              </> : (
					<h3  style={{marginTop:'10px'}}>Vui lòng nhập dữ liệu để được thống kê.</h3>
				)}</>
                
          )
      }
    </>;
};

export default RoomList;