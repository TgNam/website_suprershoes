import React, { useState } from 'react';
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap';
import AuthGuard from "../auth/AuthGuard";
import RoleBasedGuard from "../auth/RoleBasedGuard";
const Admin = () => {
    const [show, setShow] = useState(true);

    const handleToggleSidebar = (value) => {
        setShow(value);
    };
    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN", "EMPLOYEE"]}>
                <div className="admin-container">
                    <div className="admin-sidebar">
                        <SideBar
                            show={show}
                            handleToggleSidebar={handleToggleSidebar}
                        />
                    </div>
                    <div className="admin-content">
                        <div className="admin-header" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <FaBars size={25} onClick={() => setShow(!show)} />
                        </div>
                        <PerfectScrollbar>
                            <div className="admin-main">
                                <Outlet />
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard>
    );
}

export default Admin;
