const jwt = require("jsonwebtoken");

const isAuth = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({msg: "Token not found"});
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(400).json({msg: "User does not exist"});
        }

        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.log("Error in isAuth middleware", error);
        return res.status(401).json({msg: "Invalid token"})
    }
}

module.exports = isAuth;