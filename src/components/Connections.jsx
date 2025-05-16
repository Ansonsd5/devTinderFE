import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant/urls";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log("Res Connections", res);
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className=" w-[70%]">
      <h1 className="flex justify-center">Connections</h1>
      <div className="">
        {connections?.length === 0 ? (
          "No Connections Found"
        ) : (
          <>
            {connections &&
              connections.map((connection) => {
                return <>{connection && <ConnectionCard {...connection} />}</>;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Connections;
