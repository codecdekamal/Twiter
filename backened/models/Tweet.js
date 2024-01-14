const mongoose = require("mongoose");
const User = require("../models/User");
const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      maxlength: 1000,
      required: [true, "Please provide name"],
    },

    tweetedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweetBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: {
      type: String,
    },
    replies: [{type:mongoose.Schema.Types.ObjectId,ref:"Tweet"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetSchema);
