const express = require("express");
const router = express.Router();

//import all controllers
const {createComment} = require("../controller/Commentcontroller");
const {createPost,getPost} = require("../controller/Postcontroller");
const {likePost,unlikepost} = require("../controller/Likecontroller");

//create mapping between controller and routes
router.post("/comment/create",createComment);
router.post("/create/post",createPost);
router.get("/get/post",getPost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikepost);

//export
module.exports = router;