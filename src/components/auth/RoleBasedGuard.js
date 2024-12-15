import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize } from '../../redux/action/authAction';
import { getAccountLogin } from '../../Service/ApiAccountService';
export default function RoleBasedGuard({ children, accessibleRoles = [] }) {

    const dispatch = useDispatch();
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(initialize({ isAuthenticated: false, user: null }))
        } else {
            fetchAccount();
        }
    }, [dispatch]);

    const fetchAccount = async () => {
        try {
            const response = await getAccountLogin();
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                setAccount(data);
                dispatch(initialize({ isAuthenticated: true, data }))
            }
        } catch (error) {
            dispatch(initialize({ isAuthenticated: false, user: null }))
            console.error('Failed to fetch account data:', error);
            setAccount(null);
        }
    };

    if (!accessibleRoles.includes(account?.role)) {
        console.log(account)
        // window.location.href = "/Page403";
    }
    return (
        <>{children}</>
    )

}