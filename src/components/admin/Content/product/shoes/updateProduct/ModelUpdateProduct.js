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
import { fetchAllProductProductDetail } from '../../../../../../redux/action/productAction'
import { Link } from 'react-router-dom';
import AuthGuard from "../../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../../auth/RoleBasedGuard";
import swal from 'sweetalert';
const ModelUpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const validateNewProduct = (newProduct) => {
        // Kiểm tra các trường dữ liệu quan trọng
        if (!newProduct.name || newProduct.name.trim() === "") {
            toast.error("Tên sản phẩm là bắt buộc");
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

        // // Kiểm tra productDetailRequest là mảng và không rỗng
        // if (!Array.isArray(newProduct.productDetailRequest) || newProduct.productDetailRequest.length === 0) {
        //     toast.error("Chi tiết sản phẩm là bắt buộc");
        //     return false;
        // }

        // Nếu tất cả các trường đều hợp lệ
        return true;
    };

    const handleSubmitUpdate = async () => {
        try {
            const updateProductRequest = {
                id: idProduct,
                name: product.name,
                gender: product.gender,
                idBrand: product.idBrand,
                idCategory: product.idCategory,
                idMaterial: product.idMaterial,
                idShoeSole: product.idShoeSole,
                image: product.image,
                productDetailRequest: selectedProductDetail
            };
            if (validateNewProduct(updateProductRequest)) {
                // Hiển thị thông báo xác nhận trước khi thực hiện cập nhật
                const confirm = await swal({
                    title: "Xác nhận cập nhật",
                    text: selectedProductDetail.length > 0
                        ? `Bạn đã chọn ${selectedProductDetail.length} sản phẩm chi tiết. Bạn có chắc chắn muốn cập nhật?`
                        : "Hiện tại bạn chưa chọn sản phẩm chi tiết. Bạn có chắc chắn muốn cập nhật?",
                    icon: "warning",
                    buttons: ["Hủy bỏ", "Xác nhận"],
                    dangerMode: true,
                });

                if (!confirm) {
                    return; // Nếu người dùng chọn "Hủy bỏ", dừng thực hiện
                }

                const isSuccess = await dispatch(updateProduct(updateProductRequest));

                if (isSuccess) {
                    await swal({
                        title: "Thành công",
                        text: "Sản phẩm đã được cập nhật thành công.",
                        icon: "success",
                        button: "OK",
                    });

                    dispatch(fetchAllProductProductDetail());
                    navigate('/admins/manage-shoe');
                } else {
                    await swal({
                        title: "Thất bại",
                        text: "Cập nhật sản phẩm không thành công. Vui lòng thử lại.",
                        icon: "error",
                        button: "OK",
                    });
                }
            }
        } catch (error) {
            await swal({
                title: "Lỗi",
                text: "Lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau.",
                icon: "error",
                button: "OK",
            });
        }
    };
    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
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
                                    setSelectedProductDetail={setSelectedProductDetail}
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
            </RoleBasedGuard>
        </AuthGuard>
    );
}

export default ModelUpdateProduct;