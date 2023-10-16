import React, { useEffect ,useState} from 'react'
import instance from '../../services/instance';

function Welcome() {
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(()=>{
    fetchCurrentUserDetails()
  },[])

  const fetchCurrentUserDetails = async(req,res)=>{

    const response = await instance.protectedInstance.get('/message/getId');
    const details=response.data.user      
    setCurrentUserName(response.data.user.name)
  }

  return (
    <>
     <div className='welcomeContainer'>
      {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfzwd85JkBzWZrZFLm_zmvxbg6p8QgQPA_A&usqp=CAU' alt="welcome" /> */}
      <div className='welcomeStyle'>
      <h1 >
        Welcome, <span>{currentUserName}!</span>
      </h1><br/>
      <h3>Please select a chat to Start messaging.</h3>
      </div>
    </div>
    </>
  )
}

export default Welcome