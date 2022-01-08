import React, {useState} from 'react';
import {Button } from 'reactstrap';
import {useHistory } from 'react-router-dom';
import Axios from 'axios';
import ErrorMessage from '../misc/ErrorMessage';
import './RevenueRoom.css'	;

function Room({room}) {

	const history = useHistory();
	const [errorMessage,setErrorMessage] = useState(null);

	async function saveRoom(e) {

        try {
            await Axios.put(`http://localhost:5000/bookRoom/payBill/${room._id}`); 

            if(window.confirm('Bạn đã thanh toán thành công. Xin chào và hẹn gặp lại')){       
                history.push("/");
            } 
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }
	}

    return (
        <>
			
			{errorMessage && (
				<ErrorMessage
				message={errorMessage}/>
			)}
			<table className="table table-striped table1">
			
				<tr className='trRom' >
					<th className='thRom'>Số phòng </th>
					<th className='thRom'>Tầng</th>
					<th className='thRom'>Giá</th>
					<th className='thRom'>Loại phòng</th>
					<th className='thRom'>Ngày thuê</th>
					<th className='thRom'>Ngày trả phòng</th>
					<th className='thRom'>Tổng tiền</th>
					<th className='thRom'>Tình trạng</th>
					<th className='thRom'>Tên khách hàng</th>
					<th className='thRom'>Số điện thoại</th>
					<th className='thRom'>Email</th>
					<th className='thRom'>Địa chỉ</th>
					<th className='thRom'>CMND/CCCD</th>
				</tr>
				<tbody className='tbRom' >
					<td className='tdRom'>{room.number}</td>
					<td className='tdRom'>{room.floor}</td>
					<td className='tdRom'>{room.price}</td>
					<td className='tdRom'>{room.typeofRoom}</td>
					<td className='tdRom'>{room.checkIn}</td>
					<td className='tdRom'>{room.checkOut}</td>
					<td className='tdRom'>{room.price*(parseInt(room.checkOut.slice(8))-parseInt(room.checkIn.slice(8)))}</td>
					<td className='tdRom'>{room.stateGiveMoney?'Đã thanh toán':'Chưa thanh toán'}</td>
					<td className='tdRom'>{room.name}</td>
					<td className='tdRom'>{room.phoneNumber}</td>
					<td className='tdRom'>{room.email}</td>
					<td className='tdRom'>{room.IDCard}</td>
					<td className='tdRom'>{Date.parse(room.createdAt)}</td>
				</tbody>
                
			</table>

		</>
        
    );
}

export default Room;