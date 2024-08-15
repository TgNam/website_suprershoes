import { combineReducers } from 'redux';


import userReducer from './userReducer';
import sizeReducer from './sizeReducer';
const rootReducer = combineReducers({

    user: userReducer,
    size: sizeReducer,
});

export default rootReducer;