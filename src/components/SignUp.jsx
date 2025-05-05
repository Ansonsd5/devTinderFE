import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector(store => store.user);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "lastname") setLastName(value);
    else if (name === 'firstname') setFirstName(value);
  };

  const handleSignUp = async () => {
    
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        {
          emailId: email,
          password: password,
          firstName: firstName,
          lastName:lastName
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data));
      if(res.status === 201){
        return navigate("/login")
      }

      console.log("resss*****", res);
    } catch (err) {
      console.error(`FE ERROR :: ${err}`);
    }
  };

  

  return (
    <div className="card card-border bg-base-200 w-96 mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title capitalize justify-center">
          Login to account
        </h2>
        <div className="flex gap-4 flex-col">
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
              placeholder="Enter your email"
              onChange={(e) => handleInput(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
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
            onClick={() => handleSignUp()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
