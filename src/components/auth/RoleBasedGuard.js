import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize } from '../../redux/action/authAction';
import { getAccountLogin } from '../../Service/ApiAccountService';

export default function RoleBasedGuard({ children, accessibleRoles = [] }) {

    const dispatch = useDispatch();
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(initialize({ isAuthenticated: false, user: null }));
            setIsLoading(false);
        } else {
            fetchAccount();
        }
    }, [dispatch]);

    const fetchAccount = async () => {
        try {
            const response = await getAccountLogin();
            if (response.status === 200) {
                const data = response.data;
                setAccount(data);
                dispatch(initialize({ isAuthenticated: true, user: data }));
            } else {
                handleUnauthenticated();
            }
        } catch (error) {
            console.error('Failed to fetch account data:', error);
            handleUnauthenticated();
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnauthenticated = () => {
        dispatch(initialize({ isAuthenticated: false, user: null }));
        setAccount(null);
    };

    if (isLoading) {
        return (
            <div className="spinner-wrapper">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ); // Add a loading state
    }

    if (!accessibleRoles.includes(account?.role)) {
        window.location.href = "/Page403"; // Uncomment this line to redirect
        return null; // Prevent rendering children
    }

    return (
        <>{children}</>
    );
}
