import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = (fromData) => {
    console.log("&&&&&&fromdata",fromData)
  const { photoUrl, _id, firstName, about } = fromData;
  ;

  return (
    <div className="card bg-neutral text-neutral-content my-4 flex flex-row p-4 items-center" key={_id}>
      <div className="p-4 w-full">
        <div className="flex  items-center text-center">
          <img
            className="h-8 w-8 rounded"
            src={photoUrl}
            alt={`${firstName}-photo`}
          />
          <div className="card-title capitalize ml-4">{firstName}</div>
        </div>
        <p>{about}</p>
      </div>
      <Link to={`/chat/${_id}`}>
       <button className="p-4 btn btn-primary">chat</button>
      </Link>
    
    </div>
  );
};

export default ConnectionCard;
