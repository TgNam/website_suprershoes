import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ModelUpdateProduct.scss';
import InfoProduct from './InfoProduct';
import TableProductDetail from './TableProductDetail';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
// import { createNewNewProduct } from '../../../../../../redux/action/productAction'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { findProductByIdProduct, updateProduct } from '../../../../../../redux/action/productAction'
import { fetchAllProductDetail } from '../../../../../../redux/action/productDetailAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
const ModelUpdateProduct = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const idProduct = searchParams.get('idProduct');

    const productRedux = useSelector((state) => state.product.product);
    const productDetailRedux = useSelector((state) => state.productDetail.listProductDetail);
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

    useEffect(() => {
        if (productRedux) setProduct(productRedux);

        if (productDetailRedux) {
            const initializedProductDetail = productDetailRedux.map((detail) => ({
                ...detail,
                listImage: Array.isArray(detail.listImage) ? detail.listImage : [], // Đảm bảo listImage là mảng
                previewImages: Array.isArray(detail.previewImages) ? detail.previewImages : [], // Đảm bảo previewImages là mảng
            }));
            setProductDetail(initializedProductDetail);
        }
    }, [productRedux, productDetailRedux]);


    const [product, setProduct] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const [productDetail, setProductDetail] = useState([]);

    const [selectedProductDetail, setSelectedProductDetail] = useState([]);
    const isProductValid = () => {
        // Danh sách các trường bắt buộc
        const requiredFields = ["name", "idBrand", "idCategory", "idMaterial", "idShoeSole"];

        // Kiểm tra nếu tất cả các trường trong product có giá trị hợp lệ
        const isProductComplete = requiredFields.every((field) => {
            const value = product[field];
            return typeof value === "string" ? value.trim() : Boolean(value);
        });

        // Kiểm tra nếu formErrors không có lỗi nào
        const hasNoErrors = Object.values(formErrors).every((error) => !error);

        return isProductComplete && hasNoErrors;
    };

    useEffect(() => {
        setSelectedProductDetail([])
    }, [product, formErrors]);


    const handleSubmitUpdate = async () => {
        try {
            if (selectedProductDetail.length === 0) {
                toast.error("Vui lòng chọn sản phẩm chi tiết cần chỉnh sửa");
            }
            const updateProductRequest = {
                id:idProduct,
                name: product.name,
                gender: product.gender,
                idBrand: product.idBrand,
                idCategory: product.idCategory,
                idMaterial: product.idMaterial,
                idShoeSole: product.idShoeSole,
                image: product.image,
                productDetailRequest: selectedProductDetail
            }
            dispatch(updateProduct(updateProductRequest))
        } catch (error) {
            toast.error("Lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau.");
        }
    };
    return (
        <div className="model-create-product container-fluid" >
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Cập nhật sản phẩm</h4>
                <InfoProduct
                    product={product}
                    setProduct={setProduct}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors} />
            </div>

            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                    {isProductValid() && productDetail.length > 0 && (
                        <ModelAddQuanityPrice
                            className="mx-4 p-2"
                            productDetail={productDetail}
                            setProductDetail={setProductDetail}
                        />
                    )}
                    <Button className="mx-3" onClick={handleSubmitUpdate}>Hoàn tất</Button>
                </div>
                <div className='overflow-x-auto'>
                    <TableProductDetail
                        product={product}
                        productDetail={productDetail}
                        setProductDetail={setProductDetail}
                        selectedProductDetail={selectedProductDetail}
                        setSelectedProductDetail={setSelectedProductDetail}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModelUpdateProduct;