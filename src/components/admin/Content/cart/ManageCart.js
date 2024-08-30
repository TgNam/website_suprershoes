import React, { useLayoutEffect, useState } from 'react';
import './ManageCart.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import TableCart from './TableCart';
import Image from 'react-bootstrap/Image';
import imageCart from './image/imageCart.jpg';
import ModalAddCustomer from './ModalAddCustomer';
const ManageCart = () => {

    const products = [];
    const customer = { id: 1, name: "John Doe", age: 30 };
    const [checkCart, setCheckCart] = useState(false);
    const handleAddBill = () => {
        setCheckCart(!checkCart)
    }
    useLayoutEffect(() => {

    });
    return (
        <div className="cart">
            <div className='cart-title'>
                <h3>Quản lý bán hàng</h3>
                <hr />
            </div>
            <div className='button-add-cart mb-3'>
                <Button variant="primary" onClick={handleAddBill}>Thêm mới đơn hàng</Button>
            </div>
            <div className='content'>
                <div className='nav-tab mb-3'>
                    <Nav variant="tabs" defaultActiveKey="HD001">
                        <Nav.Item>
                            <Nav.Link eventKey="HD001">HD001</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="HD002">HD002</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="HD003">HD003</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="HD004">HD004</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="HD005">HD005</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <h5 className='text-start'> Đơn hàng HD001 :</h5>
                    <Button variant="primary" className=''>Thêm sản phẩm</Button>
                </div>
                <div className='cart-detail'>
                    <h5 className='m-2'>Giỏ hàng:</h5>
                    <div className='table-product'>
                        {checkCart ? (
                            <TableCart />
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center p-2">
                                <Image
                                    src={imageCart}
                                    className="text-center"
                                    style={{ width: '300px', height: 'auto' }}
                                />
                                <p className="mt-3">Không có sản phẩm nào trong giỏ hàng</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='customer-detail'>
                    <div className="d-flex justify-content-between">
                        <div className='title'>
                            <h5>Thêm khách hàng</h5>
                        </div>
                        <div className='add-customer'>
                            <ModalAddCustomer />
                        </div>
                    </div>
                    <hr />
                    <div>
                        {customer && customer.length > 0 ? (
                            <div>
                                <div className='row mb-3'>
                                    <h6 className='col'>Tên khách hàng: </h6>
                                    <h6 className='col'>Nguyễn Trường Nam </h6>
                                </div>
                                <div className='row mb-3'>
                                    <h6 className='col'>Số điện thoại: </h6>
                                    <h6 className='col'>0983729351 </h6>
                                </div>
                                <div className='row mb-3'>
                                    <h6 className='col'>Địa chỉ: </h6>
                                    <h6 className='col'>QL37, Lê Lợi, Chí Linh, Hải Dương, Việt Nam</h6>
                                </div>
                            </div>
                        ) : (
                            <h6>Tên khách hàng: <span className="badge text-bg-secondary">Khách lẻ</span></h6>
                        )}
                    </div>
                </div>
                <div className='pay-money'>
                    <div>
                        <div className='title'>
                            <h5>Thêm khách hàng</h5>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}
export default ManageCart;