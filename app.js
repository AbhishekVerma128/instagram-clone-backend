const express = require("express");
const cors = require("cors");
const connection = require("./connection/conn")
const auth = require("./routes/auth")
const signin = require("./routes/signin")
const createpost = require("./routes/createPost")
const myprofile = require("./routes/profile")
const like_unlike = require("./routes/likes")
const comment = require("./routes/comments")
const delete_Comment = require("./routes/delete");
const userProfile = require("./routes/profileDisplay")
const follow_unfollow = require("./routes/followSection")
const unfollow = require("./routes/unfollow")
const app = express();
app.use(cors());
connection();
app.use(express.json());
app.use(auth)
app.use(signin)
app.use(createpost)
app.use(myprofile)
app.use(like_unlike)
app.use(comment)
app.use(delete_Comment)
app.use(userProfile)
app.use(follow_unfollow)
app.use(unfollow)
app.listen(5000,()=>{
    console.log("server is running at port no 5000")
})