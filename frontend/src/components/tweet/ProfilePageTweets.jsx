import { faComment, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TweetModal from "../Modals/TweetModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProfilePageTweets = ({ tweetdetails, onPostSuccess, allTweet }) => {
  const [turningRed, setTurningRed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userID = localStorage.getItem("id");
  const onRemoving = async (e) => {
    console.log(e.target.id);
    try {
      const resp = await axios.delete(
        `http://localhost:5000/api/tweet/${e.target.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      onPostSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  const onRetweet = async (e) => {
    try {
      const resp = await axios.post(
        `http://localhost:5000/api/tweet/${tweetdetails._id}/retweet`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      onPostSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  const onLike = async () => {
    // console.log(tweetdetails._id)
    try {
      const resp = await axios.post(
        `http://localhost:5000/api/tweet/${tweetdetails._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.statusText === "OK") {
        setTurningRed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onReply = async () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <TweetModal
          url={`/${tweetdetails._id}/reply`}
          heading="Reply "
          onClose={onClose}
        />
      )}
      <div
        key={tweetdetails._id}
        className="border-b-[0.5px] mx-auto space-x-5 px-2 mt-16"
      >
        <div
          id="right"
          className="flex flex-col px-2 w-[232px] md:w-[90%]  lg:w-[500px]"
        >
          <div className="flex flex-row ">
           
            <div id="date " className="">
              <p></p>
            </div>
          </div>
          <div id="tweet" className="">
            <p> {tweetdetails.content}</p>
          </div>
          <div id="image">
            {tweetdetails.image && (
              <img
                src={`http://localhost:5000/${tweetdetails.image}`}
                alt=""
                className="rounded-2xl w-[200px] h-[200px] md:w-[100%]"
              />
            )}
          </div>
          <div id="buttons" className="flex flex-row justify-between ">
            <div id="comment" className="flex gap-1">
              <button onClick={onReply}>
                {" "}
                <FontAwesomeIcon icon={faComment} />
              </button>
              <p>{tweetdetails.replies.length}</p>
            </div>
            <div id="retweet" className="flex gap-[1px]">
              <button type="submit" onClick={onRetweet}>
                <FontAwesomeIcon icon={faRetweet} />
              </button>
              <p>{tweetdetails.retweetBy.length}</p>
            </div>
            <div className="flex pr-[1px]" id={tweetdetails._id}>
              <button onClick={onLike}>
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  id={tweetdetails._id}
                  className={turningRed ? "text-red-700" : "white"}
                />
              </button>
              <p>{tweetdetails.likes.length}</p>
            </div>
          </div>
        </div>
        <div onClick={onRemoving} id={tweetdetails._id}>
          <button className="">
            {tweetdetails.tweetedBy._id === userID && (
              <FontAwesomeIcon
                className="hover:text-blue"
                icon={faRemove}
                id={tweetdetails._id}
              ></FontAwesomeIcon>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePageTweets;
