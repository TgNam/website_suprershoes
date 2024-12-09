import React, { useState, useEffect } from 'react';
import './Cart.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getCartDetailByAccountId } from '../../../Service/ApiCartSevice';
import { IoIosTrash } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import ListImageProduct from '../../../image/ImageProduct';
import { MdOutlineDeleteForever } from "react-icons/md";
import { plusCartDetail, subtractCartDetail, deleteCartDetail } from '../../../Service/ApiCartSevice'
import { getAccountLogin } from "../../../Service/ApiAccountService";
import EventListener from '../../../event/EventListener'
import AuthGuard from '../../auth/AuthGuard';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [selectedCartDetails, setSelectedCartDetails] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [cartDetails, setCartDetails] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    setUser(data);
                    if (data?.id) {
                        const response = await getCartDetailByAccountId(data.id);
                        setCartDetails(response);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    const handlers = {
        UPDATE_CART: async () => {
            try {
                // Gọi API lấy lại thông tin giỏ hàng
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    if (data?.id) {
                        const response = await getCartDetailByAccountId(data.id);
                        setCartDetails(response);
                    }
                }
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        }
    };

    useEffect(() => {
        const totalPrice = calculateTotalCartPriceForSelected();
        setTotalCartPrice(totalPrice);
    }, [selectedCartDetails, cartDetails]);

    const calculateTotalCartPriceForSelected = () => {
        // Lọc các sản phẩm được chọn từ cartDetails
        const selectedProducts = cartDetails.filter(product =>
            selectedCartDetails.some(selected => selected.idCartDetail === product.idCartDetail)
        );

        // Tính tổng giá các sản phẩm được chọn
        return selectedProducts.reduce((total, productDetail) => {
            return total + calculatePricePerProductDetail(productDetail);
        }, 0);
    };


    const formatCurrency = (value) => {
        if (!value) return 0;
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value) || 0;
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const handlePayment = () => {
        if (selectedCartDetails.length > 0) {
            const listId = selectedCartDetails.map(item => item.idCartDetail);
            navigate(`/Payment`, { state: { selectedCartDetails: listId } });
        } else {
            toast.error("Bạn chưa chọn sản phẩm cần thanh toán");
        }
    };

    const calculatePricePerProductDetail = (productDetail) => {
        const { productDetailPrice, quantityCartDetail, quantityPromotionDetail, value } = productDetail;

        if (!value) {
            // Nếu không có khuyến mãi
            return productDetailPrice * quantityCartDetail;
        } else if (quantityCartDetail <= quantityPromotionDetail) {
            // Nếu có khuyến mãi và số lượng trong giỏ <= số lượng được áp dụng khuyến mãi
            return productDetailPrice * (1 - value / 100) * quantityCartDetail;
        } else {
            // Nếu có khuyến mãi và số lượng trong giỏ > số lượng được áp dụng khuyến mãi
            return (
                productDetailPrice * (1 - value / 100) * quantityPromotionDetail +
                productDetailPrice * (quantityCartDetail - quantityPromotionDetail)
            );
        }
    };
    const saleProductDetail = (productDetail) => {
        const { productDetailPrice, value } = productDetail;
        if (!value) {
            // Nếu không có khuyến mãi
            return productDetailPrice;
        } else {
            return productDetailPrice * (1 - value / 100);
        }
    }
    // Handle checkbox for all products  
    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            const allCartDetails = cartDetails.map(item => ({ idCartDetail: item.idCartDetail }));
            setSelectedCartDetails(allCartDetails);
        } else {
            setSelectedCartDetails([]);
        }
    };

    // Handle checkbox for individual products  
    const handleCheckProduct = (event, idCartDetail) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add product if not in selectedCartDetails  
            setSelectedCartDetails((prev) => {
                const existingProduct = prev.find(cartDetails => cartDetails.idCartDetail === idCartDetail);
                if (!existingProduct) {
                    return [...prev, { idCartDetail }];
                }
                return prev; // Return previous state if product is already checked  
            });
        } else {
            // Remove product if unchecked  
            setSelectedCartDetails((prev) => prev.filter(cartDetails => cartDetails.idCartDetail !== idCartDetail));
        }
    };
    const handleDeleteByIdCartDetail = async (idCartDetail) => {
        if (idCartDetail) {
            try {
                const response = await deleteCartDetail(idCartDetail);
                if (response.status === 200) {
                    toast.success(response.data);
                    const updatedCart = await getCartDetailByAccountId(user?.id);
                    setCartDetails(updatedCart); // Cập nhật lại giỏ hàng
                }
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm :", error);

                if (error.response) {
                    const statusCode = error.response.status;
                    const errorData = error.response.data;

                    if (statusCode === 400) {
                        // Xử lý lỗi validation (400 Bad Request)
                        if (Array.isArray(errorData)) {
                            errorData.forEach(err => {
                                toast.error(err); // Hiển thị từng lỗi trong mảng
                            });
                        } else {
                            toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                        }
                    } else if (statusCode === 409) {
                        const { mess } = errorData;
                        toast.error(mess);
                    } else {
                        // Xử lý các lỗi khác
                        toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                    }
                } else if (error.request) {
                    // Lỗi do không nhận được phản hồi từ server
                    toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
                } else {
                    // Lỗi khác (cấu hình, v.v.)
                    toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                }
            }
        }

    };
    const handleDecreaseQuantity = async (idCartDetail) => {
        if (idCartDetail) {
            try {
                const response = await subtractCartDetail(idCartDetail);
                if (response.status === 200) {
                    toast.success("Giảm số lượng thành công!");
                    const updatedCart = await getCartDetailByAccountId(user?.id);
                    setCartDetails(updatedCart); // Cập nhật lại giỏ hàng
                }
            } catch (error) {
                console.error("Lỗi khi giảm số lượng sản phẩm :", error);

                if (error.response) {
                    const statusCode = error.response.status;
                    const errorData = error.response.data;

                    if (statusCode === 400) {
                        // Xử lý lỗi validation (400 Bad Request)
                        if (Array.isArray(errorData)) {
                            errorData.forEach(err => {
                                toast.error(err); // Hiển thị từng lỗi trong mảng
                            });
                        } else {
                            toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                        }
                    } else if (statusCode === 409) {
                        const { mess } = errorData;
                        toast.error(mess);
                    } else {
                        // Xử lý các lỗi khác
                        toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                    }
                } else if (error.request) {
                    // Lỗi do không nhận được phản hồi từ server
                    toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
                } else {
                    // Lỗi khác (cấu hình, v.v.)
                    toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                }
            }
        }
    };
    const handleIncreaseQuantity = async (idCartDetail, idProductDetail) => {
        if (idCartDetail && idProductDetail) {
            try {
                const response = await plusCartDetail(idCartDetail, idProductDetail);
                if (response.status === 200) {
                    toast.success("Thêm thành công");
                    const updatedCart = await getCartDetailByAccountId(user?.id);
                    setCartDetails(updatedCart); // Cập nhật lại giỏ hàng
                }
            } catch (error) {
                console.error("Lỗi khi thêm số lượng sản phẩm :", error);

                if (error.response) {
                    const statusCode = error.response.status;
                    const errorData = error.response.data;

                    if (statusCode === 400) {
                        // Xử lý lỗi validation (400 Bad Request)
                        if (Array.isArray(errorData)) {
                            errorData.forEach(err => {
                                toast.error(err); // Hiển thị từng lỗi trong mảng
                            });
                        } else {
                            toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                        }
                    } else if (statusCode === 409) {
                        const { mess } = errorData;
                        toast.error(mess);
                    } else {
                        // Xử lý các lỗi khác
                        toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                    }
                } else if (error.request) {
                    // Lỗi do không nhận được phản hồi từ server
                    toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
                } else {
                    // Lỗi khác (cấu hình, v.v.)
                    toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                }
            }
        }
    };

    return (
        <AuthGuard>
            <div id="cart" className="inner m-5 p-5">
                <EventListener handlers={handlers} />
                <h1 className="cart-title">GIỎ HÀNG</h1>
                {cartDetails && cartDetails.length > 0 ? (
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="flexCheckAll"
                                                    checked={isAllChecked}
                                                    onChange={handleCheckAll}
                                                />
                                            </th>
                                            <th scope="col">#</th>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">Sản phẩm</th>
                                            <th className='text-center'>Giá</th>
                                            <th className='text-center'>Số lượng</th>
                                            <th scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="cart-list">
                                        {cartDetails.map((item, index) => (
                                            <tr key={item.idCartDetail}>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`flexCheckCartDetails-${item.idCartDetails}`} // Fixed id syntax  
                                                        checked={selectedCartDetails.some(cartDetails => cartDetails.idCartDetail === item.idCartDetail)} // Check for inclusion correctly  
                                                        onChange={(event) => handleCheckProduct(event, item.idCartDetail)}
                                                    />
                                                </td>
                                                <th scope="row">{index + 1}</th>
                                                <td><ListImageProduct id={item.idProduct} maxWidth={'100px'} maxHeight={'100px'} /></td>
                                                <td>
                                                    {item.nameProduct}
                                                    <br></br>
                                                    <span style={{ fontSize: "16px", color: "#333333" }}>Màu: {item.nameColor}</span> -
                                                    <span style={{ fontSize: "16px", color: "#333333" }}>  Size: {item.nameSize}</span>
                                                </td>
                                                <td>{formatCurrency(saleProductDetail(item))} VND</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <CiCircleMinus className="me-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleDecreaseQuantity(item.idCartDetail)} />
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip>Giá trị hiện tại là {item.quantityCartDetail}</Tooltip>}
                                                        >
                                                            <Form.Control
                                                                type="number"
                                                                readOnly
                                                                value={item.quantityCartDetail}
                                                                size="sm"
                                                                className="text-center mx-1"
                                                                style={{ width: `${Math.max(5, String(item.quantityCartDetail).length)}ch`, fontSize: '1.25rem' }}
                                                            />
                                                        </OverlayTrigger>
                                                        <CiCirclePlus className="ms-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleIncreaseQuantity(item.idCartDetail, item.idProductDetail)} />
                                                    </div>
                                                </td>

                                                <td className='text-center'><MdOutlineDeleteForever className='text-danger' size={'30px'} onClick={() => handleDeleteByIdCartDetail(item.idCartDetail)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <div className="cart-summary mb-3">
                                <span className="total-label">Tổng tiền:</span>
                                <h2>{formatCurrency(totalCartPrice)} VND</h2>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-primary w-100" onClick={handlePayment}>Tiến hành thanh toán</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart text-center">
                        <h1>Giỏ hàng của bạn hiện chưa có sản phẩm nào</h1>
                        <img
                            src="https://banbuonuytin.com/tp/T0213/img/tmp/cart-empty.png"
                            alt="empty-cart"
                            className="img-fluid"
                        />
                    </div>
                )}
            </div>
        </AuthGuard>
    );
}

export default Cart;
