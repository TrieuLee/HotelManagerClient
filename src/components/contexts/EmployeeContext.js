import React, { createContext } from 'react';
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
        const [employees] = useState([
            {id:uuidv4(), name: 'Thomas Hardy10', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222'},
            {id:uuidv4(), name: 'Thomas triều', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222'},
            {id:uuidv4(), name: 'Thomas Hardy10', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222'},
            {id:uuidv4(), name: 'Thomas Hardy10', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222'},
        ])  
    return (
        <EmployeeContext.Provider value={{employees}}>
            {props.children}
        </EmployeeContext.Provider>
    );
}

export default EmployeeContextProvider;
