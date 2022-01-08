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
			<table>
				<tr>
					<th>Tên dịch vụ </th>
					<td>{room.name}</td>
				</tr>
				<tr>
					<th>Giá dịch vụ</th>
					<td>{room.price}</td>
				</tr>
				<tr>
					<th>Số lượng:</th>
					<td>{room.quantity}</td>
				</tr>
				<tr>
					<th>Tổng tiền</th>
					<td>{room.price*room.quantity}</td>
				</tr>
				<tr>
					<th>Tình trạng thanh toán</th>
					<td>{room.state?'Đã thanh toán':'Chưa thanh toán'}</td>
				</tr>
				<tr>
					<th>Tên khách hàng</th>
					<td>{room.name}</td>
				</tr>
				<tr>
					<th>Số điện thoại</th>
					<td>{room.phoneNumber}</td>
				</tr>
				<tr>
					<th>Email</th>
					<td>{room.email}</td>
				</tr>
				<tr>
					<th>Địa chỉ</th>
					<td>{room.email}</td>
				</tr>
				<tr>
					<th>CMND/CCCD</th>
					<td>{room.IDCard}</td>
				</tr>
			</table>
			<Button
				color="danger"
				outline
				type="button"
				onClick={saveRoom}  >
				Thanh Toán
			</Button>
		</>
        
    );
}

export default Room;