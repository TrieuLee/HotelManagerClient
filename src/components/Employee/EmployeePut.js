import React, {useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios';
import ErrorMessage from '../misc/ErrorMessage';
import './employeePost.css'

function EmployeePost({getEmployees,setEmployeeEditorOpen,editEmployeeData}) {

    
	const [createName,setCreateName] = useState("");
	const [createSalary,setCreateSalary] = useState(0);
	const [createPhoneNumber,setCreatePhoneNumber] = useState("");
	const [createEmail,setCreateEmail] = useState("");
	const [createRole,setCreateRole] = useState("");
	const [createNameOfRoom,setCreateNameOfRoom] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);

   useEffect(() =>{
      if(editEmployeeData){
         setCreateName(editEmployeeData.name ? editEmployeeData.name: "");
         setCreatePhoneNumber(editEmployeeData.phoneNumber ? editEmployeeData.phoneNumber: "");
         setCreateEmail(editEmployeeData.email ? editEmployeeData.email: "");
         setCreateRole(editEmployeeData.role ? editEmployeeData.role: "");
         setCreateNameOfRoom(editEmployeeData.nameOfRoom ? editEmployeeData.nameOfRoom: "");
         setCreateSalary(editEmployeeData.salary ? editEmployeeData.salary: "");
      }
   },[editEmployeeData])

    async function saveEmployees(e) {
		e.preventDefault();

		const employeeData = {
			name: createName ? createName: undefined,
			phoneNumber: createPhoneNumber ? createPhoneNumber: undefined,
			email: createEmail ? createEmail: undefined,
			role: createRole ? createRole: undefined,
			nameOfRoom: createNameOfRoom ? createNameOfRoom : undefined,
			salary: createSalary ? createSalary: undefined,
		}

        try {
            await Axios.put(`http://localhost:5000/staff/${editEmployeeData._id}`,employeeData);
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }

		getEmployees();
		closeEmployee()
	}

	function closeEmployee(){
		 setCreateName("");
		 setCreateSalary(0);
		 setCreatePhoneNumber("");
		 setCreateEmail("");
		 setCreateRole("");
		 setCreateNameOfRoom("");
         setEmployeeEditorOpen(false);
	}

   return <div onClick={()=>setErrorMessage(null)} className= "employee-post">
      <form onSubmit={saveEmployees}>
        <Table borderless>
            {errorMessage && (
                <ErrorMessage
                message={errorMessage}
                
                />
            )}
            <tbody>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-name'>Họ và Tên</label>         
                    </th>
                    <td>
                        <input className='formInput' id = 'editor-name' 
                        type =  'text'
                        value={createName}
                        onChange={(e) => setCreateName(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-phoneNumber'>SĐT</label>
                    </th>
                    <td>
                        <input className='formInput'id = 'editor-phoneNumber' 
                        type = 'text' 
                        value={createPhoneNumber}
                        onChange={(e) => setCreatePhoneNumber(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-role'>Vai trò</label>
                    </th>
                    <td>
                        <input className='formInput' id = 'editor-role' 
                        type = 'text' 
                        value={createRole}
                        onChange={(e) => setCreateRole(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-nameOfRoom'>Phòng Ban</label>                   
                    </th>
                    <td>
                        <input className='formInput'id = 'editor-nameOfRoom' 
                        type = 'text' 
                        value={createNameOfRoom}
                        onChange={(e) => setCreateNameOfRoom(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-salary'>Lương</label>
                    </th>
                    <td>
                        <input className='formInput' id = 'editor-salary' 
                        type = 'number' 
                        value={createSalary}
                        onChange={(e) => setCreateSalary(e.target.value)}/>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Button
            type="submit"
            color="success"
            outline>
            Cập Nhập
         </Button>
         <Button
            color="danger"
            outline
            type="button" onClick={closeEmployee}>
            Thoát
         </Button>
        </form>
   </div>;
};

export default EmployeePost;