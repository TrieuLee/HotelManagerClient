import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Table,Button } from 'reactstrap';
import ErrorMessage from '../misc/ErrorMessage';

function RoomEditor({getServices,setServiceEditOpen, editServiceData}) {

    
	const [name,setName] = useState("");
	const [price,setPrice] = useState(0)
    const [errorMessage,setErrorMessage] = useState(null);


    useEffect(() =>{
        if(editServiceData){
            setName(editServiceData.name ? editServiceData.name: "");   
            setPrice(editServiceData.price ? editServiceData.price: "");
           
        }
     },[editServiceData])

    async function saveService(e) {
		e.preventDefault();

		const roomData = {
			name: name ? name: undefined,
			price: price ? price: undefined,
		
		}

        try {
            if(!editServiceData)
                await Axios.post("http://localhost:5000/service",roomData);
            else await Axios.put(`http://localhost:5000/service/${editServiceData._id}`,roomData);
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
        setServiceEditOpen(false);
	}

   return <div className= "employee-post">
       <form onSubmit={saveService}>
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
                        <label htmlFor ='name'>Tên Dịch vụ</label>         
                    </th>
                    <td>
                        <input id = 'name' 
                        type = 'text'
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
                        <input id = 'price' 
                        type = 'number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
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
            type="button" onClick={closeService}>
            Thoát
         </Button>
      </form>
   </div>;
};

export default RoomEditor;  