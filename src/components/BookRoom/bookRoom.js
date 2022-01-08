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
		
				<tr>
					<td>{room.number}</td>
					<td>{room.typeofRoom}</td>
					<td>{room.price}</td>
					<td>{room.checkIn}</td>
					<td>{room.checkOut}</td>  
					<td>{room.price*(parseInt(room.checkOut.slice(8))-parseInt(room.checkIn.slice(8)))}</td>
					<td>{room.stateGiveMoney?'Đã thanh toán':'Chưa thanh toán'}</td>
					<td>{room.name}</td>
					<td>{room.phoneNumber}</td>
					<td>
					
						<Button
							
							color="danger"
							outline
							type="button"
							onClick={saveRoom}  >
							Trả phòng	
						</Button>	
				
					</td>
				</tr>
		
			
				
		
			
		</>
        
    );
}

export default Room;