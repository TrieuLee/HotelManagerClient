import React, {useState} from 'react';
import {Button } from 'reactstrap';
import {useHistory } from 'react-router-dom';
import Axios from 'axios';
import ErrorMessage from '../misc/ErrorMessage';

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
					<th className='thRom'>Tên dịch vụ</th>
					<th className='thRom'>Số lượng</th>
					<th className='thRom'>Đơn giá</th>
					<th className='thRom'>Tổng tiền</th>
					<th className='thRom'>Tình trạng</th>
					<th className='thRom'>Tên khách hàng</th>
					<th className='thRom'>Số điện thoại</th>
					<th className='thRom'>Email</th>
					<th className='thRom'>Địa chỉ</th>
				</tr>
				<tbody className='tbRom' >
					<td className='tdRom'>{room.name}</td>
					<td className='tdRom'>{room.quantity}</td>
					<td className='tdRom'>{room.price}</td>
					<td className='tdRom'>{room.quantity*room.price}</td>
					<td className='tdRom'>{room.state?'Đã thanh toán':'Chưa thanh toán'}</td>
					<td className='tdRom'>{room.nameCus}</td>
					<td className='tdRom'>{room.phoneNumber}</td>
					<td className='tdRom'>{room.email}</td>
					<td className='tdRom'>{room.address}</td>
				</tbody>
                
			</table>

		</>
        
    );
}

export default Room;