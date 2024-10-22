import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import addressReducer from './addressReducer';
import sizeReducer from './sizeReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';
import materialReducer from './materialReducer';
import shoeSoleReducer from './shoeSoleReducer';
import colorReducer from './colorReducer';
import voucherReducer from './voucherReducer';
import accountVoucherReducer from './accountVoucherReducer';
import productReducer from './productReducer';
import productDetailReducer from './productDetailReducer';
import productFavoriteReducer from './productFavoriteReducer';
import promotionReducer from './promotionReducer';
import billReducer from './billReducer';
import billByEmployeeReducer from './billByEmployeeReducer'
import billDetailByEmployeeReducer from './billDetailByEmployeeReducer'

const rootReducer = combineReducers({
    account: accountReducer,
    address: addressReducer,
    size: sizeReducer,
    brand: brandReducer,
    category: categoryReducer,
    material: materialReducer,
    shoeSole: shoeSoleReducer,
    color: colorReducer,
    voucher: voucherReducer,
    accountVoucher: accountVoucherReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    productFavorite: productFavoriteReducer,
    promotion: promotionReducer,
    bill: billReducer,
    codeBill: billByEmployeeReducer,
    billDetailOrder: billDetailByEmployeeReducer,
});

export default rootReducer;
