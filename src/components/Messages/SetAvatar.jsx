import React, { useEffect, useState } from "react";
import instance from "../../services/instance";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate, useParams } from "react-router-dom";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState("");
  const params=useParams();


  useEffect(()=>{
    fetchCurrentUserDetails();
    
  },[])
  
  useEffect(()=>{
    avaImage();
  },[])

  const fetchCurrentUserDetails = async(req,res)=>{

    const response = await instance.protectedInstance.get('/message/getId');
    const details=response.data.user    
    console.log(details._id)  
    setCurrentUserName(response.data.user.name)
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      alert("Please select an avatar");
    } else {
      // const response = await instance.protectedInstance.get('/message/getId');
      // const user=response.data.user  
      // console.log(user._id)

      const { data } = await instance.protectedInstance.post(`/users/setAvatar/${params.id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        const response = await instance.protectedInstance.get('/message/getId');
        const details=response.data.user      
        setCurrentUserName(response.data.user.name)
     
        navigate('/');
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  const avaImage = async() =>{
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);

  }

  return (
    <>
      {isLoading ? (
        <div className="setAvatarContainer">
          <img src='' alt="loader" className="loader" />
        </div>
      ) : (
        <div className="setAvatarContainer">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""

                  }`}
                >
               
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    style={{'width':'50px'}}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          
        </div>
      )}
    </>
  );
}

