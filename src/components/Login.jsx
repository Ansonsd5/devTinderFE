import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant/urls";
import { login, signUp } from "../config";
import Input from "./Input";
import validator from "validator";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState(isLogin ? login : signUp);

  console.log("formData", formData);

  const handleLogin = async () => {
    const values = Object.fromEntries(formData.map((f) => [f.id, f.value]));
    let URL = isLogin ? "login" : "signup";
console.log("*****",!isLogin,values)
    const payload = {
      emailId: values.email,
      password: values.password,
      ...(!isLogin && { firstName: values.firstname }),
      ...(!isLogin && { lastName: values.lastname }),
    };

    console.log("payload",payload)

    try {
      const res = await axios.post(`${BASE_URL}/${URL}`, payload, {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log("ressssssssss signup");
        dispatch(addUser(res?.data));
        return navigate("/");
      } else {
        return navigate("/login");
      }
    } catch (err) {
      console.error(`FE ERROR :: ${err}`);
    }
  };
  const isFormValid = formData.every(
    (field) => !field.error && !field.errorMessage && field.value
  );

  useEffect(() => {
    setFormData(isLogin ? login : signUp);
  }, [isLogin]);

  const handleChange = (e, index) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const updated = [...prev];
      const field = { ...updated[index] };

      const { minLength, maxLength } = field;
      let error = false;
      let errorMessage = "";

      if (value.length < minLength) {
        error = true;
        errorMessage = `${field.label} should contain at least ${minLength} characters`;
      } else if (value.length > maxLength) {
        error = true;
        errorMessage = `${field.label} should not exceed ${maxLength} characters`;
      } else {
        switch (id) {
          case "email":
            if (!validator.isEmail(value)) {
              error = true;
              if (!value.includes("@")) {
                errorMessage = `Email should contain "@"`;
              } else {
                errorMessage = `Please enter a valid email`;
              }
            }
            break;
          case "password":
            if (!validator.isStrongPassword(value)) {
              error = true;
              errorMessage =
                "Password must be a combination of uppercase, lowercase, numbers, and symbols";
            }
            break;
          default:
            break;
        }
      }

      if (
        field.value === value &&
        field.error === error &&
        field.errorMessage === errorMessage
      ) {
        return prev;
      }

      field.value = value;
      field.error = error;
      field.errorMessage = errorMessage;
      updated[index] = field;

      return updated;
    });
  };

  return (
    <div className="card card-border bg-base-200 w-96 mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title capitalize justify-center">
          {isLogin ? "Sign in to GitHub" : "Sign up to GitHub"}
        </h2>
        <div className="flex gap-4 flex-col">
          {formData &&
            formData.map((field, index) => {
              console.log("field", field);
              return (
                <Input {...field} onChange={(e) => handleChange(e, index)} />
              );
            })}
        </div>

        <div className="card-actions justify-center pt-4">
          <button
            disabled={!isFormValid}
            className="btn btn-primary "
            onClick={() => handleLogin()}
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
