import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './login.css'; // Make sure the path to your CSS file is correct
export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const SubmitEvent = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    
        });        
    
        const json = await response.json();
        if(json.success){
            navigate('/home');
        }
        else{
            setError(true);
            setMessage(json.error);
        }
    };

    useEffect(() => {
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#id_password');

        const handleTogglePassword = () => {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye-slash');
        };

        togglePassword.addEventListener('click', handleTogglePassword);

        // Clean up the event listeners when the component unmounts
        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
        };
    }, []);

    return (
        <>
        <div className="body"></div>
        <div className="container0">
            <h1>Login</h1>
            <form className='loginForm' onSubmit={SubmitEvent}>
                <div className="input0">
                    <div className='icon'>
                        <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" />
                    </div>
                    <div className="text">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={credentials.email}
                            onChange={onChange}
                            className='in1'
                            name="email"
                        />
                    </div>
                </div>
                <div className="input0">
                    <div className='icon'>
                        <img src="https://cdn-icons-png.flaticon.com/128/483/483408.png" alt="" />
                    </div>
                    <div className="text">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            autoComplete="current-password"
                            required
                            value={credentials.password}
                            onChange={onChange}
                            id="id_password"
                            className='in1'
                        />
                        <i className="far fa-eye" id="togglePassword" style={{ marginLeft: '-52px', cursor: 'pointer' }}></i>
                    </div>
                </div>
                {error && <p style={{ color: 'red', fontSize: '15px', marginLeft: '150px' }}>{message}</p>}
                <button type="submit" className='loginbtn'>Login</button>
                <span id='link'>Not a member?</span>
                <Link className='link2' to='../signup'>Create New Account</Link>
            </form>
        </div>
        </>
    );
}
