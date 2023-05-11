import React from 'react';

import "./logIn.css";

const LogIn = () => {
  return (
    <form className='logIn'>
      <h3 className="logInTitle">Log In</h3>
      <div className="logInBlock">
        <input 
          className="logInInput" 
          type="text" 
          placeholder='Username' 
          name='username'
        />
      </div>
      <div className="logInBlock">
        <input 
          className="logInInput" 
          type="text" 
          placeholder='Password' 
          name='password'
        />
      </div>
      <div className="logInAction">
        <a href='#' className="logInText">
          Don't have an account. Sign up!
        </a>
        <button className="btn btn--logIn" type='submit'>Login</button>
      </div>
    </form>
  )
}

export default LogIn;