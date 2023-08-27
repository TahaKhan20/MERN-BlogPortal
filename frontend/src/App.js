import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Edit from './Components/Edit/edit';
import Create from './Components/Create/create';
import Home from './home';
import Login from './Components/Login/login';
import SignUp from './Components/Login/signup'
import BlogDetail from './Components/BlogDetail/blogdetail';
import MyBlogs from './Components/Blogs/myblogs';
import Search from './Components/Search/search';
import Liked from './Components/Liked/liked';
function App() {
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [liked, setLiked] = useState('');
  
  const[search,setSearch] = useState('');
    
  const handleSearch = (query) => {
    setSearch(query);
}
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login setuserName={setUsername} setuserEmail={setUserEmail} />} />
        <Route path="/home" element={<Home userName={userName} search={handleSearch}/>} />
        <Route path="/blogdetail/:id" element={<BlogDetail userName={userName} blogs={liked} setBlogs={setLiked} userEmail={userEmail}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create userName={userName} userEmail={userEmail}/>} />
        <Route path="/myblogs" element={<MyBlogs userName={userName}/>} />
        <Route path="/edit" element={<Edit userName={userName} setUserName={setUsername}/>} />
        <Route path="/search" element={<Search searchQuery={search}/>} />
        <Route path="/liked" element={<Liked userName={userName}/>} />
        
      </Routes>
    </div>
  );
}

export default App;
