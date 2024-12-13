import React, { useState, useEffect } from 'react';
import './Cart.scss';
import { toast } from 'react-toastify';
import { getCartDetailByAccountId } from '../../../Service/ApiCartSevice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import ListImageProduct from '../../../image/ImageProduct';
import { MdOutlineDeleteForever } from "react-icons/md";
import { plusCartDetail, subtractCartDetail, deleteCartDetail } from '../../../Service/ApiCartSevice'
import { getAccountLogin } from "../../../Service/ApiAccountService";
import { initialize } from '../../../redux/action/authAction';
import EventListener from '../../../event/EventListener'
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [selectedCartDetails, setSelectedCartDetails] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [cartDetails, setCartDetails] = useState([]);

    const checkLogin = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            try {
                const cartKey = "cartLocal";
                const storedCart = JSON.parse(localStorage.getItem(cartKey)) || { items: [], expiration: null };
                console.log(storedCart);
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng local:", error);
            }
            dispatch(initialize({ isAuthenticated: false, user: null }))
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        // const localCart = JSON.parse(localStorage.getItem("cartDetails"));
                        // if (localCart) {
                        //     setCartDetails(localCart);
                        // } else {
                        //     toast.info("Không có sản phẩm nào trong giỏ hàng.");
                        // }
                        const response = await getCartDetailByAccountId(data.id);
                        if (response.status === 200) {
                            setCartDetails(response.data);
                        }
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    dispatch(initialize({ isAuthenticated: true, data }))
                } else {
                    dispatch(initialize({ isAuthenticated: false, user: null }))
                }
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }))
                console.error(error);
            }
        }
    }
    useEffect(() => {
        checkLogin();
    }, [dispatch]);



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

            navigate(`/Payment`, {
                state: {
                    selectedCartDetails: listId,
                    method: true
                }
            });
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
    const deleteByIdCartDetail = async (idCartDetail, user) => {
        if (idCartDetail) {
            try {
                const response = await deleteCartDetail(idCartDetail);
                if (response.status === 200) {
                    try {
                        const updatedCart = await getCartDetailByAccountId(user.id);
                        if (updatedCart.status === 200) {
                            setCartDetails(updatedCart.data);
                        }
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    toast.success(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm :", error);
            }

        }
    }
    const subtractByIdCartDetail = async (idCartDetail, user) => {
        if (idCartDetail) {
            try {
                const response = await subtractCartDetail(idCartDetail);
                if (response.status === 200) {
                    try {
                        const updatedCart = await getCartDetailByAccountId(user.id);
                        if (updatedCart.status === 200) {
                            setCartDetails(updatedCart.data);
                        }
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    toast.success("Trừ số lượng thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm :", error);
            }

        }
    }
    const plusByIdCartDetail = async (idCartDetail, idProductDetail, user) => {
        if (idCartDetail) {
            try {
                const response = await plusCartDetail(idCartDetail, idProductDetail);
                if (response.status === 200) {
                    try {
                        const updatedCart = await getCartDetailByAccountId(user.id);
                        if (updatedCart.status === 200) {
                            setCartDetails(updatedCart.data);
                        }
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    toast.success("Thêm thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm :", error);
            }

        }
    }
    const handleDeleteByIdCartDetail = async (idCartDetail) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {

        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        deleteByIdCartDetail(idCartDetail, data);
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    dispatch(initialize({ isAuthenticated: true, data }))
                } else {
                    dispatch(initialize({ isAuthenticated: false, user: null }))
                }
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }))
                console.error(error);
            }
        }
    };
    const handleDecreaseQuantity = async (idCartDetail) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {

        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        subtractByIdCartDetail(idCartDetail, data);
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    dispatch(initialize({ isAuthenticated: true, data }))
                } else {
                    dispatch(initialize({ isAuthenticated: false, user: null }))
                }
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }))
                console.error(error);
            }
        }
    };
    const handleIncreaseQuantity = async (idCartDetail, idProductDetail) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {

        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        plusByIdCartDetail(idCartDetail, idProductDetail, data);
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    dispatch(initialize({ isAuthenticated: true, data }))
                } else {
                    dispatch(initialize({ isAuthenticated: false, user: null }))
                }
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }))
                console.error(error);
            }
        }
    };
    const handlers = {
        UPDATE_CART: checkLogin
    };
    return (
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
    );
}

export default Cart;
