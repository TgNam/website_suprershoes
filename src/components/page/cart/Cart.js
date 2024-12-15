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
import { findListPayProductDetail } from '../../../Service/ApiProductDetailService';
import { createCartDetailByCartLocal } from '../../../Service/ApiCartSevice';
import { getAccountLogin } from "../../../Service/ApiAccountService";
import { initialize } from '../../../redux/action/authAction';
import { getCart, updateCartWithExpiration, deleteProductDetailToCart, plusProductDetailToCart, subtractProductDetailToCart } from '../../managerCartLocal/CartManager'
import EventListener from '../../../event/EventListener'
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [selectedCartDetails, setSelectedCartDetails] = useState([]);
    const [selectedProductDetails, setSelectedProductDetails] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [cartDetails, setCartDetails] = useState([]);
    const [user, setUser] = useState(null);
    const CART_KEY = "cartLocal";
    const checkLogin = async () => {
        setSelectedCartDetails([]);
        setSelectedProductDetails([]);
        const token = localStorage.getItem('accessToken');
        if (!token) {
            try {
                if (getCart().items && getCart().items.length > 0) {
                    try {
                        let response = await findListPayProductDetail(getCart().items);
                        if (response.status === 200) {
                            const validProducts = response.data?.filter((product) => !product.error);
                            setCartDetails(validProducts);
                            const productDetailPromoRequests = validProducts.map((product) => ({
                                idProductDetail: product.idProductDetail,
                                quantity: product.quantityBuy,
                            }));
                            updateCartWithExpiration(productDetailPromoRequests);
                            const invalidProducts = response.data?.filter((product) => product.error);
                            invalidProducts.forEach((product) => {
                                toast.error(product.error);
                            });
                            if (validProducts.length <= 0) {
                                toast.error("Không có sản phẩm cần thanh toán")
                                navigate('/')
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        navigate('/')
                    }
                } else {
                    setCartDetails([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng local:", error);
            }
            setUser(null);
            dispatch(initialize({ isAuthenticated: false, user: null }))
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        if (getCart().items && getCart().items.length > 0) {
                            for (const item of getCart().items) {
                                try {
                                    const response = await createCartDetailByCartLocal(item, data.id);
                                    if (response.status === 200) {
                                        await deleteProductDetailToCart(item.idProductDetail);
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                        const response = await getCartDetailByAccountId(data.id);
                        if (response.status === 200) {
                            setCartDetails(response.data);
                        }
                    } catch (error) {
                        window.location.href = "/cart";
                        console.error(error);
                    }
                    setUser(data);
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
        const fetchLogin = async () => {
            await checkLogin();
        };
        fetchLogin();
    }, [dispatch]);


    useEffect(() => {
        const totalPrice = calculateTotalCartPriceForSelected();
        setTotalCartPrice(totalPrice);
    }, [selectedCartDetails, selectedProductDetails, cartDetails]);

    const calculateTotalCartPriceForSelected = () => {

        // Lọc các sản phẩm được chọn từ cartDetails
        let selectedProducts = cartDetails.filter(product =>
            selectedProductDetails.some(selected => selected.idProductDetail === product.idProductDetail)
        );
        if (user) {
            selectedProducts = cartDetails.filter(product =>
                selectedCartDetails.some(selected => selected.idCartDetail === product.idCartDetail)
            );
        }
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
        if (user) {
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
        } else {
            if (selectedProductDetails.length > 0) {
                const cartItems = getCart().items;
                const filteredItems = cartItems.filter(item =>
                    selectedProductDetails.some(selected => selected.idProductDetail === item.idProductDetail)
                );
                navigate(`/Payment`, {
                    state: {
                        listProductDetails: filteredItems,
                        method: false
                    }
                });
            }
            else {
                toast.error("Bạn chưa chọn sản phẩm cần thanh toán");
            }
        }
    };

    const calculatePricePerProductDetail = (productDetail) => {
        const { productDetailPrice, quantityCartDetail, quantityBuy, quantityPromotionDetail, value } = productDetail;
        const quantity = user ? quantityCartDetail : quantityBuy;
        if (!value) {
            // Nếu không có khuyến mãi
            return productDetailPrice * quantity;
        } else if (quantity <= quantityPromotionDetail) {
            // Nếu có khuyến mãi và số lượng trong giỏ <= số lượng được áp dụng khuyến mãi
            return productDetailPrice * (1 - value / 100) * quantity;
        } else {
            // Nếu có khuyến mãi và số lượng trong giỏ > số lượng được áp dụng khuyến mãi
            return (
                productDetailPrice * (1 - value / 100) * quantityPromotionDetail +
                productDetailPrice * (quantity - quantityPromotionDetail)
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
        if (user) {
            if (isChecked) {
                const allCartDetails = cartDetails.map(item => ({ idCartDetail: item.idCartDetail }));
                setSelectedCartDetails(allCartDetails);
            } else {
                setSelectedCartDetails([]);
            }
        } else {
            if (isChecked) {
                const allProductDetail = cartDetails.map(item => ({ idProductDetail: item.idProductDetail }));
                setSelectedProductDetails(allProductDetail);
            } else {
                setSelectedProductDetails([]);
            }
        }

    };

    // Handle checkbox for individual products  
    const handleCheckProduct = (event, id) => {
        const isChecked = event.target.checked;
        if (user) {
            if (isChecked) {
                setSelectedCartDetails((prev) => [...prev, { idCartDetail: id }]);
            } else {
                setSelectedCartDetails((prev) => prev.filter(cartDetails => cartDetails.idCartDetail !== id));
            }
        } else {
            if (isChecked) {
                setSelectedProductDetails((prev) => [...prev, { idProductDetail: id }]);
            } else {
                setSelectedProductDetails((prev) => prev.filter(cartDetails => cartDetails.idProductDetail !== id));
            }
        }
    };
    const deleteByIdCartDetail = async (idProduct, user) => {
        if (idProduct) {
            try {
                const response = await deleteCartDetail(idProduct);
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
    const subtractByIdCartDetail = async (idProduct, user) => {
        if (idProduct) {
            try {
                const response = await subtractCartDetail(idProduct);
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
    const plusByIdCartDetail = async (idProduct, user) => {
        if (idProduct) {
            try {
                const response = await plusCartDetail(idProduct);
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
    const handleDeleteByIdCartDetail = async (idProduct) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            await deleteProductDetailToCart(idProduct);
            checkLogin();
            toast.error("Xóa thành công!")
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        deleteByIdCartDetail(idProduct, data);
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
    const handleDecreaseQuantity = async (idProduct) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            const isSuccess = await subtractProductDetailToCart(idProduct);
            if (isSuccess) {
                checkLogin();
                toast.success("Trừ số lượng thành công!");
            } else {
                toast.error("Trừ số lượng bại!");
            }
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        subtractByIdCartDetail(idProduct, data);
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
    const handleIncreaseQuantity = async (idProduct) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            const isSuccess = await plusProductDetailToCart(idProduct);
            if (isSuccess) {
                checkLogin();
                toast.success("Thêm thành công!");
            } else {
                toast.error("Thêm thất bại!");
            }
        } else {
            try {
                let users = await getAccountLogin();
                if (users.status === 200) {
                    const data = users.data;
                    try {
                        plusByIdCartDetail(idProduct, data);
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
    const checkBox = (item) => {
        if (user) {
            return selectedCartDetails.some(cartDetails => cartDetails.idCartDetail === item.idCartDetail);
        } else {
            return selectedProductDetails.some(cartDetails => cartDetails.idProductDetail === item.idProductDetail);
        }
    };
    const handlers = {
        UPDATE_CART: checkLogin
    };
    window.addEventListener('storage', (event) => {
        if (event.key === CART_KEY) {
            getCart();
            checkLogin();
        }
    });
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
                                        <tr key={user ? item.idCartDetail : item.idProductDetail}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`flexCheckCartDetails-${user ? item.idCartDetail : item.idProductDetail}`} // Fixed id syntax  
                                                    checked={checkBox(item)} // Check for inclusion correctly  
                                                    onChange={(event) => handleCheckProduct(event, user ? item.idCartDetail : item.idProductDetail)}
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
                                                    <CiCircleMinus className="me-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleDecreaseQuantity(user ? item.idCartDetail : item.idProductDetail)} />
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>Giá trị hiện tại là {user ? item.quantityCartDetail : item.quantityBuy}</Tooltip>}
                                                    >
                                                        <Form.Control
                                                            type="number"
                                                            readOnly
                                                            value={user ? item.quantityCartDetail : item.quantityBuy}
                                                            size="sm"
                                                            className="text-center mx-1"
                                                            style={{ width: `${Math.max(5, String(user ? item.quantityCartDetail : item.quantityBuy).length)}ch`, fontSize: '1.25rem' }}
                                                        />
                                                    </OverlayTrigger>
                                                    <CiCirclePlus className="ms-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleIncreaseQuantity(user ? item.idCartDetail : item.idProductDetail)} />
                                                </div>
                                            </td>

                                            <td className='text-center'><MdOutlineDeleteForever className='text-danger' size={'30px'} onClick={() => handleDeleteByIdCartDetail(user ? item.idCartDetail : item.idProductDetail)} /></td>
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
