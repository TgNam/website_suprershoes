import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import './ModelCreateProduct.scss';
import InfoProduct from './InfoProduct';
import SizeAndColor from './SizeAndColor';
import TableProductDetail from './TableProductDetail';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import { createNewNewProduct } from '../../../../../../redux/action/productAction'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const ModelCreateProduct = () => {
    const dispatch = useDispatch();
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        gender: true,
        idBrand: '',
        idCategory: '',
        idMaterial: '',
        idShoeSole: '',
        image: null
    });
    const [formErrors, setFormErrors] = useState({});
    const [productDetail, setProductDetail] = useState([]);
    const [selectedProductDetail, setSelectedProductDetail] = useState([]);
    const isProductValid = () => {
        // Danh sách các trường bắt buộc
        const requiredFields = ["name", "idBrand", "idCategory", "idMaterial", "idShoeSole", "image"];

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
        setSelectedSizes([])
        setSelectedColors([])
        setSelectedProductDetail([])
    }, [product, formErrors]);

    const generateProductDetails = () => {
        if (!selectedSizes.length || !selectedColors.length) {
            setProductDetail([]);
            return;
        }

        const details = [];
        selectedColors.forEach((colorId) => {
            selectedSizes.forEach((sizeId) => {
                details.push({
                    quantity: 1,
                    price: 0,
                    idColor: colorId,
                    idSize: sizeId,
                    listImage: [],
                    previewImages: []
                });
            });
        });

        setProductDetail(details);
    };

    useEffect(() => {
        generateProductDetails();
    }, [selectedSizes, selectedColors]);

    const handleSubmitCreate = async () => {
        try {
            const newProduct = {
                name: product.name,
                gender: product.gender,
                idBrand: product.idBrand,
                idCategory: product.idCategory,
                idMaterial: product.idMaterial,
                idShoeSole: product.idShoeSole,
                image: product.image,
                productDetailRequest: selectedProductDetail
            }
            dispatch(createNewNewProduct(newProduct))
        } catch (error) {
            toast.error("Lỗi khi thêm kích cỡ. Vui lòng thử lại sau.");
        }
    };
    return (
        <div className="model-create-product container-fluid" >
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <InfoProduct
                    product={product}
                    setProduct={setProduct}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors} />
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
                <SizeAndColor
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    isProductValid={isProductValid}
                />
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

                    <Button className="mx-3" onClick={handleSubmitCreate}>Hoàn tất</Button>
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

export default ModelCreateProduct;