import React, {useState, useEffect } from "react";
import {useHistory } from 'react-router-dom';
import Axios from 'axios';
import {Button } from 'reactstrap';
import ErrorMessage from '../../components/misc/ErrorMessage';
import '../Employee/Employee.css'
function Reservation() {
    const [name,setName] = useState("");
	const [price,setPrice] = useState(0)
	const [quantity,setQuantity] = useState(0);
	const [idService,setIDService] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const history = useHistory();
    const [guestData,setGuestData] = useState(JSON.parse(localStorage.getItem('guest')));
    const [roomData,setRoomData] = useState(JSON.parse(localStorage.getItem('service'))); 
    useEffect(() =>{
        if(guestData===null) setErrorMessage('Hãy chọn khách hàng muốn đặt phòng');
        if(roomData===null) setErrorMessage('Hãy chọn dịch vụ để đặt');
        if(roomData){
            setName(roomData.name ? roomData.name: "");
            setPrice(roomData.price ? roomData.price: 0);
            setQuantity(roomData.quantity ? roomData.quantity: "");
            setIDService(roomData._id ? roomData._id: "");                  
        }   
     },[])

    async function saveRoom(e) {
        
		e.preventDefault();
		const roomData = {
			quantity: quantity ? quantity: undefined,
			IDService: idService ? idService: undefined,
			name: name ? name: undefined,
			price: price ? price: undefined,
			nameCus: guestData.name ? guestData.name: undefined,
			address: guestData.address ? guestData.address: undefined,
			email: guestData.email ? guestData.email: undefined,
			phoneNumber: guestData.phoneNumber ? guestData.phoneNumber: undefined,
			IDCard: guestData.IDCard ? guestData.IDCard: undefined,
            IDUser:guestData._id?guestData._id:undefined
		}

        try {
            await Axios.post("http://localhost:5000/bookService/directionService",roomData); 

            if(window.confirm(`Dịch vụ của khách ${guestData.name} đã sẵn sàng. Hãy thực hiện cho khách`)){   
                localStorage.clear();    
                history.push("/");
            } 
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }
	}

	function closeRoom(){
	    setName("");
		setPrice(0);
		setQuantity(0);
		setIDService("");
	}
     
    return (
        <div onClick={()=>setErrorMessage(null)} className= "container mt-5 mb-5 employee-post" >
        <section className="reservation">
        <div className="container mt-5 mb-5">
        <div className="reservation-content">
            <div>
                <h2 className="form-title">Đặt dịch vụ</h2>
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
                        <label className="lblColor" htmlFor ='number'>Tên dịch vụ</label>
                        <input id = 'number' 
                        type = 'text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor" htmlFor ='floor'>Giá dịch vụ</label>
                        <input id = 'floor' 
                        type = 'number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='roomInput'
                        readOnly
                        />
                    </div>
                    <div>
                        <label className="lblColor"htmlFor ='note'>Số lượng</label>
                        <input id = 'note' 
                        type = 'number' 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='roomInput'
                        />
                    </div>                                 
                   <div className='btn-confirm'>
                    <Button
                        type="submit"
                        color="success"
                        outline>
                        Đặt dịch vụ
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
