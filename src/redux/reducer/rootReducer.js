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
<<<<<<< HEAD
import productReducer from './productReducer';
import productDetailReducer from './productDetailReducer';
import productFavoriteReducer from './productFavoriteReducer';
=======
import promotionReducer from './promotionReducer';
import billReducer from './billReducer';
>>>>>>> 10cad8b2f5f2ff1a530eabbb62df6f2562e37e73

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
<<<<<<< HEAD
    product: productReducer,
    productDetail: productDetailReducer,
    productFavorite: productFavoriteReducer,
=======
    promotion: promotionReducer,
    bill: billReducer,
>>>>>>> 10cad8b2f5f2ff1a530eabbb62df6f2562e37e73
});

export default rootReducer;
