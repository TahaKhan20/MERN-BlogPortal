import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import SearchBar from '../Search/searchbar'

const Nav1 = ({userName, onSearch}) =>{
    return(
        <>
        <nav className='navbar'>
            <Link to='/home' className='a'>Home</Link>
            <Link to='/create' className='a'>Create</Link>
            <Link to='/myblogs' className='a'>MyBlogs</Link>
            <Link to='/liked' className='a'>Liked</Link>
            <Link to='/search' id='searchbar'><SearchBar onSearch={onSearch}/></Link>
            
            <div className="right">
            <Link to='/edit' className='a'>
                <div className="f">
                    <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" id='user' alt="" />
                {userName===''?<p>User</p>:<p>{userName}</p>}
                </div>
                </Link>
                <Link to='/' className='a'>
                <div className="f">
                <img src="https://cdn-icons-png.flaticon.com/128/11082/11082074.png" id='user' alt="" />
                <p>Logout</p>
                </div>
                </Link>
                </div>
        </nav>
        
        </>
)}

export default Nav1;