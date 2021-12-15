import React,{ useState } from 'react';
import { 
     faBars,
     faAngleDoubleLeft,
     faHome, 
     faIcons
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './navbar.css';


function Navbar({openNavbar, setOpenNavbar}) {

    const [openList, setOpenList] = useState(false);
    const [openListNav, setOpenListNav] = useState(false);

    return(
    <>
        <div className={openNavbar?'sidebar':'sidebar open'} >
            <div className="logo-details">
                <div className="logo_name">Quản Lý Khách Sạn</div>
                <i className='bx bx-menu' id="btn" onClick={() => setOpenNavbar(!openNavbar)}>
                    <FontAwesomeIcon icon={openNavbar ? faBars : faAngleDoubleLeft} />
                </i>
            </div>
            <ul className="nav-list">
                <li>
                    <a href ="/types">
                        <i className='bx bx-user' ><FontAwesomeIcon icon={faIcons} /></i>
                        <span className="links_name">Nhân Viên</span>
                    </a>           
                    <span className="tooltip">Nhân Viên</span>
                </li>
                <li>
                    <a href ="/types">
                        <i className='bx bx-user' ><FontAwesomeIcon icon={faIcons} /></i>
                        <span className="links_name">Phòng</span>
                    </a>            
                    <span className="tooltip">Phòng</span>
                </li>
                <li>
                    <a href ="/types">
                        <i className='bx bx-user' ><FontAwesomeIcon icon={faIcons} /></i>
                        <span className="links_name">Khách Hàng</span>
                    </a>           
                    <span className="tooltip">Khách Hàng</span>
                </li>
                <li>
                    <a href ="/types">
                        <i className='bx bx-user' ><FontAwesomeIcon icon={faIcons} /></i>
                        <span className="links_name">Dịch Vụ</span>
                    </a>           
                    <span className="tooltip">Dịch Vụ</span>
                </li>

                {/* list menu */}
                <li onClick={() => setOpenList(!openList)}>
                    <a>
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Chức Năng</span>
                    </a>
                    <span className="tooltip">Chức Năng</span>
                </li>
                
                <li className={openList&&!openNavbar?'subNav':'subNavClose'}>
                    <a href = "/">
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Đặt Phòng</span>
                    </a>
                    <span className="tooltip">Đặt Phòng</span>
                </li>
                <li className={openList&&!openNavbar?'subNav':'subNavClose'}>
                    <a href = "/">
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Trả Phòng</span>
                    </a>
                    <span className="tooltip">Trả Phòng</span>
                </li>
                <li className={openList&&!openNavbar?'subNav':'subNavClose'}>
                    <a href = "/">
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Sử Dụng Dịch Vụ</span>
                    </a>
                    <span className="tooltip">Sử Dụng Dịch Vụ</span>
                </li>
                
                
                {/* list menu */}
                <li onClick={() => setOpenListNav(!openListNav)}>
                    <a>
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Báo Cáo</span>
                    </a>
                    <span className="tooltip">Báo Cáo</span>
                </li>
                
                <li className={openListNav&&!openNavbar?'subNav':'subNavClose'}>
                    <a href = "/">
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Doanh Thu Phòng</span>
                    </a>
                    <span className="tooltip">Doanh Thu Phòng</span>
                </li>
                <li className={openListNav&&!openNavbar?'subNav':'subNavClose'}>
                    <a href = "/">
                        <i className='bx bx-grid-alt'><FontAwesomeIcon icon={faHome} /></i>
                        <span className="links_name">Doanh Thu Dịch Vụ</span>
                    </a>
                    <span className="tooltip">Doanh Thu Dịch Vụ</span>
                </li>
            </ul>
        </div>
    </>
    )
}
export default Navbar