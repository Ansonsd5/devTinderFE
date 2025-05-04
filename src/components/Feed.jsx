import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant/urls";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigator = useNavigate();

  const dispatch = useDispatch();
  console.log("feed from sytore", feed);
  const getFeed = async () => {
    try {
      if (feed) return;
      const userFeed = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log("getFeed", userFeed?.data?.feedData);
      dispatch(addUserFeed(userFeed?.data?.feedData));
    } catch (error) {
      console.error("FE ERROR :: " + error);

      return navigator("/error");
    }
  };

  useEffect(() => {
    getFeed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>ALL feed</h1>
      <div className="grid grid-cols-2 gap-4">
      {feed && <FeedCard user={feed[0]} />}

      </div>
    </div>
  );
};

export default Feed;
