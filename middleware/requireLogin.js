const jwt = require("jsonwebtoken")
const {jwtToken} = require("../key")
const user = require("../model/userSchema")

module.exports = async (req, res,next)=>{
    const {authorization} = req.headers;

    // console.log(req.headers);
    if(!authorization){
        return res.status(401).json({error:"you must have login"})
    }
    const token = authorization.replace("Bearer ", "");

    // console.log(token);
    
    await jwt.verify(token, jwtToken,  async (err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must have login"})
        }
        const {_id}= payload;
        const userdata = await user.findById(_id);
        if(userdata){
            // console.log(userdata);
            req.user = userdata
        }
    })
    next()
}