import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import sizeReducer from './sizeReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';
import materialReducer from './materialReducer';
import shoeSoleReducer from './shoeSoleReducer';
import colorReducer from './colorReducer';
import voucherReducer from './voucherReducer';
import productReducer from './productReducer';
import productDetailReducer from './productDetailReducer';
import productFavoriteReducer from './productFavoriteReducer';
import promotionReducer from './promotionReducer';
import billReducer from './billReducer';
import billByEmployeeReducer from './billByEmployeeReducer'


const rootReducer = combineReducers({
    account: accountReducer,
    size: sizeReducer,
    brand: brandReducer,
    category: categoryReducer,
    material: materialReducer,
    shoeSole: shoeSoleReducer,
    color: colorReducer,
    voucher: voucherReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    productFavorite: productFavoriteReducer,
    promotion: promotionReducer,
    bill: billReducer,
    codeBill: billByEmployeeReducer,
});

export default rootReducer;
