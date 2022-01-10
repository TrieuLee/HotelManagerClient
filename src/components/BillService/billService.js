import React from 'react';

function Room({room}) {

    return (
        <>			
			<tr>
				<td>{room.nameCus}</td>
				<td>{room.phoneNumber}</td>
				<td>{room.IDCard}</td>
				<td>{room.name}</td>
				<td>{room.createdAt.slice(0,10)}</td>
				<td>{room.quantity}</td>
				<td>{room.price} /1 {room.unit}</td>
				<td>{room.price*room.quantity}</td>
				<td>{room.state?'Thanh toán':'Chưa thanh toán'}</td>
			</tr>		
		</>
        
    );
}

export default Room;