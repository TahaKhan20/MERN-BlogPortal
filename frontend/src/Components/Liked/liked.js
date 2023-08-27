import Blogs from "../Blogs/blogs";
import Nav1 from "../Navbar/navbar";

export default function Liked({userName}) {
    
    return(
      <>
      <Nav1 userName={userName}/>
      <h1 style={{marginLeft: '43%', marginTop: '4%', marginBottom: '0', color: '#002888'}}>Liked Blogs</h1>
    <Blogs userName={userName}/>
    </>
  )
}
