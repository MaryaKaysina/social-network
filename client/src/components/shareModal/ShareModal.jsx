import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '@components/postShare/PostShare';

import "./shareModal.css";

const ShareModal = ({ isOpen, setIsOpen }) => {
  const theme = useMantineTheme();
  const themeColor = theme.colorScheme === 'dark' 
    ? theme.colors.dark[9] 
    : theme.colors.gray[2];

  return (
    <>
      <Modal 
        opened={isOpen} 
        onClose={() => setIsOpen(false)} 
        overlayColor={themeColor}
        overlayOpacity={0.55}
        overlayBlur={3}
        size='55%'
        radius={10}
      >
        <PostShare />
      </Modal>
    </>
  )
}

export default ShareModal;