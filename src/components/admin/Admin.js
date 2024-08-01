import React from 'react'
import './Admin.scss'
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap'
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                    <FaBars size={20} onClick={() => setCollapsed(!collapsed)} />
                </div>
                <PerfectScrollbar>
                    <div className="admin-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>

    )
}
export default Admin;
