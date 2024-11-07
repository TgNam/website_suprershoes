import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import Content from './content/Content';
import './Home.scss'
const Home = () => {

    return (
        <div className='homePage'>
            <Banner />
            <Content />
        </div>
    );
}

export default Home;