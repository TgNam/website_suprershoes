import { useDispatch } from 'react-redux';
import { initialize } from '../../redux/action/authAction';
import { getAccountLogin } from '../../Service/ApiAccountService';
import { useSyncLogout } from "../../components/page/logout/Logout";
import { useEffect } from 'react';

export default function Auth({ children }) {
    const dispatch = useDispatch();

    // Gọi useSyncLogout trong component để đồng bộ hóa đăng xuất
    useSyncLogout();

    useEffect(() => {
        // Đảm bảo logic bất đồng bộ không chạy trong render
        (async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return dispatch(initialize({ isAuthenticated: false, user: null }));
            }
            try {
                const account = await getAccountLogin();
                if (account.status === 200) {
                    const user = account.data;
                    return dispatch(initialize({ isAuthenticated: true, user }));
                } else {
                    return dispatch(initialize({ isAuthenticated: false, user: null }));
                }
            } catch (e) {
                return dispatch(initialize({ isAuthenticated: false, user: null }));
            }
        })();
    }, [dispatch]); // Chỉ chạy khi dispatch thay đổi, đảm bảo không chạy lại khi không cần thiết

    return (
        <>
            {children}
        </>
    );
}
