import React from 'react';

function Room({room}) {

    return (
        <>			
			<tr>
				<td>{room.name}</td>
				<td>{room.phoneNumber}</td>
				<td>{room.IDCard}</td>
				<td>{room.number}</td>
				<td>{room.typeofRoom}</td>
				<td>{room.price}</td>
				<td>{room.checkIn}</td>
				<td>{room.checkOut}</td>  
				<td>{room.price*(parseInt(room.checkOut.slice(8))-parseInt(room.checkIn.slice(8)))}</td>
				<td>{room.stateGiveMoney?'Thanh toán':'Chưa thanh toán'}</td>
			</tr>		
		</>
        
    );
}

export default Room;