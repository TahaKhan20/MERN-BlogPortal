const express = require("express");
const router = express.Router();
const Blog = require('../models/Blogs');

router.post('/create', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog post' });
    }
});

router.get('/user/:name', async (req, res) => {
    const { name } = req.params;

    try {
      const blog = await Blog.find({ 'author.name': name });
      if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/blogdetail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog details' });
    }
});

router.get('/fetchblogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

router.put('/blogdetail/:id/like', async (req, res) => {
    try {
      const id = req.params.id;
      const userName = req.body.userName; // You need to get the user's ID from the request
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      let c = blog.like;
      // Check if the user has already liked the blog
      if (blog.likedBy.includes(userName)) {
        c = c-1;
        await blog.updateOne({ $set: { like: c }, $pull: { likedBy: userName } });
        
    }
    else{
      c = c + 1;     
      await blog.updateOne({ $set: { like: c }, $push: { likedBy: userName } });

    }
      // Update both like count and the list of users who liked
  
      res.json({ message: 'Like updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating like' });
    }
  });
  
  router.put('/blogdetail/:id/comment', async (req, res) => {
    try {
      const id = req.params.id;
        const c = req.body.comments;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      // Check if the user has already liked the blog
      await blog.updateOne({ $push: { comment: c } });
          
      res.json({ message: 'Like updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating like' });
    }
  });
  router.get('/blogdetail/:id/getcomment', async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      // Check if the user has already liked the blog
      console.log(blog.comment);
      res.json(blog.comment);
    } catch (error) {
      res.status(500).json({ error: 'Error updating like' });
    }
  });

router.get('/title/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const blogs = await Blog.find({ 'content.type': 'title', 'content.value': title });
        
        if (blogs.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blogs); // You might want to adjust this part based on your needs
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
