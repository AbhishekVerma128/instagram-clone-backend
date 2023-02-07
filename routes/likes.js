const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")
const postmodel = require("../model/postSchema")


// to update the like field
router.put('/likes', requireLogin, async(req,res)=>{
    try{
        const likes = await postmodel.findByIdAndUpdate(req.body.postId,{
            $push:{likes: req.user._id}
        }, {new: true}).populate("postedBy","_id name")
        //console.log(likes);
            return res.status(200).json({
                status: "success",
                likes
            })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            error: e.error
        })
    }
})
// unlike
router.put('/unlike', requireLogin, async(req,res)=>{
    try{
        const likes = await postmodel.findByIdAndUpdate(req.body.postId,{
            $pull:{likes: req.user._id}
        }, {new: true}).populate("postedBy","_id name")
            return res.status(200).json({
                status: "success",
                likes
            })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            error: e.error
        })
    }
})
module.exports = router;