import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../../context/UserContext';
import Room from './checkoutService';
import './checkoutService';
import ErrorMessage from '../misc/ErrorMessage';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [guestData,setGuestData] = useState(JSON.parse(localStorage.getItem('guest')));
    const {user} = useContext(UserContext);
    const [errorMessage,setErrorMessage] = useState(null);

    useEffect(() =>{
        if(guestData===null) setErrorMessage('Hãy chọn khách hàng muốn thanh toán phòng');
		if(!user) setRooms([]);
		else getRooms();
	},[user]);

    async function getRooms() {
        if(guestData!==null){
            const roomData = await Axios.get(`http://localhost:5000/bookService/${guestData._id}`);
            let sortedEmployees  = [...roomData.data];
           
            sortedEmployees = sortedEmployees.filter(a => a.state===false);
            setRooms(sortedEmployees);
            
        }   
	}

    function renderEmployees() {
			const sortedEmployees =  rooms.map((room,i) =>{
				return <Room key={i} room ={room}
				
				/>
			})
			return sortedEmployees;
	}
   
   return <>
            {errorMessage ? (
                    <ErrorMessage
                    message={errorMessage}/>
                ): (
                    <>
                        {user === null&&(
                            <h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
                        )}
                        {
                            user!==null && (
                                <>
                                    {rooms.length > 0 ? renderEmployees() : (
                                            <h3>Bạn chưa đặt dich vụ. Hãy đặt dịch vụ của chúng tôi để được trải nghiệm tốt nhất.</h3>
                                    )}
                                </>
                            )
                        }
                    </>
                    
                )}
            
    </>;
};

export default RoomList;