import React from 'react';

import './Employee.css'

const Employee = (props) => {
    return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.phoneNumber}</td>
            <td>{props.employee.salary}</td>
            <td>
                <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>
        
    );
}

export default Employee;
