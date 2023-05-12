import React from 'react';

import "./signUp.css";

const SignUp = ({ 
  handleClick, 
  handleChange, 
  isConfirmPass, 
  handleSubmit,
  isValidFirstName,
  isValidUserName,
  isValidPass,
  loading
}) => {
  return (
    <form className='signUp' onSubmit={handleSubmit}>
      <h3 className="signUpTitle">Sign up</h3>
      <div className="signUpBlock">
        <div className="signUpReq">
          <input 
            className="signUpInput" 
            type="text" 
            placeholder='First Name *' 
            name='firstname'
            onChange={handleChange}
          />
          {isValidFirstName.length > 0 && (
            <span className='signUpError'>
              * {isValidFirstName}
            </span>
          )}
        </div>
        <input 
          className="signUpInput" 
          type="text" 
          placeholder='Last Name' 
          name='lastname'
          onChange={handleChange}
        />
      </div>
      <div className="signUpBlock">
        <div className="signUpReq">
          <input 
            className="signUpInput" 
            type="text" 
            placeholder='Username *' 
            name='username'
            onChange={handleChange}
          />
          {isValidUserName.length > 0 && (
            <span className='signUpError'>
              * {isValidUserName}
            </span>
          )}
        </div>
      </div>
      <div className="signUpBlock">
        <div className="signUpReq">
          <input 
            className="signUpInput" 
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
        <div className="signUpReq">
          <input 
            className="signUpInput" 
            type="password" 
            placeholder='Confirm password *' 
            name='confirmpassword'
            onChange={handleChange}
          />
          {isConfirmPass.length > 0 && (
            <span className='signUpError'>
              * {isConfirmPass}
            </span>
          )}
        </div>
      </div>
      <div className="signUpAction">
        <a href='#' className="signUpText" onClick={handleClick}>
          Already have an account. Login!
        </a>
        <button 
          className='btn btn--signUp'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}

export default SignUp;