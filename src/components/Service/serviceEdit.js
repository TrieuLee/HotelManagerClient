import React, {useState} from 'react';
import Axios from 'axios';
import { Table,Button } from 'reactstrap';
import ErrorMessage from '../misc/ErrorMessage';

function RoomEditor({getServices,setServiceCreateOpen}) {

    
	const [name,setName] = useState("");
	const [unit,setUnit] = useState("");
	const [price,setPrice] = useState(0)
    const [errorMessage,setErrorMessage] = useState(null);

    async function saveService(e) {
		e.preventDefault();

		const serviceData = {
			name: name ? name: undefined,
			price: price ? price: undefined,
			unit: unit ? unit: undefined,
		}

        try {
            await Axios.post("http://localhost:5000/service",serviceData);
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }

		getServices();
		closeService()
	}

	function closeService(){
	    setName("");
		setPrice(0);
        setServiceCreateOpen(false);
	}

   return <div onClick={()=>setErrorMessage(null)} className= "employee-post">
        <div className='titleModal'>
        <h2>Thêm dịch vụ </h2>
       </div>
       <form onSubmit={saveService}>
        <Table borderless>
            {errorMessage && (
                <ErrorMessage
                message={errorMessage}
                
                />
            )}
            <tbody>
                <tr>
                    <th scope="row">
                        <label htmlFor ='name'>Tên dịch vụ</label>         
                    </th>
                    <td>
                        <input className='formInput' id = 'name' 
                        type = 'name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label htmlFor ='price'>Giá Dịch vụ</label>                   
                    </th>
                    <td>
                        <input className='formInput' id = 'price' 
                        type = 'number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='price'>Đơn vị tính</label>                   
                    </th>
                    <td>
                        <input className='formInput' id = 'price' 
                        type = 'text' 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
        <div className='btn-confirm'>
         <Button
            type="submit"
            color="success"
            outline>
            Tạo mới
         </Button>
         <Button
            color="danger"
            outline
            type="button" onClick={closeService}>
            Thoát
         </Button>
         </div>
      </form>
   </div>;
};

export default RoomEditor;