import React from 'react';

import Logo from '@core/img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';

import "./logoSearch.css";

const LogoSearch = () => {
  return (
    <div className='logoSearch'>
      <img src={Logo} alt="Логотип" />
      <div className='search'>
        <input className='input' type="text" placeholder='#Explore' />
        <div className='search-icon'>
          <UilSearch/>
        </div>
      </div>
    </div>
  )
}

export default LogoSearch;