import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from '@components/signUp/SignUp';
import LogIn from '@components/logIn/LogIn';
import { logIn, signUp } from '@core/state/actions/AuthActions';
import { DEFAULT_FORM_DATA } from '@core/const';

import Logo from '@core/img/logo.png';

import "./auth.css";

const Auth = ({ isSignUp, setIsSignUp }) => {
  const [formData, setFormData] = React.useState(DEFAULT_FORM_DATA);
  const [isConfirmPass, setIsConfirmPass] = React.useState('');
  const [isValidFirstName, setIsValidFirstName] = React.useState('');
  const [isValidUserName, setIsValidUserName] = React.useState('');
  const [isValidPass, setIsValidPass] = React.useState('');

  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();

  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setIsConfirmPass('');
    setIsValidFirstName('');
    setIsValidUserName('');
    setIsValidPass('');
  }

  const handleClick = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
    resetForm();
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmPass(true);
    if (isSignUp) {
      if (formData.password !== formData.confirmpassword) {
        setIsConfirmPass('Confirm password is not same');
        return;
      } 
      if (formData.firstname.length < 3) {
        setIsValidFirstName('Firstname must be more than 3 characters');
        return;
      }
      if (formData.username.length < 3) {
        setIsValidUserName('Username must be more than 3 characters');
        return;
      }
      if (formData.password.length < 5) {
        setIsValidPass('Password must be more than 5 characters');
        return;
      }
      dispatch(signUp(formData));
    } else {
      if (formData.username.length === 0 || formData.password.length === 0) {
        setIsValidUserName('Username or password is not correct');
        setIsValidPass('Username or password is not correct');
        return;
      }
      dispatch(logIn(formData));
    }
  }

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
        {isSignUp 
          ? <SignUp 
              handleClick={handleClick} 
              handleChange={handleChange}
              isConfirmPass={isConfirmPass}
              isValidFirstName={isValidFirstName}
              isValidUserName={isValidUserName}
              isValidPass={isValidPass}
              handleSubmit={handleSubmit}
              loading={loading}
            /> 
          : <LogIn 
              handleClick={handleClick} 
              handleChange={handleChange}
              isValidUserName={isValidUserName}
              isValidPass={isValidPass}
              handleSubmit={handleSubmit}
              loading={loading}
            />}
      </div>
    </div>
  )
}

export default Auth;