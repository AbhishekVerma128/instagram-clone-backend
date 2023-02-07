const express = require("express");
const User = require("../model/userSchema")
const bcryt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
})

router.post("/signup", async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(422).json({
                status: "failed",
                error: "enter all fileds"
            })
        }
        const user_email = await User.findOne({email})
        // check user is already exists or not
        if (user_email) {
            // 409 means duplicate request
            return res.status(422).json({
                status: "failed",
                error: "email already exist"
            });
        }
        const user_name = await User.findOne({username})
        // check user is already exists or not
        if (user_name) {
            // 409 means duplicate request
            return res.status(422).json({
                status: "failed",
                error: "username already exist"
            });
        }
       bcryt.hash(password,10,async (err,hashpass)=>{
        if(err){
            return res.status(500).json({
               status:"failed",
               error:err.message
              })
              
           }
            const data = await User.create({
                name,
                username,
                email,
                password:hashpass
            })
            return res.json({
                status: "success",
                message: "user created successfully",
                data
            })
        })
        
    }
    catch (e) {
        return res.status(500).json({
            status: "failed",
            error: e.message
        })

    }
})

module.exports = router;