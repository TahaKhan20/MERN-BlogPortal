import Nav1 from "../Navbar/navbar";
import Blogs from "./blogs";

export default function MyBlogs({ userName }) {
    
    return (
        <>
        <Nav1 userName={userName}/>
        <h1 style={{marginLeft: '43%', marginTop: '4%', marginBottom: '0', color: '#002888'}}>My Blogs</h1>
        <Blogs authorName={userName} />
        </>
    );
}
