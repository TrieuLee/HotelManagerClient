import React from 'react';
import {useHistory } from 'react-router-dom';
import Axios from 'axios';

function Room({room,getRooms,editRoom}) {

    const history = useHistory();
    async function deleteEmployee(){
        if(window.confirm('Bạn có chắc muốn xóa dữ liệu phòng này?')){
            await Axios.delete(`http://localhost:5000/room/${room._id}`);
            getRooms();
        } 
    }

    function getEmployee() {
        localStorage.setItem('room',JSON.stringify(room));
        if(localStorage.getItem('guest')===null) history.push("/customer");
        else history.push("/bookingRoom")
    }

    return (
        <tr>
            <td>{room.floor}</td>
            <td>{room.number}</td>
            <td>{room.price}</td>
            <td>{room.typeofRoom}</td>
            <td>{room.state?"Có Khách thuê":"Phòng trống"}</td>
            <td>{room.note}</td>
            <td>
                <a onClick={() => editRoom(room)} href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Chỉnh sửa">&#xE254;</i></a>
                <a onClick={deleteEmployee} href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i></a>
                <a onClick={getEmployee} href="#chooseEmployeeModal" className="delete" data-toggle="modal"><i style={{color:"green"}}className="material-icons" data-toggle="tooltip" title="Chọn">&#xe147;</i></a>
            </td>
        </tr>
        
    );
}

export default Room;