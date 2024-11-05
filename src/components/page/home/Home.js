import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import Content from './content/Content';
import FooterHome from '../footer/FooterHome'
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