import './Login.scss'

import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { SiVorondesign } from "react-icons/si";
import { SiNamemc } from "react-icons/si";

import { useState, useEffect } from 'react'
import axios from 'axios';

import Message from './Message';

const Register = ({ handleShowRegister, handleUserRegister, getEmail }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [seePassword, setSeePassword] = useState('password');
    const [seeConfirmPassword, setSeeConfirmPassword] = useState('password')
    const [eye, setEyes] = useState('');
    const [confirmEye, setConfirmEye] = useState('');
    const [message, setMessage] = useState('')

    const showPassword = () => {
        setSeePassword(seePassword === 'password' ? 'text' : 'password');
        setEyes(!eye);
    };

    const showConfirmPassword = () => {
        setSeeConfirmPassword(seeConfirmPassword === 'password' ? 'text' : 'password');
        setConfirmEye(!confirmEye);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:7000/register', { name, email, password, confirmPassword })
            setMessage(response.data);
            handleUserRegister();
            getEmail(email);
        } catch (error) {
            setMessage(error.response.data);
            console.log(error)
        }
    };

    return (
        <>
            <div className='container-login'>
                <div className='title'>
                    <SiVorondesign />
                    <h2><span>BT</span>Fut</h2>
                </div>
                <h3>Signup your account</h3>

                <form onSubmit={handleRegister}>
                    <div>
                        <p>Name</p>
                        <div className='input-svg'>
                            <input
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='svg'>
                                <SiNamemc />
                            </div>
                        </div>
                    </div>
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
                    <div>
                        <p>Confirm Password</p>
                        <div className='input-svg'>
                            <input
                                placeholder='Confirm Password'
                                type={seeConfirmPassword}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className='svg' onClick={showConfirmPassword}>
                                {confirmEye ? (
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

                    <button type='submit' className='button-form'>Signup Now</button>


                    <div className='or'>
                        <div className='barr'></div>
                        <p>OR</p>
                        <div className='barr'></div>
                    </div>

                    <button onClick={handleShowRegister} className='button-out'>Login Now</button>

                </form>
            </div>
            {message && (
                <Message message={message} onClose={() => setMessage('')} />
            )}
        </>
    )
}

export default Register
