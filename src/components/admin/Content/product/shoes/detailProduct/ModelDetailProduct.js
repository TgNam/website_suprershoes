import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ModelDetailProduct.scss';
import InfoProduct from './InfoProduct';
import TableProductDetail from './TableProductDetail';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { findProductByIdProduct } from '../../../../../../redux/action/productAction'
import { fetchAllProductDetail } from '../../../../../../redux/action/productDetailAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthGuard from "../../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../../auth/RoleBasedGuard";
const ModelDetailProduct = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const idProduct = searchParams.get('idProduct');

    const product = useSelector((state) => state.product.product);
    const productDetail = useSelector((state) => state.productDetail.listProductDetail);
    useEffect(() => {
        if (idProduct) {
            getData(idProduct);
        }

    }, [dispatch, idProduct]);
    const getData = (idProduct) => {
        if (idProduct) {
            dispatch(findProductByIdProduct(idProduct));
            dispatch(fetchAllProductDetail([idProduct]))
        }
    }

    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
                <div className="model-create-product container-fluid" >
                    <div className="model-create-product-info p-3 m-3">
                        <h4 className="text-center p-3">Thông tin sản phẩm</h4>
                        <InfoProduct product={product} />
                    </div>
                    <div className="model-create-product-table p-3 m-3">
                        <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                        <div className='overflow-x-auto'>
                            <TableProductDetail
                                product={product}
                                productDetail={productDetail}
                            />
                        </div>
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard>
    );
}

export default ModelDetailProduct;