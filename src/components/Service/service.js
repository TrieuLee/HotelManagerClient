import React from 'react';
import {useHistory } from 'react-router-dom';
import Axios from 'axios';

function Service({service,getServices,editService}) {
    const history = useHistory();
    async function deleteService(){
        if(window.confirm('Bạn có chắc muốn xóa dữ liệu Dịch vụ này?')){
            await Axios.delete(`http://localhost:5000/service/${service._id}`);
            getServices();
        } 
    }
    function getEmployee() {
        localStorage.setItem('service',JSON.stringify(service));
        if(localStorage.getItem('guest')===null) history.push("/customer");
        else history.push("/bookingService")
    }
    return (
        <tr>
            <td>{service.name}</td>
            <td>{service.price} /1{service.unit}</td>
            
            <td>
                <a onClick={() => editService(service)} href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Chỉnh sửa">&#xE254;</i></a>
                <a onClick={deleteService} href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i></a>
                <a onClick={getEmployee} href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i style={{color:"green"}} className="material-icons" data-toggle="tooltip" title="Chọn">&#xe147;</i></a>
            </td>
        </tr>
        
    );
}

export default Service;