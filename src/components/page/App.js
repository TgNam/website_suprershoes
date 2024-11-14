import React from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import FooterHome from "./footer/FooterHome";
import Header from "./hender/header";
import AuthGuard from "../auth/AuthGuard";

import "./App.scss";
const App = () => {
  return (
    <AuthGuard>
      <div className="App-container">
        <div className="App-body">
          <PerfectScrollbar>
            <Header />
            <Outlet />
            <FooterHome />
          </PerfectScrollbar>
        </div>
      </div>
    </AuthGuard>
  );
};

export default App;
