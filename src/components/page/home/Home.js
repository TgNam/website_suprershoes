import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import Content from './content/Content';
import './Home.scss'
import AuthGuard from '../../auth/AuthGuard';
const Home = () => {

    return (
        <AuthGuard>
            <div className='homePage'>
                <Banner />
                <Content />
            </div>
        </AuthGuard>
    );
}

export default Home;