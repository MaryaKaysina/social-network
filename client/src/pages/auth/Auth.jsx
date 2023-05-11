import React from 'react';
import SignUp from '@components/signUp/SignUp';
import LogIn from '@components/logIn/LogIn';

import Logo from '@core/img/logo.png';

import "./auth.css";

const Auth = () => {
  return (
    <div className='auth'>
      <div className="authLeft">
        <img className="authLogo" src={Logo} alt="Логотип" />
        <div className="authName">
          <h1 className="authTitle">SocialNetwork</h1>
          <h6 className="authSubtitle">
            Explore the ideas throughout the world
          </h6>
        </div>
      </div>
      <div className="authRight">
        <SignUp />
        <LogIn />
      </div>
    </div>
  )
}

export default Auth;