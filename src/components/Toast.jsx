import React, { useState, useEffect } from "react";

const Toast = ({ message, toastbg = "bg-green-500", time = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), time);
    return () => clearTimeout(timer); 
  }, [time]);

  if (!visible) return null;

  return (
    <div className={`toast toast-top toast-start z-99 ${toastbg}`}>
      <div className="alert alert-info shadow-lg">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
