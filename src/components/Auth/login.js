import React, { useContext, useState } from 'react';
import  './login.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../misc/ErrorMessage';

const SignIn = () => {

    const [formEmail,setFormEmail] = useState("");
    const [formPassword,setFormPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const {getUser} = useContext(UserContext);
    const history = useHistory();

    async function authLogin(e) {
		e.preventDefault();

		const loginData = {
			email: formEmail ? formEmail: undefined,
			password: formPassword ? formPassword: undefined,
		}

        try {
            await Axios.post("http://localhost:5000/staff/login",loginData);
        } catch (err) {
            if(err.response && err.response.data.errorMessage) setErrorMessage(err.response.data.errorMessage)
            return;
        }
      
      await getUser();
      history.push("/");
	}

    return (
        <>
        <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">

                        <div className="signin-image">
                        
                            <img src="assets/img/about/2.png" alt="" />
                        
                        </div>

                        <div className="signup-form">
                            <h2 className="form-title">Đăng nhập</h2>
                            <form onSubmit={authLogin} className="register-form" id="register-form">
                                {errorMessage && (
                                <ErrorMessage
                                message={errorMessage}
                                clear={() => setErrorMessage(null)}
                                />
                                )}
                                
                                <div className="form-group">
                                    <label className='label' htmlFor="email"></label>
                                    <input className='text' type="email" name="email" id="email" autoComplete="off"
                                        placeholder="Email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                    />
                                </div>
                               
                                <div className="form-group">
                                    <label className='label' htmlFor="password"></label>
                                    <input className='text' type="password" name="password" id="password" autoComplete="off"
                                        placeholder="Mật khẩu"
                                        value={formPassword}
                                        onChange={(e) => setFormPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <input className='text' type ="submit" name="signin" id="signin" className="form-submit"
                                        value="Đăng nhập"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignIn;