import React, { useEffect } from "react";
import Nav from "./Nav";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../constant/urls";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector(store =>store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      if (res) {
        dispatch(addUser(res.data));
      }
    } catch (error) {
      if (error.status === 401) {
        return navigate("/login");
      } else {
        console.error(`FE ERROR :: `, error);
        return navigate("/error");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="d-flex flex-col ">
      <Nav />
      <div className="h-[100vh] grid place-content-center">
      <Outlet />

      </div>
      <Footer/>
    </div>
  );
};

export default Body;
