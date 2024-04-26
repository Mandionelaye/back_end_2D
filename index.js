const express = require('express');
const db  = require('./BasesDeDonnees/BD');
const routes = require('./Routes/Route');
require('dotenv').config();

db.connection();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(routes);

app.listen(8000, ()=>(
    console.log(`http://localhost:${port}`)
))
