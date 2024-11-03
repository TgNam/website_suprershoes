import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Content from './Content';
import FooterHome from './FooterHome'
import Header from '../hender/header';
import './Home.scss'
const Home = () => {

    return (
        <div className='homePage'>
            <div className='header-container'>
                <Header />
            </div>
            <Banner />
            <Content />
            <FooterHome />
        </div>
    );
}

export default Home;