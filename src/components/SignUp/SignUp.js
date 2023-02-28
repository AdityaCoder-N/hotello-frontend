import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import Loading from '../Loading/Loading';
import './signup.css'

const SignUp = () => {

  const [credentials,setCredentials] = useState({name:"",email:"",password:"",confirmpass:""}); 
  const navigate=useNavigate();

  const [loading, setLoading] = useState(false)

  const host = "https://hotello-backend-pjrg.onrender.com";

  const onchange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const signup=async (e)=>{

    setLoading(true);
    e.preventDefault();

    const response = await fetch(`${host}/auth/createuser`,{
      method: 'POST', 
            
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name : credentials.name, email: credentials.email, password:credentials.password})

    });
    
    
    const json = await response.json();
    console.log(json);

    setLoading(false);
    if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token',json.authToken);
        navigate("/");
        // props.showAlert("Account Created Successfully","success");
    }
    else{
        // props.showAlert("Invalid Details","danger");
    }
  }

  return (
    <div className='' style={{}} >

        <img src='./images/christopher-jolly-GqbU78bdJFM-unsplash.jpg' style={{width:"100vw",height:"100vh",objectFit:"cover"}}></img>
        <div className = 'signup-container' >

            <form onSubmit={signup}>
                
                <div className='form-components'>
                  <label>Name</label>
                  <input onChange={onchange} className='form-control' name='name' value={credentials.name} />
                </div>

                <div className='form-components'>
                  <label>Email</label>
                  <input onChange={onchange} placeholder='eg : abc@gmail.com' className='form-control' name='email' value={credentials.email}/>
                </div>

                <div className='form-components'>
                  <label>Password</label>
                  <input onChange={onchange} className='form-control' name='password' value={credentials.password}/>
                </div>

                <div className='form-components'>
                  <label>Confirm Password</label>
                  <input onChange={onchange} className='form-control' name='confirmpass' value={credentials.confirmpass}/>
                </div>

                <div className='form-components button-box' >
                  <button type='submit' className='btn'>Sign Up</button>
                </div>

                <p style={{textAlign:"center" , fontSize:"large",marginTop:"3px"}}>Already have an account ? <Link to='/login'>Sign in</Link></p>

                <div style={{marginTop:"5px"}}>
                  {loading && <Loading/>}
                </div>
            </form>

        </div>
    
    
    </div>
  )
}

export default SignUp