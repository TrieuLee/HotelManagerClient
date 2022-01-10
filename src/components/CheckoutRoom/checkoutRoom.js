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
			<div className="container mt-5 mb-5">	
				
			<div className='tblBill'>
			{errorMessage && (
				<ErrorMessage
				message={errorMessage}/>
			)}
			<div>
            <h2 className="bill-title">Hóa đơn của khách hàng</h2>
            </div>
			<table>
				<tr>
					<th>Số phòng: </th>
					<td>{room.number}</td>
				</tr>
				<tr>
					<th>Tầng:</th>
					<td>{room.floor}</td>
				</tr>
				<tr>
					<th>Giá:</th>
					<td>{room.price}</td>
				</tr>
				<tr>
					<th>Loại phòng:</th>
					<td>{room.typeofRoom}</td>
				</tr>
				<tr>
					<th>Ngày thuê:</th>
					<td>{room.checkIn}</td>
				</tr>
				<tr>
					<th>Ngày trả phòng:</th>
					<td>{room.checkOut}</td>
				</tr>
				<tr>
					<th>Tổng tiền:</th>
					<td>{room.price*(parseInt(room.checkOut.slice(8))-parseInt(room.checkIn.slice(8)))}</td>
				</tr>
				<tr>
					<th>Tình trạng thanh toán:</th>
					<td>{room.stateGiveMoney?'Đã thanh toán':'Chưa thanh toán'}</td>
				</tr>
			</table>
			<div className='btn-confirm1'>
			<Button 
				width='2000'
				color="danger"
				outline
				type="button"
				onClick={saveRoom}  >
				Thanh toán
			</Button>		
			</div>
		
			</div>
				</div>						
		</>   
    );
}

export default Room;