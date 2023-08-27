import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './blogs.css';

export default function Blogs({ userName, authorName, title}) {
  const [blogs, setBlogs] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        if (authorName === 'fetchblogs') {
          response = await fetch('http://localhost:5000/blog/fetchblogs');
          
        } 
        else if(title !== undefined)
        {
          response = await fetch(`http://localhost:5000/blog/title/${title}`);
        }
        else if (userName !== undefined) {
          try {
            const userLikedResponse = await fetch(`http://localhost:5000/user/${userName}/liked`);
            const blogIds = await userLikedResponse.json();

            const blogPromises = blogIds.map(async (id) => {
              const blogResponse = await fetch(`http://localhost:5000/blog/blogdetail/${id}`);
              const blogData = await blogResponse.json();
              return blogData;
            });

            const likedBlogs = await Promise.all(blogPromises);
            setBlogs(likedBlogs);
            setEmpty(likedBlogs.length === 0);
          } catch (error) {
            console.error('Error fetching liked blogs:', error);
            setEmpty(true);
          }
          return;
        }
        else {
          response = await fetch(`http://localhost:5000/blog/user/${authorName}`);
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch data'); // Throw an error if the response is not ok
        }

        const data = await response.json();

        if (data.length === 0) {
          setEmpty(true);
        } else {
          setBlogs(data);
          setEmpty(false);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setEmpty(true); // Set empty state to true in case of an error
      }
    }

    fetchData();
  }, [authorName]);

  const renderContent = (content) => {
    const renderedContent = {
      title: null,
      paragraph: null,
      image: null,
    };

    for (const item of content) {
      if (!renderedContent[item.type]) {
        renderedContent[item.type] = item;
      }
    }

    return (
      <>
        {renderedContent.title && (
          <h1>{renderedContent.title.value}</h1>
        )}
        {renderedContent.paragraph && (
          <p>{renderedContent.paragraph.value}</p>
        )}
        {renderedContent.image && (
          <div className="img">
            <img src={renderedContent.image.value} alt="" />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="con1">
      {empty ? (
        <p className='error'>No blogs found</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog1" key={blog._id}>
            {blog && renderContent(blog.content)}
            <Link to={`/blogdetail/${blog._id}`} type='button' className='l'>
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
