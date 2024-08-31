import React from 'react';
import Header from './components/page/hender/header';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

import './App.scss'
const App = () => {
  return (
    <div className='App-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='App-body'>
        <PerfectScrollbar>
          <Outlet />
          <p>test commit</p>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default App;
