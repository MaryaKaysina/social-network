/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import "./logIn.css";

const LogIn = ({ 
  handleClick, 
  handleChange, 
  isValidUserName,
  isValidPass,
  handleSubmit,
  loading
}) => {
  return (
    <form className='logIn' onSubmit={handleSubmit}>
      <h3 className="logInTitle">Log In</h3>
      <div className="logInBlock">
        <div className="logInReq">
          <input 
            className="logInInput" 
            type="text" 
            placeholder='Username *' 
            name='username'
            onChange={handleChange}
          />
          {isValidUserName.length > 0 && (
            <span className='logInError'>
              * {isValidUserName}
            </span>
          )}
        </div>
      </div>
      <div className="logInBlock">
        <div className="logInReq">
          <input 
            className="logInInput" 
            type="password" 
            placeholder='Password *' 
            name='password'
            onChange={handleChange}
          />
          {isValidPass.length > 0 && (
            <span className='signUpError'>
              * {isValidPass}
            </span>
          )}
        </div>
      </div>
      <div className="logInAction">
        <a href='#' className="logInText"  onClick={handleClick}>
          Don't have an account. Sign up!
        </a>
        <button 
          className='btn btn--logIn'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Log In'}
        </button>
      </div>
    </form>
  )
}

export default LogIn;