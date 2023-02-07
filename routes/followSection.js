const express = require('express');
const requirelogin = require('../middleware/requireLogin');
const router = express.Router();
const user = require('../model/userSchema')
const mypost = require('../model/postSchema');
router.use(express.json());
// to follow user
// router.put("/follow", requirelogin, (req, res) => {
//     user.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         user.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => {
//             res.json(result)

//         })
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })


// follower and following user
router.put('/follow', requirelogin, (req, res) => {
    // console.log(req.body.followId)
    user.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, { new: true }, (err, result) => {
        if (err) {
            return res.status(404).json({
                status: "failure",
                error: "user not found"
            })
        }
        user.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).then(result =>
            // console.log(result),
            res.json(result)).catch(err => { return res.status(422).json({ error: err }) })
    })
})


// to unfollow user
// router.put("/unfollow", requirelogin, (req, res) => {
//     user.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         user.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

//to show following user's posts 
router.get("/myfollowingpost", requirelogin,async (req,res)=>{
    try{
        const followingPost = await mypost.find({postedBy:{$in: req.user.following}})
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        // console.log(followingPost)
        res.status(200).json({
            status:"success",
            followingPost
        })
    }
    catch(e){
        res.status(422).json({
            status:"failure",
            error: e.error
        })

    }
    
})

module.exports = router