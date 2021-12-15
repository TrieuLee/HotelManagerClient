
import React,{ useState } from 'react';
import Navbar from './components/misc/navbar';
import Router from './Router';
import './App.css'


function App() {
    const [openNavbar, setOpenNavbar] = useState(true)
    return (

        <>

        <nav className='navTitle'>
            <div>
            <h1>Hello world!</h1>
            </div>
            
        </nav>
         <div className='container-flex'>
        <div className={openNavbar?'set-with-navbar':'set-with-navbar open'}><Navbar
            openNavbar={openNavbar}
            setOpenNavbar={setOpenNavbar}
        /></div>
        <div className={openNavbar?'set-with-router':'set-with-router-open'}><Router/></div>
    </div>


        
        </>
   
    )
}

export default App;