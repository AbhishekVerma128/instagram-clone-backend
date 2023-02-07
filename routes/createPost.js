const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")
const postmodel = require("../model/postSchema")

// for fetching data
router.get("/allposts",requireLogin,async (req,res)=>{
    try{
        const data = await postmodel.find().populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name").sort("-createdAt")
        //console.log(data);
        //const allpost= data.populate("postedBy", "_id name")
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

//
router.post("/createpost",requireLogin, async (req,res)=>{
    try{
        const {caption,pic}= req.body;
        if(!pic){
            return res.status(422).json({error: "add image"})
        }
        req.user
        const data = await postmodel.create({
            caption,
            photo:pic,
            postedBy:req.user
            
        })
        return res.json({
            status: "success",
            message: "posted successfully",
            data
        })
    }catch(e){
        return res.json({
            status: "failure",
            error: e.message,
        })
    }
    

    })
module.exports = router;