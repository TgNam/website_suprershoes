import React from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

import './App.scss'
const App = () => {
  return (
    <div className='App-container'>
      <div className='App-body'>
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default App;
