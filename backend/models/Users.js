const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String
    },
    interests: {
        type: [String],
        required: true
    },
    liked: {
        type: [Number]
    }
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();
module.exports = User;