import React from "react";

const ConnectionCard = (fromData) => {
    console.log("&&&&&&fromdata",fromData)
  const { photoUrl, _id, firstName, about } = fromData;
  ;

  return (
    <div className="card bg-neutral text-neutral-content w-72" key={_id}>
      <div className="p-4">
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
    </div>
  );
};

export default ConnectionCard;
