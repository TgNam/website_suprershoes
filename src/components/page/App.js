import React from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

import FooterHome from './footer/FooterHome'
import Header from './hender/header';

import './App.scss'
const App = () => {
  return (
    <div className='App-container'>
      <div className='App-body'>
        <PerfectScrollbar>
          <Header />
          <Outlet />
          <FooterHome />
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default App;
