import axios from "axios";
import React from "react";
import { BASE_URL } from "../constant/urls";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const dispacth = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  console.log("inside cards", skills);

  const handleStatus = async (id, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("REQUEST res", res);
      if (res.status === 201) {
        dispacth(removeUserFeed(id));
      }
    } catch (err) {
      console.log("error", err);
    }
  };

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
          onClick={() => handleStatus(_id, "ignored")}
        >
          Ignore
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleStatus(_id, "interested")}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
