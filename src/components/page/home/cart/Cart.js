import React, { useState, useEffect } from 'react';
import './Cart.scss';
import { Link } from 'react-router-dom';
import { getCartByAccountId } from '../../../../Service/ApiCartSevice';
import productImage from '../images/product6.webp';
import { IoIosTrash } from "react-icons/io";
import { getProductNameByIds } from '../../../../Service/ApiProductService';
import { getPromotionByProductDetailsId } from '../../../../Service/ApiPromotionService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const [cartDetails, setCartDetails] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [promotionDetail, setPromotionDetail] = useState({});

    useEffect(() => {
        (async () => {
            try {
                let response = await getCartByAccountId(user?.id);
                setCartDetails(response.cartDetails);
                console.log(response)
                const productIds = response.cartDetails.map(cartDetail => cartDetail.productDetail.id);
                const productNameMap = await getProductNameByIds(productIds);
                setProductNames(productNameMap);

                // gọi api giảm giá//

                const promotionMap = await getPromotionByProductDetailsId(productIds);
                setPromotionDetail(promotionMap)

            } catch (error) {

            }

        })();
    }, [])

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            setSelectedItems(cartDetails.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleQuantityChange = (id, amount) => {
        setCartDetails(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const isAllSelected = cartDetails.length > 0 && selectedItems.length === cartDetails.length;
    const handlePayment = () => {
        navigate(`/Payment`);
    }
    return (
        <div id="cart" className="inner m-5">
            <h1 className="cart-title">GIỎ HÀNG</h1>
            {cartDetails && cartDetails.length > 0 ? (
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                                checked={isAllSelected}
                                            />
                                        </th> */}
                                        <th scope="col">#</th>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="cart-list">
                                    {cartDetails.map((item, index) => (
                                        <tr key={item.id}>
                                            {/* <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td> */}
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt={productNames[item.productDetail.id]}
                                                    className="img-fluid"
                                                    style={{ width: '50px' }}
                                                />
                                            </td>
                                            <td>
                                                {productNames[item.productDetail.id]}
                                                <br></br>
                                                <span style={{ fontSize: "16px", color: "#333333" }}>Màu: {item.productDetail.color.name}</span> -
                                                <span style={{ fontSize: "16px", color: "#333333" }}>  Size: {item.productDetail.size.name}</span>
                                            </td>
                                            <td>{item.productDetail.price} VND</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger me-1"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                {item.quantity}
                                                <button
                                                    className="btn btn-sm btn-outline-success ms-1"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>{item.productDetail.price * item.quantity} VND</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => setCartDetails(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id))}
                                                >
                                                    <IoIosTrash size="20px" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="cart-summary mb-3">
                            <span className="total-label">Tổng tiền:</span>
                            <h2>{cartDetails.reduce((total, item) => total + item.productDetail.price * item.quantity, 0)} VND</h2>
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
