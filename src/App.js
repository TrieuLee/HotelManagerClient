
import React,{ useState } from 'react';
import Axios from 'axios';

import {UserContextProvider} from './context/UserContext';
import Navbar from './components/misc/navbar';
import Router from './Router';
import AuthDisPlay from './components/Auth/authDisplay';
import './App.css'

Axios.defaults.withCredentials = true;

function App() {
    const [openNavbar, setOpenNavbar] = useState(true)

    return (
        <UserContextProvider>
            <AuthDisPlay/>
            <div className='container-flex'>
            <div className={openNavbar?'set-with-navbar':'set-with-navbar open'}><Navbar
                openNavbar={openNavbar}
                setOpenNavbar={setOpenNavbar}/>
            </div>
                 <div className={openNavbar?'set-with-router':'set-with-router-open'}><Router/></div>
            </div>
            
        </UserContextProvider>
    )
}

export default App;