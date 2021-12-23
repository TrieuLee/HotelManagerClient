import React, {useState } from 'react';
import Axios from 'axios';
import { Table,Button } from 'reactstrap';
import ErrorMessage from '../misc/ErrorMessage';

function EmployeePost({getEmployees,setEmployeeCreateOpen}) {

    
	const [createName,setCreateName] = useState("");
	const [createSalary,setCreateSalary] = useState(0);
	const [createPhoneNumber,setCreatePhoneNumber] = useState("");
	const [createEmail,setCreateEmail] = useState("");
	const [createRole,setCreateRole] = useState("");
	const [createNameOfRoom,setCreateNameOfRoom] = useState("");
	const [createPassword,setCreatePassword] = useState("");
	const [createPasswordVerify,setCreatePasswordVerify] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);

    async function saveEmployees(e) {
		e.preventDefault();

		const employeeData = {
			name: createName ? createName: undefined,
			phoneNumber: createPhoneNumber ? createPhoneNumber: undefined,
			email: createEmail ? createEmail: undefined,
			role: createRole ? createRole: undefined,
			nameOfRoom: createNameOfRoom ? createNameOfRoom : undefined,
			salary: createSalary ? createSalary: undefined,
			password: createPassword ? createPassword: undefined,
			passwordVerify: createPasswordVerify ? createPasswordVerify: undefined,
		}

        try {
            await Axios.post("http://localhost:5000/staff",employeeData);
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
		 setCreatePassword("");
		 setCreatePasswordVerify("");
       setEmployeeCreateOpen(false);
	}

   return <div className= "employee-post">
       <form onSubmit={saveEmployees}>
        <Table borderless>
            {errorMessage && (
                <ErrorMessage
                message={errorMessage}
                clear={() => setErrorMessage(null)}
                />
            )}
            <tbody>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-name'>Họ và Tên</label>         
                    </th>
                    <td>
                        <input id = 'editor-name' 
                        type = 'text'
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
                        <input id = 'editor-phoneNumber' 
                        type = 'text' 
                        value={createPhoneNumber}
                        onChange={(e) => setCreatePhoneNumber(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-nameOfRoom'>Email</label>                   
                    </th>
                    <td>
                        <input id = 'editor-nameOfRoom' 
                        type = 'text' 
                        value={createEmail}
                        onChange={(e) => setCreateEmail(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-role'>Vai trò</label>
                    </th>
                    <td>
                        <input id = 'editor-role' 
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
                        <input id = 'editor-nameOfRoom' 
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
                        <input id = 'editor-salary' 
                        type = 'number' 
                        value={createSalary}
                        onChange={(e) => setCreateSalary(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-password'>Mật Khẩu</label>
                    </th>
                    <td>
                        <input id = 'editor-password' 
                        type = 'password' 
                        value={createPassword}
                        onChange={(e) => setCreatePassword(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='editor-passwordVery'>Xác Thực Mật Khẩu</label>
                    </th>
                    <td>
                        <input id = 'editor-passwordVery' 
                        type = 'password'
                        value={createPasswordVerify}
                        onChange={(e) => setCreatePasswordVerify(e.target.value)}/>
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