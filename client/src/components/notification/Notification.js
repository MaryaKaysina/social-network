import React from 'react';
import { Notification } from '@mantine/core';
import { UilTimes, UilCheck } from '@iconscout/react-unicons';

const NotificationCustom = ({ isError, message, onClose, isOpen }) => {
  return (
    <Notification 
      icon={isError ? <UilTimes size="2rem" /> : <UilCheck size="2rem" />} 
      color={isError ? "red" : "green"}
      onClose={onClose}
      styles={(theme) => ({
        root: {
          backgroundColor: isError ? "#ffc6c6" : "#cffdd1",
          minHeight: "70px",
          minWidth: "20rem",
          position: "absolute",
          zIndex: "1000",
          top: "0.5rem",
          right: "0.5rem",
          boxShadow: "4px 4px 13px 6px rgba(34, 60, 80, 0.3)",
          border: "none",
          transform: isOpen ? "" : "translateX(1000%)",
          transition: "transform .2s ease-in-out",
          '& button': {
            alignSelf: "flex-start",
          },
          '& button:hover': {
            backgroundColor: isError ? "#ffc6c6" : "#cffdd1",
          },
        }
      })}
    >
      { message }
    </Notification>
  );
}

export default NotificationCustom;