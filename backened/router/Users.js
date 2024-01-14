const express = require("express");
const {UploadProfilePicture,editUserDetails,unfollowUser,followUser,getUserDetail,tweetsByUser} = require("../controllers/User")
const router = express.Router();
router.route("/:id").get(getUserDetail).patch(editUserDetails)
router.route("/:id/follow").patch(followUser)
router.route("/:id/unfollow").patch(unfollowUser)
router.route("/:id/tweet").get(tweetsByUser)
router.route("/:id/uploadProfilePic").post(UploadProfilePicture)
module.exports = router;

