const { StatusCodes } = require("http-status-codes");
const Tweet = require("../models/Tweet");
const tweetContent = async (req, res) => {
  console.log(req.file)
  try {
    req.body.tweetedBy = req.user.userID;
    if (req.file) {
      req.body.image = req.file.path;
      console.log(req.file.path)
    }
    if (!req.body) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ data: { msg: "Please provide some text " } });
    }
    const tweet = await Tweet.create(req.body);
    res.status(StatusCodes.CREATED).json({ tweet });
  } catch (error) {
    console.log(error.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
const tweetLike = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const personWhoLiked = req.user.userID;
    const tweet = await Tweet.findOne({ _id: id });
    console.log(tweet);
    const userAlreadyLiked = tweet.likes.find((item) => item == personWhoLiked);
    console.log(userAlreadyLiked);
    if (!userAlreadyLiked || userAlreadyLiked === null) {
      const pushingUserToArray = await Tweet.findByIdAndUpdate(
        { _id: id },
        { $push: { likes: personWhoLiked } }
      );
      return res.status(StatusCodes.OK).json({ pushingUserToArray });
    }
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "user has liked already liked it" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};
const dislike = async (req, res) => {
  try {
    const { id: personwhoTweetedID } = req.params;
    const userID = req.user.userID; // userId
    const tweet = await Tweet.findById({ _id: personwhoTweetedID });
    const checkingUserId = tweet.likes.find((id) => id === userID);
    console.log(checkingUserId);
    if (!checkingUserId || checkingUserId === null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "the person has'nt liked the tweet" });
    }
    const removingUserId = await Tweet.findByIdAndUpdate(
      { _id: personwhoTweetedID },
      { $pull: { likes: userID } }
    );
    res.status(StatusCodes.OK).json({ removingUserId });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

const reply = async (req, res) => {
  try {
    const { id: parentTweetID } = req.params;
    console.log(parentTweetID)
    req.body.tweetedBy = req.user.userID;
    const replyingID = req.user.userID;
    if (req.file) {
      req.body.image = req.file.path;
    }
    const tweet = await Tweet.create(req.body);
    const tweetId = tweet._id;
    const updatingParentTweet = await Tweet.findByIdAndUpdate(
      { _id: parentTweetID },
      { $push: { replies: tweetId } }
    );
    const parentTweet = await Tweet.findOne({ _id: parentTweetID });
    res.status(StatusCodes.OK).json(parentTweet);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
const tweetDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById({ _id: id }).select("-password");
    // we have done this because it was  throwing error as initialy there were no  values
    await tweet.populate([
      { path: "tweetedBy", strictPopulate: false, select: "-password" },
    ]);
    await tweet.populate([
      { path: "likes", strictPopulate: false, select: "-password" },
    ]);
    await tweet.populate([
      { path: "retweetBy", strictPopulate: false, select: "-password" },
    ]);
    await tweet.populate([
      {
        path: "likes",
        populate: { path: "following", select: "-password" },
        strictPopulate: false,
        select: "-password",
      },
    ]); // followers and likes and throwing null
    res.status(StatusCodes.OK).json({ data: [tweet] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const allTweetsDetails = async (req, res) => {
  try {
  const allTweets =   await Tweet.find({}).populate({ path: "tweetedBy",  select: "-password" });
    //  await allTweets.populate([
    //   { path: "tweetedBy", strictPopulate: false, select: "-password" },
    // ]);
  //    allTweets.map(async(tweet)=>{
  // //   await tweet.populate([
  // //   {path:"tweetedBy",populate:{path:"following",strictPopulate:false,select:"-password"},select:"-password",strictPopulate:false},
  // //   {path:"likes",select:"-password",strictPopulate:false},
  // //   {path:"likes",populate:{path:"following",select:"-password",strictPopulate:false},strictPopulate:false,select:"-password"},
  // //   {path:"retweetBy",select:"-password",strictPopulate:false},
  // // ])})
  return  res.status(StatusCodes.OK).json({allTweets})
  } catch (error) {
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
  }

};
const deleteTweet = async (req, res) => {
  // id coming from this url is basically id of tweet
  try {
    const { id } = req.params;
    const { tweetedBy } = await Tweet.findById({ _id: id });
    console.log(tweetedBy)
    if(!tweetedBy){
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Bad request" });
    }
    console.log(tweetedBy.toString(), req.user.userID);
    if (tweetedBy.toString() !== req.user.userID) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You can't delete this tweet" });
    }
    await Tweet.findOneAndRemove({ _id: id });
    return res.status(StatusCodes.OK).json({ msg: "Tweet has been deleted." });

  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
const retweet = async (req,res)=>{
    try {
        const {id} = req.params;
        const {userID} = req.user;
        const tweet = await Tweet.findById({_id:id});
       const existingUser = tweet.retweetBy.find((id)=>{
         return id === userID
       });
       if(!existingUser){
        await Tweet.findByIdAndUpdate({_id:id},{$push:{retweetBy:userID}})
        return res.status(StatusCodes.OK).json({msg:"successful"})
       }
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"error"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
  
}

module.exports = {
  tweetContent,
  tweetLike,
  dislike,
  reply,
  tweetDetail,
  allTweetsDetails,
  deleteTweet,
  retweet
};
