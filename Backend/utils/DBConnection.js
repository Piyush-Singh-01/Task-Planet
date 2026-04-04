const mongoose = require("mongoose");

const DBConnection = async(req, res)=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL);
       console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed",error)
    }

}

module.exports = DBConnection;