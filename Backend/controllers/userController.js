const  User = require('../model/UserModel')

const getCurrentUser = async(req,res)=>{
     try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({msg: "User Not Found"});
        }
        return res.status(200).json(user);
     } catch (error) {
        console.log("Error in User-controller", error);
        return res.status(500).json({msg: "Get current user error"});
     }
}

module.exports = getCurrentUser;
