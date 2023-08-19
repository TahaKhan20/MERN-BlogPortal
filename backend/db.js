const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Taha_Khan:M.tahakhan12@cluster0.t8ullo0.mongodb.net/Blogs";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
};

module.exports = connectToMongo;
