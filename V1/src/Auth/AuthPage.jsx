import React, { useState } from 'react';
import axios from 'axios';
import { isLoggedIn } from '../auth';
import HomePage from '../Components/HomePage';

const AuthPage = () => {

    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        setShow(prev => !prev);
    };

    // 🔥 LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8888/api/auth/login', {
                username : username,
                password : password
            });

            console.log('Login Success:', response.data);

            // store token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', 'true');

            alert('Login Successful');

            window.location.href='/';

        } catch (error) {

            console.log(error.response?.data || error.message);
            alert('Login Failed');

        }
    };

    return (
        <div className=''>
            {isLoggedIn() ? <HomePage/> : <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '650px' }}>

                <div className='border-2 rounded-3 p-2' style={{ minHeight: '200px', minWidth: '400px' }}>

                    <center>
                        <b className='fs-3 py-1 border-bottom'>Login</b>
                    </center>

                    <br />

                    <div className='container'>

                        <form onSubmit={handleLogin}>

                            {/* Username */}
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <br />

                            {/* Password */}
                            <div className="form-group position-relative">
                                <label htmlFor="password">Password</label>

                                <input
                                    type={show ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {/* Eye Icon */}
                                <i
                                    className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}
                                    onClick={togglePassword}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '30px',
                                        cursor: 'pointer'
                                    }}
                                ></i>
                            </div>

                            <button type="submit" className="btn btn-primary rounded-0 w-100 my-2">
                                Submit
                            </button>

                        </form>

                    </div>

                </div>
            </div>}
        </div>
    );
};

export default AuthPage;