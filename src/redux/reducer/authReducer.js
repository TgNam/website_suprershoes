import { SIGN_IN, INITIALIZE } from "../types/AuthType"


const authState ={
    isInitialized : false,
    isAuthenticated : false,
    user : null
}

function authReducer(state = authState, action){
    switch(action.type){

        case SIGN_IN: {
            const { user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            }
        }

        case INITIALIZE: {
            const { isAuthenticated, user } = action.payload
            return{
                ...state,
                isAuthenticated,
                user,
                isInitialized : true
            }
        }
        default: {
            return state;
        }

    }
}
export default authReducer;