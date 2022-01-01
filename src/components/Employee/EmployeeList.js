import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import EmployeePost from './EmployeePost';
import EmployeePut from './EmployeePut';
import Employee from './Employee';
import './employeePost.css';
import UserContext from '../../context/UserContext';

const EmployeeList = () => {
   
	const [employees, setEmployees] = useState([]);
	const [employeeCreateOpen,setEmployeeCreateOpen] = useState(false);
	const [employeeEditorOpen,setEmployeeEditorOpen] = useState(false);
	const [editEmployeeData,setEditEmployeeData] = useState(null);

	const {userPhone,userEmail,userRole,userNameOfRoom,userSalary,user,userDecentralize,} = useContext(UserContext)

	useEffect(() =>{
		if(!user) setEmployees([]);
		else getEmployees();
	},[user]);

	async function getEmployees() {
		const employeeRes = await Axios.get("http://localhost:5000/staff/");
		setEmployees(employeeRes.data);
		
	}

	function renderEmployees() {
		let sortedEmployees = [...employees];
		sortedEmployees=sortedEmployees.sort((a,b) =>{
			return a.name-b.name > 0
		})
		return sortedEmployees.map((employee,i) =>{
			return <Employee key={i} employee ={employee}
			 getEmployees={getEmployees}
			 editEmployee={editEmployee}/>
		})
	}

	function editEmployee(employeeData) {
		setEditEmployeeData(employeeData);
		setEmployeeEditorOpen(true);
	}

	const customStyles = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
		  transform: 'translate(-50%, -50%)',
		  padding: '0',
		  border: '0',
		},
	  };

    return (
        <>

        <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Quản lý nhân viên</h2>
					</div>
					<div className="col-sm-6">
						{!employeeCreateOpen && userDecentralize===1&&(
							<a href="#addEmployeeModal"
								className="btn btn-success"
								data-toggle="modal"
								onClick={() => setEmployeeCreateOpen(true)}
								>
								<i className="material-icons">&#xE147;</i>
								<span>Thêm Nhân viên</span>
							</a>
						)}
						<Modal
						isOpen={employeeCreateOpen && user}
						style={customStyles}
						onRequestClose={!employeeCreateOpen}
						contentLabel="Example Modal">
							<EmployeePost 
							setEmployeeCreateOpen = {setEmployeeCreateOpen}
							getEmployees={getEmployees}						
							/>
						</Modal>

						<Modal
						isOpen={employeeEditorOpen && user}
						style={customStyles}
						onRequestClose={!employeeEditorOpen}
						contentLabel="Example Modal">
							<EmployeePut 
							setEmployeeEditorOpen = {setEmployeeEditorOpen}
							getEmployees={getEmployees}
							editEmployeeData={editEmployeeData}				
							/>
						</Modal>	
			
					</div>
				</div>
		</div>
		
		{user !== null && userDecentralize===1 &&(
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Họ và Tên</th>
						<th>Chức vụ</th>
						<th>Phòng Ban</th>
						<th>Email</th>
						<th>SĐT</th>
						<th>ThaoTác</th>
					</tr>
				</thead>
				<tbody>
					{employees.length > 0 ? renderEmployees()
					: (
						<h3>Không có dữ liệu</h3>
					)
				}
				</tbody>
			</table>
		)}

		{user !== null && userDecentralize===2 &&(
			<table>
				<tr>
					<th>Tên Nhân Viên</th>
					<td>{user}</td>
				</tr>
				<tr>
					<th>Chức Vụ</th>
					<td>{userRole}</td>
				</tr>
				<tr>
					<th>Phòng Ban</th>
					<td>{userNameOfRoom}</td>
				</tr>
				<tr>
					<th>Email</th>
					<td>{userEmail}</td>
				</tr>
				<tr>
					<th>SĐT</th>
					<td>{userPhone}</td>
				</tr>
				<tr>
					<th>Lương</th>
					<td>{userSalary}</td>
				</tr>
			</table>
		)}

		{user === null&&(
			<h2>Hãy đăng nhập để thao tác trên hệ thống</h2>
		)}
        </>
    );
}

export default EmployeeList;
