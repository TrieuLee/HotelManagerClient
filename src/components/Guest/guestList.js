import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import GuestPost from './guestPost';
import GuestPut from './guestPut';
import Guest from './guest';
import '../Employee/Employee.css';
import UserContext from '../../context/UserContext';

const GuestList = () => {
   
	const [guests, setGuests] = useState([]);
	const [guestCreateOpen,setGuestCreateOpen] = useState(false);
	const [guestEditorOpen,setGuestEditorOpen] = useState(false);
	const [editGuestData,setEditGuestData] = useState(null);

	const {user} = useContext(UserContext)

	useEffect(() =>{
		if(!user) setGuests([]);
		else getGuests();
	},[user]);

	async function getGuests() {
		const guestRes = await Axios.get("http://localhost:5000/customer/");
		setGuests(guestRes.data);
	}

	function renderGuests() {

		let guestData = [...guests];
		return guestData.map((guest,i) =>{
			return <Guest key={i} guest ={guest}
            getGuests={getGuests}
			editGuest={editGuest}/>
		})
	}

	function editGuest(guestData) {
		setEditGuestData(guestData);
		setGuestEditorOpen(true);
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

    return (
        <>

        <div className="table-title room-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Danh sách khách hàng</h2>
					</div>
					<div className="col-sm-6">
						{!guestCreateOpen && user && (
							<a href="#addEmployeeModal"
								className="btn btn-success"
								data-toggle="modal"
								onClick={() => setGuestCreateOpen(true)}
								>
								<i className="material-icons">&#xE147;</i>
								<span>Thêm khách hàng</span>
							</a>
						)}
						<Modal
						isOpen={guestCreateOpen && user}
						style={customStyles}
						onRequestClose={!guestCreateOpen}
						contentLabel="Example Modal">
							<GuestPost 
							setGuestCreateOpen = {setGuestCreateOpen}
							getGuests={getGuests}						
							/>
						</Modal>

						<Modal
						isOpen={guestEditorOpen && user}
						style={customStyles}
						onRequestClose={!guestEditorOpen}
						contentLabel="Example Modal">
							<GuestPut 
							setGuestEditorOpen = {setGuestEditorOpen}
							getGuests={getGuests}
							editGuestData={editGuestData}				
							/>
						</Modal>	
			
					</div>
				</div>
		</div>
		
		{user !== null &&(
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Họ và Tên</th>
						<th>SĐT</th>
						<th>Email</th>
						<th>Địa Chỉ</th>
						<th>CMND/CCCD</th>
						<th>ThaoTác</th>
					</tr>
				</thead>
				<tbody>
					{guests.length > 0 ? renderGuests()
					: (
						<h3>Không có dữ liệu</h3>
					)
				}
				</tbody>
			</table>
		)}
		{user === null&&(
			<h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
		)}
        </>
    );
}

export default GuestList;
