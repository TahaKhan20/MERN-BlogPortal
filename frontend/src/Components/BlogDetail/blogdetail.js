import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './blogdetail.css';
import emailjs from '@emailjs/browser';
import Nav1 from '../Navbar/navbar';

export default function BlogDetail({ userName, userEmail}) {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [getComment, setGetComment] = useState([]);
  const [showCommentsButton, setShowCommentsButton] = useState(false);
  const [auth, setAuth] = useState(false);
  const [auth1, setAuth1] = useState(false);
  
  const [author, setAuthor] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sub, setSub] = useState('');
  
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await emailjs.send(
        'service_oqe1unv', // Replace with your service ID
        'template_rfd25co', // Replace with your template ID
        {
          to: authorEmail,
          user_email: userEmail,
          user_name: userName,
          receiver: author,
          subject: sub,
          message: message,
        },
        'E_eYMu-eO96T_i2Mm' // Replace with your user ID
      );

      console.log('Email sent:', response.text);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const onAuthor = () => {
    setAuth(!auth);
  }
  
  const handleComment = async() => {
    try {
      const response = await fetch(`http://localhost:5000/blog/blogdetail/${id}/comment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comments: comment }), // Include the userId in the request body
});
  } catch (error) {
  console.error('Error updating like:', error);
}
  setComment('');
  showComment();
}
const onClickComment = ()=>{
  setShowCommentsButton(!showCommentsButton);

  showComment();
}
const showComment = async() => {
  
  try {
    const response = await fetch(`http://localhost:5000/blog/blogdetail/${id}/getcomment`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const data = await response.json();
console.log(data);
setGetComment(data);
} catch (error) {
console.error('Error updating like:', error);
}

}
  const onComment = (e) => {
    setComment(e.target.value);
  }
  const handleLike = async () => {
    setLike(!like);
    try {
      const response = await fetch(`http://localhost:5000/blog/blogdetail/${id}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName }), // Include the userId in the request body
});
  
      if (response.ok) {
        const updatedResponse = await fetch(`http://localhost:5000/blog/blogdetail/${id}`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setBlog(updatedData);
        } else {
          console.error('Error fetching updated blog:', updatedResponse.statusText);
        }
      } else {
        console.error('Error updating like:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  
    try {
      const userResponse = await fetch(`http://localhost:5000/user/${userName}/like/${id}`, {
        method: 'PUT',
      });
  
      if (!userResponse.ok) {
        console.error('Error updating user liked blogs:', userResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating user liked blogs:', error);
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/blog/blogdetail/${id}`);
        const data = await response.json();
        setBlog(data);
        setAuthor(data.author.name);
        setAuthorEmail(data.author.email);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
    <Nav1 userName={userName}/>
    <div className="c1">
      {blog.content && blog.content.map((item, index) => {
        if (item.type === 'title') {
          return <h1 key={index}>{item.value}</h1>;
        } else if (item.type === 'paragraph') {
          return <p key={index}>{item.value}</p>;
        } else if (item.type === 'image') {
          return <div className="image1"><img key={index} src={item.value} alt="" /></div>;
        } else {
          return (
            <p key={index}>Unknown content type: {item.type}</p>
          );
        }
      })}
      <div className="conn1">
          <button onClick={handleLike} className={`like ${!like ? 'pressed' : ''}`}>
        
          <div className="image">
            {like===false?<img src="https://cdn-icons-png.flaticon.com/128/126/126473.png" alt="" />:<img src="https://cdn-icons-png.flaticon.com/128/889/889140.png" alt="" />} 
          </div>
          {blog.like>0?<p>{blog.like}</p>:<p></p>}
      </button>
      
        <button onClick={onClickComment} id='comment' >Comments</button>

        <button className='author' onClick={onAuthor} >Author</button>

        </div>
        
    </div>
    {showCommentsButton ? (
      getComment.length > 0 ? (
      <div className="comments">
      {getComment.map((item, index) => (
        <div className="comment-box" key={index}>
          <p>{item}</p>
        </div>
      ))}
      </div>
    ) : (
      <p style={{margin: '0 15%', color:'red'}}>No comments yet!</p>
    )
) : null}
      <div className="comment" style={{ display: showCommentsButton ? 'flex' : 'none' }}>
          <input type="text" onChange={onComment} value={comment} placeholder='Enter Comment'/>
        
      <button onClick={handleComment}>
        <img src="https://cdn-icons-png.flaticon.com/128/3682/3682321.png" alt="" />
      </button>
      </div>
      

      <form className="auth" onSubmit={sendEmail} style={{ display: auth ? 'block' : 'none' }}>
      <label className='label'>Name</label>
      <p>{author}</p>
      <label className='label'>Email</label>
      
      <p>{authorEmail}</p>
      <label className='label'>Subject</label>
      <input type="text" className='in3' onChange={(e)=>{setSub(e.target.value)}}/>
      <label className='label'>Message</label>
      <textarea name="message" onChange={(e)=>{setMessage(e.target.value)}}/>
      <input type="submit" value="Send" />
    </form>
   
</>
  );
}
