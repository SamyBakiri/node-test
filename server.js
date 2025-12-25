const express = require('express');
const app = express();
const routes = require('./routes/api');
const sequelize = require('./config/db');
require('dotenv').config();


app.use(express.json());

app.use('/api', routes);


const port = process.env.PORT;
app.listen(port, () =>{
    console.log("server running on port 3000");
})


sequelize.authenticate()
  .then(() => console.log('DEATHMATIO - DB connected'))
  .catch(err => console.error('DEATHMATIO - DB connection error:', err));

// too lazy to deal with migrations
sequelize.sync({ force: true });

