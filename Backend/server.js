const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/api');
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use('/api', routes);



const port = process.env.PORT;
app.listen(port, () =>{
    console.log("server running on port 3000");
});