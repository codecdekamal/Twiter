const User = require("../models/User");
const Tweet = require("../models/Tweet")
const { StatusCodes } = require("http-status-codes");
const getUserDetail = (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .populate("followers", ["name", "username", "email", "_id"])
    .then((data) => {
      res.status(StatusCodes.OK).json({ data: data });
    })
    .catch((err) => {
      res.status(StatusCodes.NOT_FOUND).json({ err: err.message });
    });
};
const followUser = async (req, res) => {
  // when user trigger this url
  // loggedInUsers ke following main params wali id ko add kr do.
  console.log(req.params);

  try {
    const loggedInUser = req.user.userID;
    const paramsId = req.params.id;
    const addToLogInUser = await User.findByIdAndUpdate(
      { _id: loggedInUser },
      { $push: { following: paramsId } }
    ); 
    if (addToLogInUser) {
       await User.findByIdAndUpdate(
        { _id: paramsId },
        { $push: { followers: loggedInUser } }
      );
      return res.status(StatusCodes.OK).json({ success: true });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Succesful" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const loggedInUser = req.user.userID;
    const paramsID = req.params.id;
    const unFollowingparamsID = await User.findByIdAndUpdate(
      { _id: loggedInUser },
      { $pull: { following: paramsID } }
    );
    console.log(unFollowingparamsID);
    if (!unFollowingparamsID) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: unFollowingparamsID });
    }
    const rmFromParamsIdFollower = await User.findByIdAndUpdate(
      { _id: paramsID },
      { $pull: { followers: loggedInUser } }
    );
    res.status(StatusCodes.OK).json({ unFollowingparamsID });
  } catch (error) {
    console.log(error.message);
  }
};
const editUserDetails = async (req, res) => {
    try {
      console.log(req.params.id)
      const loggedInUser = req.user.userID;
      if(req.params.id === loggedInUser){
        const { dob, location, name } = req.body;
        if (dob) {
          await User.findByIdAndUpdate(req.params.id, { dob });
        } 
         if (location) {
          await User.findByIdAndUpdate(req.params.id, { location });
        } 
         if (name) {
          await User.findByIdAndUpdate(req.params.id, { name });
        } 
        return res.status(StatusCodes.OK).json({msg:"success"})
      } 
    } catch (error) {
      console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:error.message})
    }
};
const tweetsByUser = async (req, res) => {
  try {
    const allTweets = await Tweet.find({}).populate([{path:"replies"}]);
    const filteredTweets =   allTweets.filter((tweet)=>tweet.tweetedBy.toString()===req.params.id);
    console.log(filteredTweets)
    function newArr (){
      for (let i = 0; i < filteredTweets.length; i++) {
        for (let j = 0; j < filteredTweets[i].replies.length; j++) {
             for (let z = 0; z < filteredTweets.length; z++) {
                if(filteredTweets[z]._id.toString() === filteredTweets[i].replies[j]._id.toString()){
                  filteredTweets.splice(z, 1);
                }
             }            
        }
    }
    return filteredTweets;
    }
     const afterRemovingRepliedTweets =  newArr()
    res.status(StatusCodes.OK).json({data:afterRemovingRepliedTweets});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
  }
};

const UploadProfilePicture = async (req, res) => {
   try {
    const loggedInUser = req.user.userID;
       console.log(loggedInUser)
       console.log( req.user.userID)
       console.log(req.file)
    if(req.params.id === loggedInUser){
      if (!req.file) { 
        return res.status(StatusCodes.BAD_REQUEST).send({msg:"Nothing is found in req.file"})
      }
      const {path} = req.file;
      console.log(path)
      const updatingProfile = await User.findByIdAndUpdate({_id:loggedInUser,},{profile_picture:path})
      console.log(updatingProfile)
      return res.status(StatusCodes.OK).json({msg:"success"})
    } 
   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})

   }
};

module.exports = {
  UploadProfilePicture,
  editUserDetails,
  unfollowUser,
  followUser,
  getUserDetail,
  tweetsByUser
};
