const express = require('express');
const cors = require('cors');
const db  = require('./BasesDeDonnees/BD');
const routes = require('./Routes/Route');
require('dotenv').config();

db.connection();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(routes);

app.listen(8000, ()=>(
    console.log(`http://localhost:${port}`)
))
