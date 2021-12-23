import React from 'react';

import './Employee.css';
import Axios from 'axios';

function Employee({employee,getEmployees,editEmployee}) {

    async function deleteEmployee(){
        if(window.confirm('Bạn có chắc muốn xóa dữ liệu Nhân viên này?')){
            await Axios.delete(`http://localhost:5000/staff/${employee._id}`);
            getEmployees();
        } 
    }

    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.role}</td>
            <td>{employee.nameOfRoom}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>
                <a onClick={() => editEmployee(employee)} href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a onClick={deleteEmployee} href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>
        
    );
}

export default Employee;
