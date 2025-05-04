import React from "react";

const FeedCard = ({user}) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about ,skills} = user;
  
  console.log("inside cards",skills)

  const handleInterested = (id) =>{
console.log("handleInterested",id)
  }

  const handleIgnore = () =>{
console.log("handleIgnore")
  }
  return (
    <div className="card bg-base-500 w-96 shadow-sm bg-black" id={_id}>
      <figure>
        <img className="rounded" src={photoUrl} alt={`${firstName}-photo`} />
      </figure>
      <div className="card-body">
        <h2 className="capitalize">
          {firstName} {lastName} ({age}) {gender}
        </h2>
        <p>{about}</p>
        {typeof skills === "object" &&
          skills?.map((skill) => {
            return <kbd className="kbd kbd-md">{skill}</kbd>;
          })}
      </div>
      <div className="grid grid-cols-2">
        {console.log("ID", _id)}
        <button
          className="btn btn-primary"
          id={_id}
          onClick={() => handleIgnore()}
        >
          Ignore
        </button>
        <button className="btn btn-secondary" onClick={handleInterested}>
          Interested
        </button>
      </div>
      
    </div>
  );
};

export default FeedCard;
