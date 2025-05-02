import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
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
            onClick={() => handleLogin(email, password)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
