const express =require("express");
const router = express.Router();
const {tweetContent,tweetLike,dislike, reply,tweetDetail,deleteTweet,allTweetsDetails,retweet} = require("../controllers/tweet")
router.route("/").post(tweetContent).get(allTweetsDetails)
router.route("/:id/like").post(tweetLike)
router.route("/:id/dislike").post(dislike)
router.route("/:id/reply").post(reply)
router.route("/:id").get(tweetDetail).delete(deleteTweet)
router.route("/:id/retweet").post(retweet)
module.exports = router;
