import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant/urls";

const PremiumCard = () => {

  useEffect(()=>{verifyPremiumUser()},[])
  const [isPremiumUser,setIsPremiumUser] = useState(false);
  const verifyPremiumUser = async () =>{
    const premiumUser = await axios.get(`${BASE_URL}/premium/verify`,{withCredentials :true});
      setIsPremiumUser(premiumUser.data.isPremium);
  }
  const handleBuyNow = async (membership)=>{
    try {
      const createOrderRes = await axios.post(`${BASE_URL}/payment/create`,{membership},{withCredentials:true});
      if (createOrderRes.status === 200) {
        const { amount, keyId, currency, notes, orderId } = createOrderRes.data;
        const options = {
          key: keyId,
          amount,
          currency,
          name: "Dev Tinder",
          description: "Connect to other developers",
          order_id: orderId,
          prefill: {
            name: notes.firstName + " " + notes.lastName,
            email: notes.emailId,
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handler: verifyPremiumUser,
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
      
    } catch (error) {
      console.log(`Error FE premium:: ${error}`);
    }

  }
  return isPremiumUser ? (<div>
    <h1 className="flex items-center font-extrabold text-4xl">You are already a premium user</h1>
  </div>) : (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
        <h1 className="capitalize">Gold membership</h1>
        <button className="btn btn-primary" onClick={()=>handleBuyNow('gold')}>Buy now</button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid grow place-items-center p-4">
        <h1 className="capitalize">Silver membership</h1>
        <button className="btn btn-secondary" onClick={()=>handleBuyNow('silver')}>Buy now</button>
      </div>
    </div>
  );
};

export default PremiumCard;
