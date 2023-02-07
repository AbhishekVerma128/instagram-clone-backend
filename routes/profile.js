const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")
const postmodel = require("../model/postSchema")
const user = require("../model/userSchema")

router.get("/myprofile",requireLogin,async (req,res)=>{

try{
    const data = await postmodel.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .populate("comments.postedBy", "_id name").sort("-createdAt")
   return res.status(200).json({
        status: "success",
        data
    })
   }
   catch(e){
    res.status(422).json({
        status: "failure",
        error: e.error,
    })
   }
})

// update profile pic

router.put("/updateProfilePic",requireLogin,(req,res)=>{
    user.findByIdAndUpdate(req.user._id,{
        $set:{Photo:req.body.pic}
    }, {new: true}).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            return res.json(result)
        }
    })

} )
module.exports = router