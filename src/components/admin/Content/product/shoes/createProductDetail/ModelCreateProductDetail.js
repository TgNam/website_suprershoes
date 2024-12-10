import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ModelCreateProductDetail.scss';
import InfoProduct from './InfoProduct';
import TableProductDetail from './TableProductDetail';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';
import SizeAndColor from './SizeAndColor';
// import { createNewNewProduct } from '../../../../../../redux/action/productAction'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { findProductByIdProduct, updateProduct } from '../../../../../../redux/action/productAction'
import { fetchAllProductDetail } from '../../../../../../redux/action/productDetailAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAllProductProductDetail } from '../../../../../../redux/action/productAction'
import { postCreateNewListProductDetail } from '../../../../../../Service/ApiProductDetailService'
import swal from 'sweetalert';
const ModelCreateProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const idProduct = searchParams.get('idProduct');

    const productRedux = useSelector((state) => state.product.product);
    const productDetailRedux = useSelector((state) => state.productDetail.listProductDetail);

    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const [productDetail, setProductDetail] = useState([]);
    const [selectedProductDetail, setSelectedProductDetail] = useState([]);

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

    const generateProductDetails = () => {
        if (!selectedSizes.length || !selectedColors.length) {
            setProductDetail([]);
            return;
        }

        const details = [];
        selectedColors.forEach((colorId) => {
            selectedSizes.forEach((sizeId) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong productDetailRedux chưa
                const isExisting = productDetailRedux.some(
                    (existingProduct) =>
                        existingProduct.idColor === colorId && existingProduct.idSize === sizeId
                );

                // Nếu chưa tồn tại thì thêm vào danh sách
                if (!isExisting) {
                    details.push({
                        quantity: 1,
                        price: 0,
                        idColor: colorId,
                        idSize: sizeId,
                        listImage: [],
                        previewImages: [],
                    });
                }
            });
        });

        setProductDetail(details);
    };

    useEffect(() => {
        generateProductDetails();
    }, [selectedSizes, selectedColors]);

    const handleSubmitUpdate = async () => {
        try {
            const confirm = await swal({
                title: "Xác nhận thêm mới",
                text: "Bạn có chắc chắn muốn thêm biến thể sản phẩm?",
                icon: "warning",
                buttons: ["Hủy bỏ", "Xác nhận"],
                dangerMode: true,
            });

            if (!confirm) {
                return;
            }

            if (selectedProductDetail.length === 0) {
                await swal({
                    title: "Thất bại",
                    text: "Không có biến thể sản phẩm nào được chọn. Vui lòng thử lại.",
                    icon: "error",
                    button: "OK",
                });
                return;
            }
            if (idProduct == null) {
                await swal({
                    title: "Thất bại",
                    text: "Không có biến thể sản phẩm nào được chọn. Vui lòng thử lại.",
                    icon: "error",
                    button: "OK",
                });
                return;
            }
            try {
                const response = await postCreateNewListProductDetail(idProduct, selectedProductDetail);

                if (response.status === 200) {
                    await swal({
                        title: "Thành công",
                        text: "Sản phẩm đã được cập nhật thành công.",
                        icon: "success",
                        button: "OK",
                    });
                    dispatch(fetchAllProductProductDetail());
                    navigate('/admins/manage-shoe');
                    toast.success("Thêm biến thể mới thành công!");
                    return;
                }

                // Trường hợp khác ngoài `200` không thành công
                await swal({
                    title: "Thất bại",
                    text: "Cập nhật sản phẩm không thành công. Vui lòng thử lại.",
                    icon: "error",
                    button: "OK",
                });
            } catch (error) {
                console.error("Lỗi khi thêm biến thể mới:", error);
                handleError(error);
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

    const handleError = (error) => {
        if (error.response) {
            const statusCode = error.response.status;
            const errorData = error.response.data;

            if (statusCode === 400) {
                if (Array.isArray(errorData)) {
                    errorData.forEach(err => toast.error(err)); // Hiển thị từng lỗi trong mảng
                } else {
                    toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                }
            } else if (statusCode === 409) {
                const { mess } = errorData;
                toast.error(mess);
            } else {
                toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
            }
        } else if (error.request) {
            toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
        } else {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="model-create-product container-fluid" >
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm biến thể sản phẩm</h4>
                <InfoProduct
                    product={productRedux} />
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
                <SizeAndColor
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                />
            </div>
            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                    {productDetail.length > 0 && (
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
                        product={productRedux}
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

export default ModelCreateProductDetail;