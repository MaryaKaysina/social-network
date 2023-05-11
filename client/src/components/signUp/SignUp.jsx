import React from 'react';

import "./signUp.css";

const SignUp = () => {
  return (
    <form className='signUp'>
      <h3 className="signUpTitle">Sign up</h3>
      <div className="signUpBlock">
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='First Name' 
          name='firstName'
        />
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='Last Name' 
          name='lastName'
        />
      </div>
      <div className="signUpBlock">
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='Username' 
          name='username'
        />
      </div>
      <div className="signUpBlock">
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='Password' 
          name='password'
        />
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='Confirm password' 
          name='confirmPassword'
        />
      </div>
      <div className="signUpAction">
        <a href='#' className="signUpText">
          Already have an account. Login!
        </a>
        <button className="btn btn--signUp" type='submit'>Signup</button>
      </div>
    </form>
  )
}

export default SignUp;