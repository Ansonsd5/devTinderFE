import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant/urls";
import { login, signUp } from "../config";
import Input from "./Input";
import validator from "validator";
import { closeOtpModal, openOtpModal } from "../utils/appSlice";
import Modal from "./modal";
import OTP from "./OTPComponent";
import Toast from "./Toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [otpExpiresIn,setOtpExpiresIn] = useState(0);
  const [isResend,setIsResend] = useState(false);

  const appData = useSelector((store) => store.app);

  const [formData, setFormData] = useState(isLogin ? login : signUp);

  console.log("formData", formData);

  useEffect(()=>{
    if(!otpExpiresIn) return;
    const timer = setInterval(()=>{
      setOtpExpiresIn((prev)=>{
        if(prev <= 1){
           clearInterval(timer);
          return 0;
        }
        return prev -1;
      });
      
    },1000);
    console.log("otpExpiresIn",otpExpiresIn);
    return () => clearInterval(timer);
    
  },[otpExpiresIn]);

  const format = (seconds) => {
    const sec = Number(seconds) || 0;
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m} :${s} minutes`;
  };

  const handleLogin = async () => {
    const values = Object.fromEntries(formData.map((f) => [f.id, f.value]));
    let URL = isLogin ? "login" : "signup";
    const payload = {
      emailId: values.email,
      password: values.password,
      ...(!isLogin && { firstName: values.firstname }),
      ...(!isLogin && { lastName: values.lastname }),
      ...(!isLogin && { resend : isResend })
    };

    try {
      const res = await axios.post(`${BASE_URL}/${URL}`, payload, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(addUser(res?.data));
        return navigate("/");
      } else if (res.status === 201) {
        console.log("res", res);
        setOtpExpiresIn(res?.data?.otpExpires ? res.data.otpExpires * 60 : 0);
        dispatch(openOtpModal());
        <Toast message={res?.data?.message} time={1000} />
        sessionStorage.setItem("userId", res.data.userId);
        // return navigate("/");
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

  async function handleVerifyOtp(payload) {
    try {
      const response = await axios.post(`${BASE_URL}/verify-mail`, payload, {
        withCredentials: true,
      });
      console.log("verify-mail Res", response);
        <Toast message={response?.data?.message} time={1000} />

      if (response.status === 200) {
          dispatch(addUser(response?.data?.user));
          dispatch(closeOtpModal())
          return navigate("/");
      }
    } catch (error) {
        <Toast message={error?.response?.data?.message} time={1000} />
      
      console.log("Error", error);
    }
  }

  const handleResend = () =>{
    setIsResend(true);
    handleLogin()
  }

  return (
    <>
      <div className="card card-border bg-base-200 w-96 mx-auto mt-4">
        <div className="card-body">
          <h2 className="card-title capitalize justify-center">
            {isLogin ? "Sign in to DevTinder" : "Sign up to DevTinder"}
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
      <Modal
        isOpen={appData.isOtpModalOpen}
        title="Enter the Email OTP"
        width="max-w-sm"
      >
        <div>
          <Toast message={"hello"} time={10000} />
          <OTP otpLength={6} handleOtpSubmit={handleVerifyOtp} />
          {appData.isOtpModalOpen && otpExpiresIn ? (
            <small>{`OTP expires in ${format(otpExpiresIn)}`}</small>
          ) : (
            <>{appData.isOtpModalOpen ? <button  onClick={()=>handleResend() } >Resend Otp</button> : null}</>
          )}
          <p className="mt-3">
            Enter the OTP sent to your <b>email</b> to complete signup.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Login;
