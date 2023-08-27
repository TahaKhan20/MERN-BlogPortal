const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const BlogsSchema = new Schema({
  _id: {
    type: Number,
    unique: true,
  },
  author: {
    name: {
    type: String,
    },
    email: {
      type: String
    }
  },
  content: [
    {
      type: {
        type: String,
        required: true,
        enum: ['title', 'paragraph', 'image'],
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String], // Store user IDs who liked the blog
    default: [],
  },
  comment: {
    type: [String],
    default: []
  }
});

BlogsSchema.pre('save', async function (next) {
  if (!this._id) {
    const count = await this.constructor.countDocuments();
    console.log(count);
    this._id = count + 1;
  }
  next();
});

const Blog = mongoose.model('blogs', BlogsSchema);

module.exports = Blog;
