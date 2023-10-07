import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../services/instance";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignIn() {
 
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[msg,setMsg]=useState('');
  const navigate=useNavigate();
  
  const handleSignin =(event) =>
  {
    event.preventDefault();
    signin({email,password})  
  }

  const signin = async({email,password})=>{
    if(email!="" && password!="")
    {
      try
      {  
          const response = await instance.authInstance.post('/users/signin',{email,password});
          sessionStorage.setItem("token", response.data.token)
          if (response.status === 200) {
            //const response = await instance.protectedInstance.get('/url/getId');
           // const res=response.data;
            //const params_id=res.user_ID;
            //navigate(`/dashboard/${params_id}`)
            navigate('/chats')
          }   
      }
      catch(error)
      {   
          setMsg("Invalid Email/Password");
      }     
    }
    else
    {
        if(email=="" && password==""){
          setMsg("Please enter your Email and password")
        }else if(email==""){
          setMsg("Email is required")
        }else{
          setMsg("Password cannot be empty")
        }
    }  
  }

  const formStyles = {    
    background: "#cbfeff2e",
    width: "40rem",
    borderRadius: "2.5rem",  
  };

    return (
      <>
      <section className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <h1 className="mt-5 mb-5" style={{color:"rgb(92 209 39)",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic'}}>ChatZ <span style={{fontSize:'18px',fontStyle:'italic',color:'#2cdbcb'}}>- Let's Chat with your buddy</span></h1>
        <div className="p-md-5" style={formStyles} >
            <Form onSubmit={handleSignin}>
              <div>
                <h3 className="mb-4 text-uppercase" style={{color:"rgb(9 233 171)",'fontWeight':'bolder','textAlign':'center','fontStyle':'italic'}}>LOGIN PAGE</h3>
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

                <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value) }
                    />
                </Form.Group>
                
                <p style={{ color: "#ee8282",'fontSize':'19px','fontStyle':'italic' }}>{msg}</p>

                <div className="text-center mt-4">
                    <Button variant="warning" type="submit">
                      SIGN IN
                    </Button>

                    <div className='mt-4' >
                        <Link to='/forgot_password' style={{'fontSize':'17px',color:"rgb(9 233 171)"}}>Forgot Password</Link>
                    </div>

                    <div className='mt-4' style={{'fontSize':'17px'}}>
                        <p>_________________________OR__________________________</p>
                    </div>

                    <div className='mt-4'>
                        <p>New User? <Link to="/signup" style={{'fontSize':'17px',color:"rgb(9 233 171)"}}>Sign Up</Link></p>
                    </div>
                    
                </div>
              </Form>           
        </div>
        </div>
        </section>
      </>
    )
  }
  

export default SignIn