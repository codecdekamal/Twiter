import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePageTweets from "../tweet/ProfilePageTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Content = (props) => {
  const [allTweets, setAllTweets] = useState([]);
  let { userID } = useParams();
  console.log(userID);
  let token = useSelector((store) => store.auth.token);
  const [follow, setFollow] = useState(false);
  const loggenInUserId = localStorage.getItem("id");
  console.log(loggenInUserId);
  const [tweets, setTweets] = useState({});
  const [date, setDate] = useState({ join: "", dob: "" });
  const gettingAllUserData = async () => {
    const resp = await axios.get(`http://localhost:5000/api/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resp2 = await axios.get(
      `http://localhost:5000/api/user/${userID}/tweet`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(resp2);
    setTweets(resp.data.data);
    setAllTweets(resp2.data.data);
    const dateString1 = resp.data.data.createdAt;
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObject1 = new Date(dateString1);
    const formattedDate1 = new Intl.DateTimeFormat("en-US", options).format(
      dateObject1
    );
    const followOrUnfollow = resp.data.data.followers.find(
      (id) => id._id === loggenInUserId
    );
    if (followOrUnfollow) {
      setFollow(true);
    }
    console.log();
    if (resp.data.data.dob) {
      const dateString2 = resp.data.data.dob;
      const dateObject2 = new Date(dateString2);
      const formattedDate2 = new Intl.DateTimeFormat("en-US", options).format(
        dateObject2
      );
      setDate((prev) => ({
        ...prev,
        join: formattedDate1,
        dob: formattedDate2,
      }));
    }
    setDate((prev) => ({ ...prev, join: formattedDate1 }));
  };
  const onSubmittingFollowing = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.patch(
        `http://localhost:5000/api/user/${userID}/${
          follow ? "unfollow" : "follow"
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      setFollow(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettingAllUserData();
  }, [props.onClose]); // onSubmittingFollowing
  return (
    <div>
      <div id={tweets._id} className="flex flex-col h-screen  relative">
        <div className="blue h-32 w-[100%] bg-blue-500 "></div>
        <div
          id="profile"
          className="w-28 h-30  relative  md:left-5 bottom-10  flex flex-col justify-center text-center text-capitalize font-sans font-semibold items-center "
        >
          <img
            className="md:w-28 md:h-28 w-24 h-24 bg-black rounded-full  "
            src={`http://localhost:5000/${tweets.profile_picture}`}
            alt=""
          />
          <p className="capitalize font-sans font-bold text-start md:text-center">
            {tweets.name}
          </p>
          <span className="lowercase font-sans mt-2 text-start md:text-center">
            @{tweets.username}
          </span>
        </div>
        <div
          id="about"
          className="flex justify-between w-[100%] relative tracking-wide"
        >
          <div className="ml-2 mt-32 grid grid-cols-2 gap-x-9  w-80 md:w-[38%] relative bottom-36">
            <div className="">
              <FontAwesomeIcon icon={faClock} />
              <span>{date.join}</span>
            </div>
            <div className=" pl-2">
              <FontAwesomeIcon icon={faLocation} />
              <span> {tweets.location && tweets.location}</span>
            </div>
            <div className="mt-2">
              <FontAwesomeIcon icon={faTurnDown} />
              <span className="">{date.dob}</span>
            </div>
          </div>
          <div className="mt-2 justify-center h-fit w-fit md:mr-2 mr-1 relative bottom-36 ">
            {loggenInUserId === userID && (
              <button
                onClick={props.onOpeningUpload}
                className="w-fit text-blue-800 border border-blue-600 md:p-1 mb-1 rounded-md "
              >
                upload profile page
              </button>
            )}
            {loggenInUserId === userID && (
              <button
                onClick={props.onClick}
                className="w-fit text-blue-800 text-capitalize border border-blue-600 p-1 rounded-md md:ml-1 ml-8"
              >
                Edit{" "}
              </button>
            )}
            {loggenInUserId !== userID && (
              <form action="" onSubmit={onSubmittingFollowing}>
                <button className="w-fit text-blue-800 capitalize border border-blue-600 p-1 rounded-md ">
                  {follow ? "unfollow" : "follow"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div
          id="about"
          className="mt-2 flex  md:w-[33%] relative  left-2  bottom-36 font-normal"
        >
          <div className="">
            {" "}
            {tweets.followers && tweets.followers.length} followers
          </div>
          <div className="ml-2">
            {tweets.following && tweets.following.length} following
          </div>
        </div>
        <div className="font-bold text-xl text-center mt-5 tracking-wide border-b border-gray-500 relative bottom-32">
          Tweets and Replies
        </div>
      </div>
      <div id="tweet" className="flex flex-col mt-[-24%]">
        {allTweets.map((tweet, i) => {
          let {
            _id,
            tweetedBy,
            content,
            createdAt,
            image,
            likes,
            replies,
            retweetBy,
            updatedAt,
          } = tweet;
          return (
            <>
              <ProfilePageTweets
                allTweet={allTweets}
                key={_id}
                tweetdetails={{
                  _id,
                  tweetedBy,
                  i,
                  content,
                  createdAt,
                  image,
                  likes,
                  replies,
                  retweetBy,
                  updatedAt,
                }}
              />
              {replies !== null ? (
                <>
                  {replies.map((reply, i) => {
                    let {
                      _id,
                      tweetedBy,
                      content,
                      createdAt,
                      image,
                      likes,
                      replies,
                      retweetBy,
                      updatedAt,
                    } = reply;
                    return (
                      <>
                        <h3 className="flex self-start px-3 font-thin">
                          Reply
                        </h3>
                        <ProfilePageTweets
                          allTweet={allTweets}
                          key={_id}
                          tweetdetails={{
                            _id,
                            tweetedBy,
                            i,
                            content,
                            createdAt,
                            image,
                            likes,
                            replies,
                            retweetBy,
                            updatedAt,
                          }}
                        />
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
