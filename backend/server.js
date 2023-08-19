const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectToMongo = require('./db');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Connect to MongoDB using async/await
(async () => {
    try {
        await connectToMongo();
        console.log('Connected to MongoDB');
        
        app.get('/', (req, res) => {
            res.send('Hello');
        });
        app.use(express.json());

        app.use('/blog', require('./routes/blog'));
        app.use('/user', require('./routes/user'));

        app.listen(port, () => {
            console.log(`Node server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();
