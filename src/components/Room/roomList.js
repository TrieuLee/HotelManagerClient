import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import RoomEdit from './roomEdit';
import RoomPut from './roomPut';
import UserContext from '../../context/UserContext';
import Room from './room';
import './room.css';

function RoomList() {

	const [roomCreateOpen,setRoomCreateOpen] = useState(false);
	const [roomEditOpen,setRoomEditOpen] = useState(false);
	const [editRoomData,setEditRoomData] = useState(null);
    const [rooms, setRooms] = useState([]);
    const {user} = useContext(UserContext)
   

    useEffect(() =>{
		if(!user) setRooms([]);
		else getRooms();
	},[user]);

    async function getRooms() {
		const roomData = await Axios.get("http://localhost:5000/room/");
		setRooms(roomData.data);	
	}

    function renderEmployees() {
		let sortedEmployees = [...rooms];
		sortedEmployees = sortedEmployees.sort((a,b) =>{
			return a.floor-b.floor;
		})
		return sortedEmployees.map((room,i) =>{
			return <Room key={i} room ={room}
            getRooms={getRooms}
			editRoom={editRoom}
            />
		})
	}

	function editRoom(employeeData) {
		setEditRoomData(employeeData);
		setRoomEditOpen(true);
	}

	const customStyles = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
		  transform: 'translate(-50%, -50%)',
		  padding:'0',
		  border:'0',
		},
	  };
   
   return <>
            <div className="table-title room-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Quản lý phòng</h2>
					</div>
					<div className="col-sm-6">
						{!roomCreateOpen && user && (
							<a href="#addEmployeeModal"
							className="btn btn-success"
							data-toggle="modal"
							onClick={() => setRoomCreateOpen(true)}
							>
							<i className="material-icons">&#xE147;</i>
							<span>Tạo Phòng</span>
						</a>
						)}
						
						<Modal
						isOpen={roomCreateOpen}
						style={customStyles}
						onRequestClose={!roomCreateOpen}
						contentLabel="Example Modal">
							<RoomEdit 
							setRoomCreateOpen = {setRoomCreateOpen}
							getRooms={getRooms}					
							/>
						</Modal>

						<Modal
						isOpen={roomEditOpen}
						style={customStyles}
						onRequestClose={!roomEditOpen}
						contentLabel="Example Modal">
							<RoomPut 
							setRoomEditOpen = {setRoomEditOpen}
							getRooms={getRooms}	
							editRoomData={editRoomData}					
							/>
						</Modal>	
			
					</div>
				</div>
		    </div>

      {user === null&&(
			<h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
	  )}
      {
          user!==null && (
            <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Tầng</th>
                    <th>Số phòng</th>
                    <th>Giá Phòng</th>
                    <th>Loại Phòng</th>
                    <th>Tình trạng phòng</th>
                    <th>Ghi chú</th>
                    <th>ThaoTác</th>
                </tr>
            </thead>
            <tbody>
                {rooms.length > 0 ? renderEmployees()
                : (
                    <h3>Không có dữ liệu</h3>
                )
            }
            </tbody>
        </table>
          )
      }
    </>;
};

export default RoomList;