const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name:{type:String, required: true},
    username:{type:String, required: true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    Photo:{type:String},
    followers:[{type:ObjectId, ref:"user"}],
    following:[{type:ObjectId, ref:"user"}]
})

const usermodel = mongoose.model("user", userSchema);
module.exports = usermodel;

