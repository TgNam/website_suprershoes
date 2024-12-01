import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ModelCreateProduct.scss';
import InfoProduct from './InfoProduct';
import SizeAndColor from './SizeAndColor';
import TableProductDetail from './TableProductDetail';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import { createNewNewProduct } from '../../../../../../redux/action/productAction'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllProductProductDetail } from '../../../../../../redux/action/productAction'
import { useNavigate } from 'react-router-dom';
const ModelCreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const validateNewProduct = (newProduct) => {
        // Kiểm tra các trường dữ liệu quan trọng
        if (!newProduct.name || newProduct.name.trim() === "") {
            toast.error("Tên sản phẩm là bắt buộc");
            return false;
        }
        if (!newProduct.gender) {
            toast.error("Giới tính sản phẩm là bắt buộc");
            return false;
        }
        if (!newProduct.idBrand) {
            toast.error("Thương hiệu sản phẩm là bắt buộc");
            return false;
        }
        if (!newProduct.idCategory) {
            toast.error("Danh mục sản phẩm là bắt buộc");
            return false;
        }
        if (!newProduct.idMaterial) {
            toast.error("Chất liệu sản phẩm là bắt buộc");
            return false;
        }
        if (!newProduct.idShoeSole) {
            toast.error("Đế giày sản phẩm là bắt buộc");
            return false;
        }

        // Kiểm tra image nếu là chuỗi
        if (typeof newProduct.image === "string" && newProduct.image.trim() === "") {
            toast.error("Ảnh sản phẩm là bắt buộc");
            return false;
        }

        // Nếu image là mảng (binary data), kiểm tra xem mảng có dữ liệu không
        if (Array.isArray(newProduct.image) && newProduct.image.length === 0) {
            toast.error("Ảnh sản phẩm là bắt buộc");
            return false;
        }

        // Kiểm tra productDetailRequest là mảng và không rỗng
        if (!Array.isArray(newProduct.productDetailRequest) || newProduct.productDetailRequest.length === 0) {
            toast.error("Chi tiết sản phẩm là bắt buộc");
            return false;
        }

        // Nếu tất cả các trường đều hợp lệ
        return true;
    };

    const handleSubmitCreate = async () => {
        try {
            const newProduct = {
                name: product.name,
                gender: product.gender,
                idBrand: product.idBrand,
                idCategory: product.idCategory,
                idMaterial: product.idMaterial,
                idShoeSole: product.idShoeSole,
                image: product.image,  // Kiểm tra giá trị này có hợp lệ chưa
                productDetailRequest: selectedProductDetail
            }

            // Kiểm tra tính hợp lệ của newProduct
            if (validateNewProduct(newProduct)) {
                dispatch(createNewNewProduct(newProduct))
                dispatch(fetchAllProductProductDetail())
                navigate('/admins/manage-shoe');
            } else {
                toast.error("Lỗi khi thêm sản phẩm. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error when creating product: ", error);
            toast.error("Lỗi khi thêm sản phẩm. Vui lòng thử lại sau.");
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