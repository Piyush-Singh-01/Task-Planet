const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/Token.js");

const SignUp = async(req, res)=>{
    try {
        const {username, email, password} = req.body;
        
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg: "User already exist"});
        }

        if(password.length < 6){
            return res.status(400).json({msg: "Password must be atleast 6 character"})
        }
        const hash_password = await bcrypt.hash(password, 10);
        const userCreated = await User.create({username, email, password:hash_password});

        const token = await genToken(userCreated._id);
        const user = await User.findById(userCreated._id).select("-password");
        res.cookie("token", token,{
            secure: true,
            sameSite:"None",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })
      
      return res.status(200).json({
         msg: "User Registered Successfully",
         user
      })

   } catch (error) {
      console.log("Error from Signup", error);
      return res.status(500).json({msg: "Signup Server Error"});
   }
}

const Login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({msg: "Invalid email or password"});
        }
        const isValid = await bcrypt.compare(password, userExist.password);
         if(!isValid){
      return res.status(400).json({msg: "Invalid Email or Password"});
   }
   
   const token = await genToken(userExist._id);

   const user = await User.findById(userExist._id).select("-password");
    res.cookie("token", token,{
        secure: true,
        sameSite:"None",
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    })

    return res.status(200).json({
        msg: "Login Successfully",
        user
    })

    }catch (error) {
        console.log("Error from Login", error);
        return res.status(500).json({msg: "Login Server Error"});
    }
   
}

const Logout = async(req, res)=>{
    try {
        res.clearCookie("token", {
        secure: true,
        sameSite: "None",
        httpOnly: true,
    });
        return res.status(200).json({msg: "Logout Successfully"});
    } catch (error) {
        console.log("Logout error", error);
        return res.status(500).json({msg: "Logout error"});
    }
}

module.exports = {SignUp, Login, Logout}

