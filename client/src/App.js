import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from "@core/pages/home/Home";
import Profile from "@core/pages/profile/Profile";
import Auth from "@core/pages/auth/Auth";
import Chat from '@core/pages/chat/Chat';

import { logOut } from '@core/state/actions/AuthActions';
import NotificationCustom from '@components/notification/Notification';

import "./App.css";

function App() {
  const [isOpenError, setIsOpenError] = React.useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);

  const user = useSelector((state) => state.authReducer.authData);
  const error = useSelector((state) => state.authReducer.error);
  const errMessage = useSelector((state) => state.authReducer.errMessage);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsOpenError(error);
    const timerId = setTimeout(() => setIsOpenError(false), 3000);
    return () => clearTimeout(timerId);
  }, [error]);

  React.useEffect(() => {
    if (errMessage === 'Session expired') {
      dispatch(logOut());
    }
  }, [errMessage]);

  React.useEffect(() => {
    if (user && isSignUp) {
      setIsOpenSuccess(true);
      const timerId = setTimeout(() => setIsOpenSuccess(false), 3000);
      return () => clearTimeout(timerId);
    }
  }, [user]);

  return (
    <div className="App">
      <div className="blur blur--top"></div>
      <div className="blur blur--bottom"></div>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />} 
        />
        <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="../auth" />} 
        />
        <Route 
          path="/auth" 
          element={user 
            ? <Navigate to="../home" /> 
            : <Auth isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          } 
        />
        <Route 
          path="/profile/:id" 
          element={user ? <Profile />: <Navigate to="../auth" />} 
        />
        <Route 
          path="/chat" 
          element={user ? <Chat />: <Navigate to="../auth" />} 
        />
      </Routes>
      <NotificationCustom 
        isError={true}
        message={errMessage}
        onClose={() => {setIsOpenError(false)}}
        isOpen={isOpenError}
      />
      <NotificationCustom 
        isError={false}
        message={`${user?.userData.firstname} ${user?.userData.lastname} has successfully registered`}
        onClose={() => {setIsOpenSuccess(false)}}
        isOpen={isOpenSuccess}
      />
    </div>
  );
}

export default App;
