const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")
const postmodel = require("../model/postSchema");

router.delete('/delete/:postId', requireLogin, async(req,res)=>{
  try{
   const data = await postmodel.findOne({id:req.params.postId}).populate("postedBy", "_id")
   if(!data){
       return res.json(422).json({
           status: "failure",
           error: "comment not available"
       })
   }
   else{
    if(data.postedBy._id.toString()===req.user._id.toString()){
     data.remove();
     return res.status(200).json({
      message:"post deleted successully"
     })
    }
       
   }
  }
  catch(e){
   res.status(422).json({
       status: "failure",
       error: e.error
   })
  }
})
module.exports = router