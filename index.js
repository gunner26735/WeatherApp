const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

// to log request 
app.use(morgan("tiny"));

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.raw({inflate:true, limit: '100kb', type: 'application/json'}));

// set view engine
app.set("view engine","ejs");

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

// load router
app.use('/',require('./server/routes/router'));

app.listen(3000,()=>{console.log(`Server is running on http://localhost:${3000}`);})