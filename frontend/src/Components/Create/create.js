import React, { useState } from 'react';
import './create.css';
import { useNavigate } from 'react-router-dom';
import Nav1 from "../Navbar/navbar"

export default function Create({userName, userEmail}) {
  const [inputText, setInputText] = useState('');
  const [contentArray, setContentArray] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const insertContent = (type) => {
    setContentArray([...contentArray, { type, value: inputText }]);
    setInputText('');
  };

  const renderContent = () => {
    return contentArray.map((item, index) => {
      if (item.type === 'title') {
        return <h1 key={index}>{item.value}</h1>;
      } else if (item.type === 'paragraph') {
        return <p key={index}>{item.value}</p>;
      } else if (item.type === 'image') {
        return <img key={index} src={item.value} alt="" />;
      }
      return null;
    });
  };

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({author: {name: userName, email: userEmail}, content: contentArray, like:0 }),
      });
  
      if (response.ok) {
        // Handle success
        console.log('Blog content created successfully');
        setContentArray([]); // Clear the content array after successful creation
        setInputText(''); // Clear the input text
        navigate('/home');
      } else {
        // Handle error
        console.error('Error creating blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };
  
  return (
    <>
    <Nav1 userName={userName}/>
      <button type="button" className='cr' onClick={onCreate}>Create</button>

      <div className="cont1">
        {renderContent()}
      </div>
      <form>
        <div className='in'>
          <button className="btns" type="button" onClick={() => insertContent('title')}>Title</button>
          <button className="btns" type="button" onClick={() => insertContent('paragraph')}>Paragraph</button>
          <button className="btns" type="button" onClick={() => insertContent('image')}>Image</button>

          <input
            type="text"
            placeholder="Enter text"
            value={inputText}
            onChange={handleInputChange}
            className="create"
          />
        </div>
      </form>
    </>
  );
}
