const express = require('express');
const route = express.Router();

route.get("/",(req,res)=>{
    res.send("BASIC CRUD");
})

module.exports = route