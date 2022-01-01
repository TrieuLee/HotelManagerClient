import React, {useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

import ServiceEdit from './serviceEdit';
import ServicePut from './servicePut';
import UserContext from '../../context/UserContext';
import Service from './service';
import '../Employee/Employee.css';

function RoomList() {

	const [serviceCreateOpen,setServiceCreateOpen] = useState(false);
	const [serviceEditOpen,setServiceEditOpen] = useState(false);
	const [editServiceData,setEditServiceData] = useState(null);
    const [services, setServices] = useState([]);
    const {user} = useContext(UserContext)
   

    useEffect(() =>{
		if(!user) setServices([]);
		else getServices();
	},[user]);

    async function getServices() {
		const serviceData = await Axios.get("http://localhost:5000/service/");
		setServices(serviceData.data);	
	}

    function renderServices() {
		let sortedEmployees = [...services];
		return sortedEmployees.map((service,i) =>{
			return <Service key={i} service ={service}
            getServices={getServices}
			editService={editService}
            />
		})
	}

	function editService(employeeData) {
		setEditServiceData(employeeData);
		setServiceEditOpen(true);
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
						<h2>Quản lý dịch vụ</h2>
					</div>
					<div className="col-sm-6">
						<a href="#addEmployeeModal"
							className="btn btn-success"
							data-toggle="modal"
							onClick={() => setServiceCreateOpen(true)}
							>
							<i className="material-icons">&#xE147;</i>
							<span>Thêm dịch vụ</span>
						</a>
						<Modal
						isOpen={serviceCreateOpen}
						style={customStyles}
						onRequestClose={!serviceCreateOpen}
						contentLabel="Example Modal">
							<ServiceEdit 
							setServiceCreateOpen = {setServiceCreateOpen}
							getServices={getServices}					
							/>
						</Modal>

						<Modal
						isOpen={serviceEditOpen}
						style={customStyles}
						onRequestClose={!serviceEditOpen}
						contentLabel="Example Modal">
							<ServicePut 
							setServiceEditOpen = {setServiceEditOpen}
							getServices={getServices}	
							editServiceData={editServiceData}					
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
                    <th>Tên Dịch Vụ</th>
                    <th>Giá </th>
                    <th>ThaoTác</th>
                </tr>
            </thead>
            <tbody>
                {services.length > 0 ? renderServices()
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