const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/api');
require('dotenv').config();

// Configure CORS with explicit options
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api', routes);



const port = process.env.PORT;
app.listen(port, () => {
    console.log("server running on port 3000");
});