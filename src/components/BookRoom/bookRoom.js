import React, {useState, useEffect } from "react";
import {useHistory } from 'react-router-dom';
import Axios from 'axios';
import {Button } from 'reactstrap';
import ErrorMessage from '../../components/misc/ErrorMessage';
import '../Employee/Employee.css'
function Reservation() {
    const [number,setNumber] = useState(0);
	const [floor,setFloor] = useState(0);
	const [price,setPrice] = useState(0)
	const [note,setNote] = useState("");
	const [state,setState] = useState(false);
	const [typeofRoom,setTypeofRoom] = useState("");
	const [idRoom,setIdRoom] = useState("");
	const [checkIn,setCheckIn] = useState("");
	const [checkOut,setCheckOut] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const [guestData,setGuestData] = useState(JSON.parse(localStorage.getItem('guest')));
    const [roomData,setRoomData] = useState(JSON.parse(localStorage.getItem('room'))); 
    const history = useHistory();
    useEffect(() =>{
        if(guestData===null) setErrorMessage('Hãy chọn khách hàng muốn đặt phòng');
        if(roomData===null) setErrorMessage('Hãy chọn phòng để đặt');
        if(roomData){
            setNumber(roomData.number ? roomData.number: 0);
            setFloor(roomData.floor ? roomData.floor: 0);
            setPrice(roomData.price ? roomData.price: 0);
            setNote(roomData.note ? roomData.note: false);
            setState(roomData.state ? roomData.state: "");
            setTypeofRoom(roomData.typeofRoom ? roomData.typeofRoom: "");
            setIdRoom(roomData._id ? roomData._id: "");                   
        }   
     },[])

    async function saveRoom(e) {
        
		e.preventDefault();
		const roomData = {
			checkIn: checkIn ? checkIn: undefined,
			checkOut: checkOut ? checkOut: undefined,
			IDRoom: idRoom ? idRoom: undefined,
			number: number ? number: undefined,
			floor: floor ? floor: undefined,
			price: price ? price: undefined,
			note: note ? note: undefined,
			typeofRoom: typeofRoom ? typeofRoom: undefined,
			name: guestData.name ? guestData.name: undefined,
			address: guestData.address ? guestData.address: undefined,
			email: guestData.email ? guestData.email: undefined,
			phoneNumber: guestData.phoneNumber ? guestData.phoneNumber: undefined,
			IDCard: guestData.IDCard ? guestData.IDCard: undefined,
            IDGuest:guestData._id?guestData._id:undefined
		}

        try {
            await Axios.post("http://localhost:5000/bookRoom/directionRoom",roomData); 

            if(window.confirm(`Phòng của khách ${guestData.name} đã sẵn sàng.`)){   
                localStorage.clear();    
                history.push("/");
            } 
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }
	}

	function closeRoom(){
	    setNumber(0);
	    setFloor(0);
		setPrice(0);
		setNote("");
		setState(false);
		setTypeofRoom("");
	}
     
    return (
        <div onClick={()=>setErrorMessage(null)} className= "container mt-5 mb-5 employee-post" >
        <section className="reservation">
        <div className="container mt-5 mb-5">
        <div className="reservation-content">
            <div>
                <h2 className="form-title">Đặt phòng</h2>
            </div>
        <div className="form-flex">
        <div className="reservation-form">
            <h2 className="form-title1">Thông tin khách hàng</h2>
                <form className="re_form" >
                    <div className="form-group">
                        <label className="lblIcon" htmlFor="name">
                        <i class="zmdi zmdi-account material-icons-name"></i>

                        </label>
                    <input className="inputForm1" type="name" name="phone" id="phone" autoComplete="off"
                        placeholder="Họ tên khách hàng"
                        value={guestData?guestData.name:""}
                        readOnly
                    />
                    </div>  
                        
                    {/* Số điện thoại */}
                    <div className="form-group">
                    <label className="lblIcon"  htmlFor="phone">
                        <i class="zmdi zmdi-phone material-icons-name"></i>

                    </label>
                    <input className="inputForm1" type="name" name="phone" id="phone" autoComplete="off"
                        placeholder="Số điện thoại"
                        value={guestData?guestData.phoneNumber:""}
                        readOnly
                    />
                </div> 
                
                {/* Địa chỉ */}
                <div className="form-group">
                    <label className="lblIcon" htmlFor="phone">
                        <i class="zmdi zmdi-pin material-icons-name"></i>

                    </label>
                    <input className="inputForm1" type="name" name="phone" id="phone" autoComplete="off"
                        placeholder="Địa chỉ"
                        value = {guestData?guestData.address:""}
                        readOnly
                    />
                </div> 
                <div className="form-group">
                    <label className="lblIcon" htmlFor="name">
                        <i class="zmdi zmdi-info material-icons-name"></i>

                    </label>
                    <input className="inputForm1" type="name" name="name" id="name" autoComplete="off"
                        placeholder="Email"
                        value = {guestData?guestData.email:""}
                        readOnly
                    />
                </div>  
                <div className="form-group">
                    <label className="lblIcon" htmlFor="name">
                        <i class="zmdi zmdi-info material-icons-name"></i>

                    </label>
                    <input className="inputForm1" type="name" name="name" id="name" autoComplete="off"
                        placeholder="CMMD/CCCD"
                        value = {guestData?guestData.IDCard:""}
                        readOnly
                    />
                </div>  
                </form>                       
                </div>
                    <div className="info-form">
                <h2 className="form-title1">Thông tin loại phòng</h2>
                <form className="re_form" onSubmit={saveRoom} >
                    <div >
                        <label className="lblColor" htmlFor ='number'>Số Phòng</label>
                        <input id = 'number' 
                        type = 'number'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='floor'>Tầng</label>
                        <input id = 'floor' 
                        type = 'number' 
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='price'>Giá Phòng</label>
                        <input id = 'price' 
                        type = 'number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='note'>Ghi Chú</label>
                        <input id = 'note' 
                        type = 'text' 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='state'>Tình trạng phòng</label>
                        <input id = 'state' 
                        type = 'text' 
                        value={state?"Có khách thuê":"Phòng trống"}
                        onChange={(e) => setNote(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='typeofRoom'>Loại phòng</label>
                        <input id = 'typeofRoom' 
                        type = 'text' 
                        value={typeofRoom}
                        onChange={(e) => setTypeofRoom(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='typeofRoom'>Ngày thuê</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className='roomInput'
                        
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='typeofRoom'>Ngày trả phòng</label>
                        <input id = 'typeofRoom' 
                        type = 'date' 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className='roomInput'
                        
                        />
                    </div>
                                  
                   <div className='btn-confirm'>
                    <Button
                        type="submit"
                        color="success"
                        outline>
                        Đặt phòng
                    </Button>
                    <Button
                        color="danger"
                        outline
                        type="button" onClick={closeRoom}>
                        Thoát
                    </Button>
                    </div>
                    {errorMessage && (
                        <ErrorMessage
                        message={errorMessage}/>
                    )}
                </form>
                        
            </div>

        </div>
        </div>
        </div>
        </section>
        </div>
    );
}

export default Reservation;
