import React, { useEffect, useState } from 'react'
import './edit.css'
import { useNavigate } from 'react-router-dom';
export default function Edit({userName, setUserName}) {

    const[edit,setEdit] = useState(false);
    const [buttonText, setButtonText] = useState('Edit');
    const navigate = useNavigate();
    const[name, setName] = useState('');
    const[userEmail, setUserEmail] = useState('');
    const[userPassword, setUserPassword] = useState('');
    const[userEducation, setUserEducation] = useState('');
    const[interests, setInterests] = useState([]);
    useEffect(() => {
        if (!edit) {
            getUser(); // Fetch user data when the component mounts
        }
    }, [edit]); // Depend on 'edit' state change

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/${userName}/get`);
            const json = await response.json();
            setName(json.name);
            setUserEmail(json.email);
            setUserPassword(json.password);
            setUserEducation(json.education);
            setInterests(json.interests || []); // Set interests if available
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const editUser = async () => {
        console.log(name);
        try {
            const response = await fetch(`http://localhost:5000/user/${userName}/edit`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    name: name,
                    email: userEmail,
                    password: userPassword,
                    education: userEducation,
                    interests: interests,
                }),
            });

            if (response.ok) {
                // Handle success
                console.log('User information updated successfully');
            } else {
                // Handle error
                const json = await response.json();
                console.error('Error updating user:', json.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEdit = async () => {
        if (!edit) {
          await getUser();
        } else {
          console.log(name);
          await editUser();
          setUserName(name);
          navigate('/home');
        }
        setEdit(!edit);
        setButtonText(edit ? 'Edit' : 'Save');
      };
      

    const handleEmailChange = (e) => {
      if(edit){
        setUserEmail(e.target.value);
      }
    };

    const handleNameChange = (e) => {
      if (edit) {
          setName(e.target.value);
      }

  };
  
  const handlePasswordChange = (e) => {
      if (edit) {
          setUserPassword(e.target.value);
      }
  };
  
  const handleEducationChange = (e) => {
      if (edit) {
          setUserEducation(e.target.value);
      }
  };

  const handleInterestsChange = () => {
    if (edit) {
        const selectedInterests = Array.from(document.querySelectorAll('.checkbox input:checked'))
            .map(input => input.nextSibling.textContent);
        setInterests(selectedInterests);
    }
};

return(
  <>
  <div className="b1"></div>
  <button onClick={handleEdit} className='edit'>{buttonText}</button>
    <div className="cont2">
        <h1>Your Profile</h1>
        <div className="content1">
        <span id="h1">Name: </span>
        {edit ? 
        <input type='text'  placeholder='Enter your name' value={name}  onChange={handleNameChange}/>:
        <span className='r'>{name}</span>}
        </div>
        <div className="content1">
        <span id="h1">Email: </span>
        {edit ?
        <input type='text' name='email' placeholder='Enter your Email' value={userEmail} onChange={handleEmailChange}/>:
        <span className='r'>{userEmail}</span>}
        </div>
        <div className="content1">
        <span id="h1">Password: </span>
        {edit ? 
        <input type='text' name='password' placeholder='Enter your Password' value={userPassword} onChange={handlePasswordChange}/>:
        <span className='r'>{userPassword}</span>}
        </div>
        
        <div className="content1">
        <span id="h1">Education: </span>
        {edit ?
        <input type='text' name='education' placeholder='Enter your Education' value={userEducation} onChange={handleEducationChange}/>:
        <span className='r'>{userEducation}</span>}
        </div>
        
        <div className="content1">
        <span id="h1">Interests: </span>
                    {edit ? (
                        <div className="check">
                            <div className="i1 checkbox">
                                <input type="checkbox" onClick={handleInterestsChange} /><p>Sports</p>
                                <input type="checkbox" onClick={handleInterestsChange} /><p>Business</p>
                            </div>
                            <div className="i1 checkbox">
                                <input type="checkbox" onClick={handleInterestsChange} /><p>Movie</p>
                                <input type="checkbox" onClick={handleInterestsChange} /><p>Education</p>
                            </div>
                        </div>
                    ) : (
                        <div className="interests">
                            {interests.map((interest, index) => (
                                <span className='r' key={index}>{interest}</span>
                            ))}
                        </div>
                    )}
    </div>
    </div>
  </>
    )
}
