const express = require('express');
const requirelogin = require('../middleware/requireLogin');
const router = express.Router();
const user = require('../model/userSchema')
const mypost = require('../model/postSchema');

router.put('/unfollow', requirelogin, (req, res) => {
    // const userId=req.params.id
    console.log(req.body.followId)
    user.findByIdAndUpdate(req.body.followId, {
        $pull:{ followers: req.user._id }
    }, { new: true }, (err, result) => {
        if (err) {
            return res.status(404).json({
                status: "failure",
                error: "user not found"
            })
        }
        user.findByIdAndUpdate(req.user._id, {
            $pull:{ following: req.body.followId }
        }, { new: true }).then(result =>
            // console.log(result),
            res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    })
})

module.exports = router