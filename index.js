const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();

// to log request 
app.use(morgan("tiny"));

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine
app.set("view engine","ejs");

// load router
app.use('/',require('./server/routes/router'));

app.listen(3000,()=>{console.log(`Server is running on http://localhost:${3000}`);})