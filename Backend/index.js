require("dotenv").config()
const express = require("express");
const cors = require("cors");
const DBConnection = require("./utils/DBConnection");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const userRouter  = require("./routes/userRoute");
// app.set("trust proxy", 1);  // 🔥 ADD THIS LINE

app.use(cors({
    origin: "https://task-planet-pi.vercel.app",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    DBConnection();
    console.log(`server is running on the port ${PORT}`);
})
