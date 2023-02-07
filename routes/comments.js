const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")
const postmodel = require("../model/postSchema")
//comments

router.put('/comment', requireLogin, async(req,res)=>{
    try{
        const comment = {
            comment: req.body.text,
            postedBy: req.user._id
        }
        // console.log(comment)
         const newComment = await postmodel.findByIdAndUpdate(req.body.postId, {
            $push : {comments : comment}
         }, {new: true}).populate("comments.postedBy", "_id name")
         .populate("postedBy", "_id name")
        //  console.log(newComment)
         return res.status(200).json({
            status:"success",
            newComment
         }
         )
    }
    catch(e){
        res.status(422).json({
            status:'failure',
            error : e.error
        })
    }
})
module.exports = router









