import React, {useEffect, useState } from 'react';
import Axios from 'axios';

import Employee from './Employee';

const EmployeeList = () => {
   
	const [employees, setEmployees] = useState([]);

	useEffect(() =>{
		getEmployees();
	},[]);

	async function getEmployees() {
		const employeeRes = await Axios.get("http://localhost:5000/staff/");
		setEmployees(employeeRes.data);

	}

	function renderEmployees() {
		return employees.map((employee,i) =>{
			return <Employee key={i} employee ={employee} />
		})
	}

    return (
        <>

        <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Manage <b>Employees</b></h2>
					</div>
					<div className="col-sm-6">
						<a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>					
					</div>
				</div>
		</div>
                
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{renderEmployees()}
                </tbody>
                </table>
        </>
    );
}

export default EmployeeList;
