import { useSelector } from "react-redux";

export default function RoleBasedGuard ({children, accessibleRoles = []}){

    const {user} = useSelector(state => state.auth);
    
    if(!accessibleRoles.includes(user?.role)){
        return(
            <div>Bạn không có quyền truy cập!</div>
        )
    }
    return(
        <>{children}</>
    )

}