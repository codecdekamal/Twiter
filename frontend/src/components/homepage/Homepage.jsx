import React, { useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getUserDetail } from "../../feature/userContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTweetDetail } from "../../feature/tweet";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Tweet from "../tweet/tweet";
import "./homepage.css";
import TweetModal from "../Modals/TweetModal";
const Homepage = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id")
  console.log(id)
  const [allTweets,setAllTweets] = useState([])
  const [showModal, setShowModal] = useState(false);
  let token = useSelector((store) => store.auth.token);
  const gettingAllTweets =  async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/api/tweet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllTweets([...resp.data.allTweets])
      dispatch(getTweetDetail([...resp.data.allTweets]))
      const resp2 = await axios.get(`http://localhost:5000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserDetail(resp2.data.data))
      console.log(resp2)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    gettingAllTweets();
  }, []);
  const onPostSuccess = () =>{
    gettingAllTweets();
  }
  const onShowHandler = () =>{
     setShowModal(true)
  }
  const onCloseModalHandler = () =>{
    setShowModal(false)
 }
  if (token === "") {
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <>
      <div className="bg-black/95 min-h-screen min-w-fit outerLayout text-white/70 ">
        <Sidebar id={id} allTweet= {allTweets} showTweetModal ={onShowHandler} />
        <div className="w-60 md:w-[100%] border-x-[1px] border-gray-400 text-white relative overflow-hidden flex justify-center ">
          <Header />
          <div className="mt-14 w-[100%]">
            {
              allTweets.map((tweet,i) => {
                let {_id,tweetedBy,content,createdAt,image,likes,replies,retweetBy,updatedAt} = tweet
                return <Tweet allTweet = {allTweets} onPostSuccess={onPostSuccess} key={_id} tweetdetails = { {_id,tweetedBy,i,content,createdAt,image,likes,replies,retweetBy,updatedAt}}/>
              })
            }
          </div>
        </div>
      {showModal && <div className="fixed translate-x-1/2 md:left-1/3 md:translate-x-0 md:ml-12">
          <TweetModal heading = "what's happening?"  onPostSuccess = {onPostSuccess} onClose={onCloseModalHandler}/>
        </div>}
      </div>
    </>
  );
};

export default Homepage;
