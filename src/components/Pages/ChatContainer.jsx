import React, { useEffect, useState ,useRef } from 'react'
import { useParams } from 'react-router-dom';
import instance from "../../services/instance";
import Contacts from '../Messages/Contacts';
import ChatArea from '../Messages/ChatArea';
import Welcome from '../Messages/Welcome';
import { io } from 'socket.io-client';

function ChatContainer() {
  const host = "http://localhost:3001";
  const socket = useRef();
  const[contacts,setContacts]=useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const params =useParams();

  useEffect(()=>{
    fetchCurrentUserDetails()
  },[])

  const fetchCurrentUserDetails = async(req,res)=>{
    const response = await instance.protectedInstance.get('/message/getId');
    const details=response.data.user      
    setCurrentUser(details)
  }

  useEffect(()=>{
    fetchAllUsers();
  },[])

  const fetchAllUsers = async(req,res)=>{
    const response = await instance.protectedInstance.get(`/users/get_all_id/${params.id}`);
    // console.log(response.data)
    setContacts(response.data)
  }

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
    <section className="h-100"> 
    <div className='row'>
    <div className="col-sm-10">
      <div className='headStyle'>
    <h1 className="mt-4 mr-5" style={{color:"rgb(92 209 39)",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic'}}>ChatZ <span style={{fontSize:'18px',fontStyle:'italic',color:'#2cdbcb','textAlign':'center'}}>- Let's Chat with your buddy</span></h1>
    </div>
      <div class='container1'>
        <div class='container2'>
          <Contacts contacts={contacts} changeChat={handleChatChange}/>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatArea currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
      </div>

      <div className="col-sm-2 mt-4 justify-content-end align-items-center ">
        <button className="btn btn-danger"  onClick={()=>
        {
          localStorage.clear();
          window.location.href = '/';
        }}>LogOut</button>
      </div>
      </div>
      </section>
    </>
  )
}

export default ChatContainer