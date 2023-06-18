const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const dbConnection = require('./config/dbConnection');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');

const app = express();

dbConnection();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port} 🚀`);
});