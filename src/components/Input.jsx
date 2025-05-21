import React, { useRef, useState } from "react";
import eyeClosedIcon from "../assets/colseeye.svg";
import eyeOpenIcon from "../assets/openeye.svg";
const Input = ({
  value,
  name,
  label,
  type ='text',
  placeholder,
  onChange,
  error,
  errorMessage,
  id,
}) => {
  console.log("label", label);
  const isPassword = type === "password";
  const passwordRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleShowPassword = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <fieldset className="fieldset" id={id || name}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <div className="relative">
        <input
          type={isPassword && isShow ? "text" : type}
          name={name}
          value={value}
          id={id || name}
          className={`input ${error ? "border-red-500" : ""}`}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          ref={passwordRef}
        />
        {isPassword && (
          <span className="absolute right-5 top-2.5 z-10">
            <img
              className="w-[24px] h-[24px]"
              src={isShow ? eyeClosedIcon : eyeOpenIcon}
              onClick={() => handleShowPassword()}
            />
          </span>
        )}
      </div>
      {error && errorMessage && (
        <p id={`${name}-error`} className="text-sm text-red-500 mt-1">
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
};

export default Input;
