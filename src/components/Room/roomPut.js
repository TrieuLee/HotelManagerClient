import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Table,Button } from 'reactstrap';
import ErrorMessage from '../misc/ErrorMessage';

function RoomEditor({getRooms,setRoomEditOpen,editRoomData}) {

    
	const [number,setNumber] = useState(0);
	const [floor,setFloor] = useState(0);
	const [price,setPrice] = useState()
	const [note,setNote] = useState("");
	const [state,setState] = useState();
	const [typeofRoom,setTypeofRoom] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);


    useEffect(() =>{
        if(editRoomData){
            setNumber(editRoomData.number ? editRoomData.number: "");
            setFloor(editRoomData.floor ? editRoomData.floor: "");
            setPrice(editRoomData.price ? editRoomData.price: "");
            setNote(editRoomData.note ? editRoomData.note: "");
            setState(editRoomData.state ? editRoomData.state: "");
            setTypeofRoom(editRoomData.typeofRoom ? editRoomData.typeofRoom: "");
        }
     },[editRoomData])

    async function saveRoom(e) {
		e.preventDefault();

		const roomData = {
			number: number ? number: undefined,
			floor: floor ? floor: undefined,
			price: price ? price: undefined,
			note: note ? note: undefined,
			state: state ? state : undefined,
			typeofRoom: typeofRoom ? typeofRoom: undefined,
		}

        try {
            if(!editRoomData)
                await Axios.post("http://localhost:5000/room",roomData);
            else await Axios.put(`http://localhost:5000/room/${editRoomData._id}`,roomData);
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }

		getRooms();
		closeRoom()
	}

	function closeRoom(){
	    setNumber(0);
	    setFloor(0);
		setPrice(0);
		setNote("");
		setState(false);
		setTypeofRoom("");
        setRoomEditOpen(false);
	}

   return <div onClick={()=>setErrorMessage(null)} className= "employee-post">
       <form onSubmit={saveRoom}>
        <Table borderless>
            {errorMessage && (
                <ErrorMessage
                message={errorMessage}
               
                />
            )}
            <tbody>
                <tr>
                    <th scope="row">
                        <label htmlFor ='number'>Số Phòng</label>         
                    </th>
                    <td>
                        <input id = 'number' 
                        type = 'number'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='floor'>Tầng</label>
                    </th>
                    <td>
                        <input id = 'floor' 
                        type = 'number' 
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='price'>Giá Phòng</label>                   
                    </th>
                    <td>
                        <input id = 'price' 
                        type = 'number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='note'>Ghi Chú</label>
                    </th>
                    <td>
                        <select id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        >
                            <option>Chọn</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Đang bảo trì">Đang bảo trì</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='state'>Tình trạng phòng</label>                   
                    </th>
                    <td>
                        <select id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        >
                            <option>Chọn</option>
                            <option value="true">Có Khách thuê</option>
                            <option value="false">Phòng trống</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label htmlFor ='typeofRoom'>Loại phòng</label>
                    </th>
                    <td>
                        <select id="typeofRoom"
                        value={typeofRoom}
                        onChange={(e) => setTypeofRoom(e.target.value)}
                        >
                            <option>Chọn</option>
                            <option value="Phòng Đơn">Phòng Đơn</option>
                            <option value="Phòng Đôi">Phòng Đôi</option>
                            <option value="Phòng Gia Đình">Phòng Gia Đình</option>
                            <option value="Hoàng Đế">Hoàng Đế</option>
                            <option value="Trung Bình">Trung Bình</option>
                        </select>
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
            type="button" onClick={closeRoom}>
            Thoát
         </Button>
      </form>
   </div>;
};

export default RoomEditor;  