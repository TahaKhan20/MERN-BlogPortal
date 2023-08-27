import React from 'react';
import Blogs from '../Blogs/blogs';

export default function Search({ searchQuery }) {
    return (    
    <Blogs title={searchQuery} />
    
  );
}
