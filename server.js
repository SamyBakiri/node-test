const express = require('express');
const app = express();
const routes = require('./routes/api');
require('dotenv').config();


app.use(express.json());

app.use('/api', routes);


const port = process.env.PORT;
app.listen(port, () =>{
    console.log("server running on port 3000");
})