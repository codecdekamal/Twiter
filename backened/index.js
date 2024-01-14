const express = require("express");
require("dotenv").config();
const path = require("path");
const connect = require("./db/connect");
const authRouter = require("./router/authenication");
const userRouter = require("./router/Users");
const tweetRouter = require("./router/tweet")
const authMiddleware = require("./middleware/authentication")
const multer = require("multer");
const cors =  require("cors")
const app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
const PORT = process.env.MY_PORT || 3000;
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage })
app.use("/api/auth",authRouter);
app.use("/api/user",[authMiddleware,upload.single('photos')],userRouter);
app.use("/api/tweet",[authMiddleware,upload.single('photos')],tweetRouter)
const start = async () =>{
    try {
         await connect(process.env.MY_MONGODB_URL);
       //  await User.deleteMany({})
        app.listen(PORT,()=>{
            console.log(`Your Server is running at port ${PORT}....`)
        })
    } catch (error) {
        console.log(error.message)
    }
}
start();