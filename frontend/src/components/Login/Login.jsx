import './Login.scss'

import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { SiVorondesign } from "react-icons/si";

import { useState} from 'react';
import axios from 'axios';

import Message from '../Message/Message';

const Login = ({ handleShowRegister, handleLogged, getEmail }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState('password');
    const [eye, setEyes] = useState(false);
    const [message, setMessage] = useState('');

    const showPassword = () => {
        setSeePassword(seePassword === 'password' ? 'text' : 'password');
        setEyes(!eye)
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:7000/api/login', { email, password });
            setMessage(response.data)
            handleLogged();
            getEmail(email);
        } catch (error) {
            setMessage(error.response.data);  
        }
    };

    return (
        <>
            <div className='container-login'>
                <div className='title'>
                    <SiVorondesign />
                    <h2><span>BT</span>Fut</h2>
                </div>
                <h3>Login into your account</h3>

                <form onSubmit={handleLogin}>
                    <div>
                        <p>Email Address</p>
                        <div className='input-svg'>
                            <input
                                type="text"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className='svg'>
                                <MdOutlineEmail />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Password</p>
                        <div className='input-svg'>
                            <input
                                placeholder='Password'
                                type={seePassword}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='svg' onClick={showPassword}>
                                {eye ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='forget-password'>
                        <a href=''>Forgot Password?</a>
                    </div>

                    <button type='submit' className='button-form'>Login Now</button>


                    <div className='or'>
                        <div className='barr'></div>
                        <p>OR</p>
                        <div className='barr'></div>
                    </div>

                    <button onClick={handleShowRegister} className='button-out'>Signup Now</button>
                </form>
            </div>
            {message && <Message message={message} onClose={() => setMessage('')}/>}
        </>
    )
}

export default Login
