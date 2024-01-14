const mongoose = require("mongoose")
const connect = async (url)=>{
    try {
        if(await mongoose.connect(url)){
            console.log("DB connected")
        }
    } catch (error) {
     console.log(error.message)  
    }
}
module.exports = connect;