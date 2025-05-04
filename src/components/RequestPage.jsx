import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant/urls";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const RequestPage = () => {
  const dispatch = useDispatch();
  const reviewRequest = useSelector((store) => store.request);
  const getAllReviewRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    console.log(" getAllReviewRequest", res);
    dispatch(addRequest(res.data.data));
  };

  
  useEffect(() => {
    
    getAllReviewRequest();
  }, []);
  return (
    <div >
      <h1 className="flex justify-center">Review all requests</h1>
      <div className="flex flex-col gap-[16px]">
        {reviewRequest?.length === 0 ? "No Request  Found " : <>
        <h1>Make a list all request from others to you</h1>
        {
          // console.log("DATA",reviewRequest)
          reviewRequest && reviewRequest?.map((req,key) => <article key={key}>
            {console.log("inside map",req)}
              {req && <RequestCard from={req?.fromUserId}/>}
            </article>
          )
        }
        </>}
      </div>
    </div>
  );
};

export default RequestPage;
