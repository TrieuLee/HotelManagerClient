import React from 'react';

import Axios from 'axios';

function Service({service,getServices,editService}) {

    async function deleteService(){
        if(window.confirm('Bạn có chắc muốn xóa dữ liệu Dịch vụ này?')){
            await Axios.delete(`http://localhost:5000/service/${service._id}`);
            getServices();
        } 
    }

    return (
        <tr>
            <td>{service.name}</td>
            <td>{service.price}</td>
            
            <td>
                <a onClick={() => editService(service)} href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a onClick={deleteService} href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>
        
    );
}

export default Service;