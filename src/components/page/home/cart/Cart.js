import React, { useState } from 'react';
import './Cart.scss';
import { Link } from 'react-router-dom';
import productImage from '../images/product6.webp'; 
import { IoIosTrash } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Cart = () => {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Giày thể thao Nike Air',
            price: 120000,
            quantity: 2,
            image: productImage 
        },
        {
            id: 2,
            name: 'Giày Adidas Ultra Boost',
            price: 150000,
            quantity: 1,
            image: productImage 
        }
    ]);
    const [selectedItems, setSelectedItems] = useState([]);
    const paths = { checkout: '/checkout' };

    const handleCheckboxChange = (id) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            setSelectedItems(cart.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleQuantityChange = (id, amount) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
                    : item
            )
        );
    };

    const isAllSelected = cart.length > 0 && selectedItems.length === cart.length;

    return (
        <div id="cart" className="inner m-5">
            <h1 className="cart-title">GIỎ HÀNG</h1>
            {cart && cart.length > 0 ? (
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                                checked={isAllSelected}
                                            />
                                        </th>
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
                                    {cart.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid"
                                                    style={{ width: '50px' }}
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.price} VND</td>
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
                                            <td>{item.price * item.quantity} VND</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id))}
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
                            <h2>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} VND</h2>
                        </div>
                        <div className="text-end">
                            <Link to={paths.checkout} className="btn btn-primary w-100">
                                Tiến hành thanh toán
                            </Link>
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
