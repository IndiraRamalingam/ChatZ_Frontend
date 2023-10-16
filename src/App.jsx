import React from 'react'
import '../src/App.css'
import { BrowserRouter, Routes ,Route,Navigate } from 'react-router-dom'
import ChatContainer from './components/Pages/ChatContainer'
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'
import ForgotPassword from './components/Pages/ForgotPassword'
import ResetPassword from './components/Pages/ResetPassword'
import SetAvatar from './components/Messages/SetAvatar'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/reset_password/:token' element={<ResetPassword />} />
          <Route path='/chats/:id' element={<ChatContainer />} />
           <Route path='/setAvatar/:id' element={<SetAvatar />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App