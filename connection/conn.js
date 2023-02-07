const mongoose = require('mongoose');
const {keys} = require("../key")
const dbconnection = async ()=>{
    await mongoose.connect(keys)
     .then(() => console.log('Connected to database!'));
 }

 module.exports= dbconnection;