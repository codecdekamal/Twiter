const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes")
require("dotenv").config();
const authMiddleware = async (req,res,next) =>{
     try {
        const auth = req.headers['authorization'];
        if(!auth || !auth.includes("Bearer ")){
           return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You are UNAUTHORIZED "})
        }
        const token = auth.replace("Bearer ","")
        const decoded =  jwt.verify(token,process.env.MY_PRIVATE_KEY);
        req.user = decoded;
        next()
     } catch (error) {
      console.log(error)
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }

}
module.exports = authMiddleware;