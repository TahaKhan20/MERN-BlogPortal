import React, { useState } from 'react';
import './signup.css'; // Make sure the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [json, setJson] = useState(null); // State for storing response JSON

    const handleTogglePassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const [credentials, setCredentials] = useState({name:'', email: '', password: '', education: '', interests: [] });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleInterestChange = (e) => {
        const interest = e.target.name;
        const isChecked = e.target.checked;
    
        if (isChecked) {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                interests: [...prevCredentials.interests, interest],
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                interests: prevCredentials.interests.filter((i) => i !== interest),
            }));
        }
    };
    
    const SubmitEvent = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, education: credentials.education, interests: credentials.interests }),
        });
        const json = await response.json();
        setJson(json); // Store response JSON in state

        if(json.success1){
            navigate('/home');
        }
        else{
            setError(true);
            console.log(json.error);
            setMessage(json.error);
            
        }
        if (credentials.interests.length === 0) {
            setError(true);
            setMessage('Please select at least one interest.');
            return;
        }
        const password1 = document.querySelector('#id_password1').value;
        const password2 = document.querySelector('#id_password2').value;

        if (password1 === password2) {
            setPasswordMatch(true);
            // Continue with form submission or other actions
        } else {
            setPasswordMatch(false);
            // Handle password mismatch, e.g., show an error message
        }
    };

    return (
        <>
        <div className="body1"></div>
        <div className="container1">
            <h1>Sign Up</h1>
            <form className='signupForm' onSubmit={SubmitEvent}>
            <div className="input1">
            <div className="text">
                <input type="text" required placeholder="Enter Username" name='name' className='in2' onChange={onChange} value={credentials.name} />
                </div>
                </div>
                <div className="input1">
                <div className="text">
                <input type="email" required placeholder="Enter Email" name='email' className='in2' onChange={onChange} value={credentials.email} />
                </div>
                </div>
                <div className="input1">
                    <div className="text">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name="password"
                            placeholder="Create Password"
                            autoComplete="current-password"
                            required
                            id="id_password1"
                            className='in2'
                        />
                        <i
                            className={showPassword1 ? 'fas fa-eye-slash' : 'fas fa-eye'}
                            onClick={handleTogglePassword1}
                            style={{ marginLeft: '-42px', cursor: 'pointer' }}
                        ></i>
                    </div>
                </div>
                <div className="input1">
                    <div className="text">
                        <input
                            type={showPassword2 ? 'text' : 'password'}
                            name="password"
                            placeholder="Confirm Password"
                            autoComplete="current-password"
                            required
                            id="id_password2"
                            className='in2'
                            onChange={onChange}
                            value={credentials.password}
                            
                        />
                        <i
                            className={showPassword2 ? 'fas fa-eye-slash' : 'fas fa-eye'}
                            onClick={handleTogglePassword2}
                            style={{ marginLeft: '-42px', cursor: 'pointer' }}
                        ></i>
                    </div>
                </div>

                {!passwordMatch && <p className="error-message">Passwords do not match.</p>}

                <div className="input1">
                    <div className="text">
                        <input type="text" name='education' placeholder="Enter Education" className='in2' onChange={onChange} value={credentials.education}/>
                    </div>
                </div>
                <h3 className='h3'>Discover your Interests</h3>
                <div className="input1 checkbox">
                    &nbsp;&nbsp;&nbsp;
                    <input type="checkbox" onChange={handleInterestChange} checked={credentials.interests.includes('Sports')} name='Sports' /><p>Sports</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" onChange={handleInterestChange} checked={credentials.interests.includes('Business')} name='Business' /><p>Business</p>
            </div>
            <div className="input1 checkbox">
                    &nbsp;&nbsp;&nbsp;
                    <input type="checkbox" onChange={handleInterestChange} checked={credentials.interests.includes('Movies')} name='Movies' /><p>Movies</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" onChange={handleInterestChange} checked={credentials.interests.includes('Education')} name='Education' /><p>Education</p>
            </div>
            {error && (
                <p style={{ color: 'red', fontSize: '15px', margin: '0px 10%' }}>{message}</p>
            )}
            {json && json.errors && (
                <ul style={{ color: 'red', fontSize: '15px', margin: '0px 10%' }}>
                    {json.errors.map((error, index) => (
                        <li key={index}>{error.msg}</li>
                    ))}
                </ul>
            )}   
                <button type="submit" className='signupbtn'>Create Account</button>
            </form>
        </div>
        </>
    );
}
