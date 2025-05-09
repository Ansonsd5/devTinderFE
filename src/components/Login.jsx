import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant/urls";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "firstname") setFirstName(value);
    else if (name === "lastname") setlastName(value);
  };

  const handleLogin = async (email, password) => {
    let URL = isLogin ? "login" : "signup";

    const payload = {
      emailId: email,
      password: password,
      ...(!isLogin && { firstName }),
      ...(!isLogin && { lastName }),
    };

    console.log("payload for signup", payload);

    try {
      const res = await axios.post(`${BASE_URL}/${URL}`, payload, {
        withCredentials: true,
      });

      if(res.status === 200) {
        console.log("ressssssssss signup")
        dispatch(addUser(res?.data));
       return navigate("/")
      }else{
        return navigate("/login");
      }
      // navigate("/")
      // console.log("Sign up response",res)
      // if(!isLogin && res?.status === 201){
      //   console.log("Should navigate from here")
      //   navigate("/login")
      // }

      // console.log("*******",res)

      // if (isLogin && res.status === 200) {
      //   dispatch(addUser(res?.data));
      //   return navigate("/");
      // } else {
      //   return navigate("/login");
      // }
    } catch (err) {
      console.error(`FE ERROR :: ${err}`);
    }
  };

  return (
    <div className="card card-border bg-base-200 w-96 mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title capitalize justify-center">
          {isLogin ? "Sign in to GitHub" : "Sign up to GitHub"}
        </h2>
        <div className="flex gap-4 flex-col">
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  name="firstname"
                  value={firstName}
                  className="input"
                  placeholder="Enter your first name"
                  onChange={(e) => handleInput(e)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  name="lastname"
                  value={lastName}
                  className="input"
                  placeholder="Enter your last name"
                  onChange={(e) => handleInput(e)}
                />
              </fieldset>{" "}
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email address</legend>
            <input
              type="email"
              name="email"
              value={email}
              className="input"
              placeholder="Enter your email"
              onChange={(e) => handleInput(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Password</legend>
            <input
              type="password"
              name="password"
              value={password}
              className="input"
              placeholder="Enter your password"
              onChange={(e) => handleInput(e)}
            />
          </fieldset>
        </div>

        <div className="card-actions justify-center pt-4">
          <button
            className="btn btn-primary "
            onClick={() => handleLogin(email, password)}
          >
           {isLogin ? "Login" : "Sign up"}
          </button>
        </div>
        <div className="p-4 text-center">
          New to DevTinder?{" "}
          <button
            className="text-primary cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
