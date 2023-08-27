import Nav1 from "./Components/Navbar/navbar"
import Blogs from "./Components/Blogs/blogs.js";
export default function Home({userName, search}) {
  const link = 'fetchblogs';
  return (
    <>
    <Nav1 userName={userName} onSearch={search}/>
    <Blogs authorName={link}/>
        </>
  );
}


