const express = require("express");
const { SignUp, Login, Logout } = require("../controllers/authController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout)


module.exports =  router;
