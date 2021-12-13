import React from 'react';
import { 
     faMusic, 
     faBars,
     faAngleDoubleLeft,
     faHome, 
     faIcons, 
     faCompactDisc,
     faHeadphonesAlt,
     faUserCheck,
     faSignInAlt,
     faSignOutAlt,
     faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './navbar.css';


import { a }from 'react-router-dom';

function Navbar({openNavbar, setOpenNavbar}) {

    return(
    <>
        <div className={openNavbar?'sidebar':'sidebar open'} >
            <div className="logo-details">
            <i className='bx bxl-c-plus-plus icon'><FontAwesomeIcon icon={faMusic} /></i>  
                <div className="logo_name">Player MP3</div>
                <i className='bx bx-menu' id="btn" onClick={() => setOpenNavbar(!openNavbar)}>
                    <FontAwesomeIcon icon={openNavbar ? faBars : faAngleDoubleLeft} />
                </i>
            </div>
            <ul className="nav-list">
            <li>
                <a href = "/">
                <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                <span className="links_name">Trang Chủ</span>
                </a>
                <span className="tooltip">Trang Chủ</span>
            </li>
            <li>
            <a href ="/types">
                <i className='bx bx-user' ><FontAwesomeIcon icon={faIcons} /></i>
                <span className="links_name">Thể Loại</span>
            </a>           
            <span className="tooltip">Thể Loại</span>
            </li>
            <li>
            <a  href="/playlist">
                <i className='bx bx-chat' ><FontAwesomeIcon icon={faCompactDisc} /></i>
                <span className="links_name">Play List</span>
            </a>           
            <span className="tooltip">Play List</span>
            </li>
            <li>
            <a href ="/">
                <i className='bx bx-pie-chart-alt-2' ><FontAwesomeIcon icon={faHeadphonesAlt} /></i>
                <span className="links_name">Play List Mới</span>
            </a>           
            <span className="tooltip">Play List Mới</span>
            </li>
            <li>
            <a href ="/users">
                <i className='bx bx-folder' ><FontAwesomeIcon icon={faUserCheck} /></i>
                <span className="links_name">Cá Nhân</span>
            </a>           
            <span className="tooltip">Cá Nhân</span>
            </li>
            <li>
            <a href ="/login">
                <i className='bx bx-cart-alt' ><FontAwesomeIcon icon={faSignInAlt} /></i>
                <span className="links_name">Đăng Nhập</span>
            </a>           
            <span className="tooltip">Đăng Nhập</span>
            </li>
            <li>
            <a href ="/register">
                <i className='bx bx-heart' ><FontAwesomeIcon icon={faSignOutAlt} /></i>
                <span className="links_name">Đăng Xuất</span>
            </a>           
            <span className="tooltip">Đăng Xuất</span>
            </li>
            <li>
            <a href ="/aboutUs">
                <i className='bx bx-cog' ><FontAwesomeIcon icon={faAddressCard} /></i>
                <span className="links_name">Về Chúng Tôi</span>
            </a>           
            <span className="tooltip">Về Chúng Tôi</span>
            </li>
            <li className="profile">
                <div className="profile-details">
                <img src="profile.jpg" alt="profileImg"/>
                <div className="name_job">
                    <div className="name">LHT</div>
                    <div className="job">Support by Whoat</div>
                </div>
                </div>
                <i className='bx bx-log-out' id="log_out" ></i>
            </li>
            </ul>
        </div>
    </>
    )
}
export default Navbar