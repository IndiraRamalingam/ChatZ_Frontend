import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../services/instance";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ForgotPassword() {
  const [email,setEmail] = useState('');
  const[msg,setMsg]=useState('');
  const[info,setInfo]=useState('');

  const handleForgotpassword =(event) =>{
    event.preventDefault();
    forgotpassword({email})
  }

  const forgotpassword=async({email})=>{
    console.log(email)
    if(email!=""){
      try{
          const response=await instance.authInstance.post('/users/forgot_password',{email});
          setInfo(`Password Reset Link has to sent to your Email Id - ${email}`)
          setMsg('')
          }
          catch(error)
          {
            setMsg('Entered Email ID does not exists.')
          }
      }  
      else{
        setMsg('Email is required to send the Reset Password Link')
      }
}

  const formStyles = {
    background: "#cbfeff2e",
    width: "40rem",
    borderRadius: "2.5rem",  
  };

  return (
    <section className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
    <h1 className="mt-5 mb-5" style={{color:"rgb(92 209 39)",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic'}}>ChatZ <span style={{fontSize:'18px',fontStyle:'italic',color:'#2cdbcb'}}>- Let's Chat with your buddy</span></h1>
      <div className="p-md-5" style={formStyles} >
      <Form onSubmit={handleForgotpassword}>
             <div>
             <h3 className="mb-4 text-uppercase" style={{color:"rgb(9 233 171)",'fontWeight':'bolder','textAlign':'center','fontStyle':'italic'}}>FORGOT PASSWORD PAGE</h3>
                <br/>
              </div>
                <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type="email" 
                    placeholder="Enter Email"
                    value={email}
                    
                    onChange={(event) => setEmail(event.target.value) }
                    />
                </Form.Group>
                 <p style={{ color: "#ee8282",'fontSize':'19px','fontStyle':'italic' }}>{msg}</p>
                  <p style={{ color: "#52ff52",'fontSize':'19px','fontStyle':'italic'}}>{info}</p>
                
                 <div className="text-center mt-4">
                    <Button variant="warning" type="submit">
                      Send Email
                    </Button>
                    
                    <div className='mt-4' >
                        <Link to="/signin" style={{'fontSize':'17px',color:"rgb(9 233 171)"}}>Back to SignIn</Link>
                    </div>
                    
                    <div className='mt-4' style={{'fontSize':'17px','fontWeight':'600'}}>
                     <p><b>Note:</b> <i>You will receive the Reset Password form link through the above mentioned email only. So, Kindly enter your valid Email.</i></p>
                     </div>

              </div>
      </Form>
    </div>
    </div>
    </section>
  )
}

export default ForgotPassword