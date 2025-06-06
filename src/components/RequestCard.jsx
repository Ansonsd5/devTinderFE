import axios from "axios";
import React from "react";
import { BASE_URL } from "../constant/urls";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = (fromData) => {
  const dispatch = useDispatch();
  const { photoUrl, _id, firstName, about } =fromData.from;
  const rejected = "rejected";
  const accepted = "accepted";

  const handleConnection = async (id, action) => {
      let reqStatus = (action === accepted) ? accepted : rejected;
      try {
        const res =await axios.post(`${BASE_URL}/request/review/${reqStatus}/${id}`,{},{withCredentials:true});
        console.log("res",res)
        dispatch(removeRequest(id));
      } catch (error) {
        console.error(error);
      }
    
  };

  
  return (
    <div className="card bg-neutral text-neutral-content w-72" key={_id}>
      <div className="p-4">
        <div className="flex  items-center text-center">
        <img className="h-8 w-8 rounded" src={photoUrl} alt={`${firstName}-photo`} />
        <div className="card-title capitalize ml-4">{firstName}</div>
        
        </div>
        <p>{about}</p>
         <div className="card-actions justify-between flex-1/2">
          <button
            className="btn btn-secondary"
            onClick={() => handleConnection(fromData.reqID, rejected)}
          >
            Reject
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleConnection(fromData.reqID, accepted)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
