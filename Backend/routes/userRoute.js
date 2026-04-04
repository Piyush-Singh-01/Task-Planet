const express = require("express");
const isAuth = require("../middleware/isAuth");
const getCurrentUser = require("../controller/userController");

const route = express.Router();

route.get("/getcurrentuser",isAuth, getCurrentUser);

module.exports = route;
 
