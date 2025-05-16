import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constant/urls";

const Chat = () => {
  const { chatwithid } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("chatwithid", chatwithid);
  const userId = user?._id;
  
  

  const firstName = user?.firstName;
  const lastName = user?.lastName;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, chatwithid });

    socket.on("messageReceived",({firstName,text})=>{
      console.log(firstName + " send " + text);
      setMessages((messages) =>[...messages,{firstName,text}])

    })

    return () => {
      console.log("socket disconnected");
      socket.disconnect();
    };
  }, [userId, chatwithid]);

  const getChat =async () =>{
    // if(messages) return;
    const chatRes = await axios.get(`${BASE_URL}/getchat/${chatwithid}`, {
      withCredentials: true,
    });

    console.log("chatRes",chatRes)



    if(chatRes){

    const chatData =  chatRes?.data?.messages?.map(msg =>{
        const { senderId, text } = msg;
        return {firstName : senderId?.firstName,
          text
        }
      })
      setMessages(chatData);
      console.log("chatData",chatData)
    }
    

  }

  useEffect(() => {
    getChat();
  }, []);

  const sendMessage = () => {
    if(!newMessage) return
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      chatwithid,
      text: newMessage,
    });
    setNewMessage('');
  };
  
  return (
    <div className="chat-main  w-[100%] flex flex-col  p-4 border-2 border-primary m-4">
      <div className="flex-grow overflow-y-auto">

        {
          messages && messages.map((msg,key)=>{
            return <>
            <div className={`chat ${msg.firstName ===firstName ?"chat-end":"chat-start"} `} key={key}>
          <div className={`${msg.firstName ===firstName ?'chat-bubble bg-[#2c5d4b]' :'chat-bubble'} `}>{msg.text}</div>
        </div>
            {/* <span className="text-[8px] ml-2">{msg.formatedTime}</span> */}
            </>
          })
        }
        {/* <div className="chat chat-start">
          <div className="chat-bubble">{messages.text}</div>
        </div> */}
        {/* <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div> */}
      </div>
      <div className="flex flex-row items-center gap-[2%] mt-4 ">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="textarea w-full"
          placeholder="Message"
        ></input>
        {newMessage && <button className="btn btn-info" disabled={!newMessage} onClick={sendMessage}>
          send
        </button>}
      </div>
    </div>
  );
};

export default Chat;
