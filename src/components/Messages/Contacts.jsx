import React, { useEffect ,useState} from 'react'
import instance from '../../services/instance';

function Contacts({contacts,changeChat }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(()=>{
    fetchCurrentUserDetails()
  },[])

  const fetchCurrentUserDetails = async(req,res)=>{

    const response = await instance.protectedInstance.get('/message/getId');
    const details=response.data.user      
    setCurrentUserName(response.data.user.name)
  }
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
   <>
   <div className='contactContainer'>
          <div className="brand">
            <img src='https://cdn-icons-png.flaticon.com/512/6388/6388003.png'  alt="logo" width={'30px'} height={'40px'}/>
            <h3>ChatZ</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src='https://w7.pngwing.com/pngs/816/275/png-transparent-icon-profile-bio-avatar-person-symbol-chat-people.png' width={'35px'} height={'40px'}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src='https://www.w3schools.com/w3images/avatar5.png' width={'30px'} height={'40px'}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
   </>
  )
}

export default Contacts