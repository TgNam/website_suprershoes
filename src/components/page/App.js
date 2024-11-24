import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import FooterHome from "./footer/FooterHome";
import Header from "./hender/header";
import "./App.scss";
import ImageProduct from '../../image/ImageProduct';
import ListImageProduct from '../../image/ListImageProduct';
const App = () => {

  return (
    <div className="App-container">
      <div className="App-body">
        <PerfectScrollbar>
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <Outlet />
            <ListImageProduct id={44} maxWidth={'100px'} maxHeight={'100px'} />

            <ImageProduct id={20} maxWidth={'100px'} maxHeight={'100px'} />

          </div>
          <div className="footer">
            <FooterHome />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default App;
