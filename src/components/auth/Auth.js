import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initialize } from '../../redux/action/authAction';
import { getAccountLogin } from '../../Service/ApiAccountService';

export default function Auth({children}) {
    
    const dispatch = useDispatch();
    ( async ()=>{
        const token = localStorage.getItem('accessToken');
        if(!token){
            return dispatch(initialize({isAuthenticated : false, user : null}))
        }
        try{
            const user = await getAccountLogin();
            console.log(user);
            return dispatch(initialize({isAuthenticated : true, user}))
        }catch(e){
            return dispatch(initialize({isAuthenticated : false, user : null}))
        }
    })();
    return(
        <>
            {children}
        </>
    )
}