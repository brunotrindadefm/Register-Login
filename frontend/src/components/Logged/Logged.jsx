import './Logged.scss'

import { useState, useEffect } from 'react';
import axios from 'axios';

const Logged = ({ logOut, userEmail }) => {

    const [user, setUser ] = useState('');

    const handleLogOut = () => {
        logOut();
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/register/${userEmail}`);
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getUser();
    },[userEmail])

    return (
        <div className='container-logged'>
            <div className='welcome'>
                <p>Welcome, {user.name}!</p>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}

export default Logged
