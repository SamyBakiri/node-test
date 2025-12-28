const express = require('express');
const app = express();
const routes = require('./routes/api');
const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use('/api', routes);



const port = process.env.PORT;
app.listen(port, () =>{
    console.log("server running on port 3000");
});