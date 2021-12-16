import React, {useEffect, useState } from 'react';
import Axios from 'axios';

function Login() {
    const [employee, setEmployee] = useState([]);

	useEffect(() =>{
		getEmployees();
	},[]);

	async function getEmployees() {
		const employeeRes = await Axios.get("http://localhost:5000/staff/");
		console.log(employeeRes);
	}
   return <div className ="class">
      
   </div>;
};

export default Login;