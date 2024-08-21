import { combineReducers } from 'redux';
import userReducer from './userReducer';
import sizeReducer from './sizeReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';
import materialReducer from './materialReducer';
import shoeSoleReducer from './shoeSoleReducer';
import colorReducer from './colorReducer';
import voucherReducer from './voucherReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({


const rootReducer = combineReducers({
    user: userReducer,
    size: sizeReducer,
    brand: brandReducer,
    category: categoryReducer,
    material: materialReducer,
    shoeSole: shoeSoleReducer,
    color: colorReducer,
    voucher: voucherReducer,
    employee: employeeReducer,
});

export default rootReducer;
