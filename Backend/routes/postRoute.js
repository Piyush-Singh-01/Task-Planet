const express = require("express");
const { createPost, getPosts, likePost, commentPost } = require("../controllers/postController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", getPosts)
router.post("/createpost", isAuth, createPost)
router.post("/like/:id", isAuth, likePost)
router.post("/comment/:id", isAuth, commentPost);

module.exports = router;