import { useSelector } from "react-redux";

export default function RoleBasedGuard({ children, accessibleRoles = [] }) {

    const { user } = useSelector(state => state.auth);

    if (!accessibleRoles.includes(user?.role)) {
        window.location.href = "/Page403";
    }
    return (
        <>{children}</>
    )

}