import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import instance from "../../services/instance";
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";

function ChatArea({ currentChat, socket }) {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const params =useParams();
  // console.log(params.id)

  
  useEffect(() => {
  fetchCurrentDetails();
  }, [currentChat._id]);

  const fetchCurrentDetails = async(req,res) =>{
    const response1 = await instance.protectedInstance.post('/message/getmsg'
    , {
      from: params.id,
      to: currentChat._id,
    }
    );
    setMessages(response1.data);
  }

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
       params.id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  console.log("CURRENT "+currentChat._id)
  console.log("CURRENT "+currentChat.name)

  const handleSendMsg = async (msg) => {
    // alert("YES" + msg)
    
    console.log("currentChat._id " +currentChat._id)
    console.log("params._id  "+params.id)

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: params.id,
      msg,
    });

    const sendMsgg = async(req,res) =>{
      await instance.protectedInstance.post('/message/addmsg', {
        from: params.id,
        to: currentChat._id,
        message: msg,
      });  
    }

    sendMsgg();
    
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
   <div className="chatContainer">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
          <img src='https://cdn-icons-png.flaticon.com/512/6388/6388003.png'  alt="logo" width={'40px'} height={'40px'}/>
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
          </div>
        </div>
      
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
    </>
  )
}

export default ChatArea