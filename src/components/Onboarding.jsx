import React from "react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="flex flex-col">
      <Link className="btn-primary" to={"/login"}>Login</Link>
      <Link className="btn-primary" to={"/signup"}>Signup</Link>
    </div>
  );
};

export default Onboarding;
