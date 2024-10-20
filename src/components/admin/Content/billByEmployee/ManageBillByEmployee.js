import React, { useEffect, useLayoutEffect, useState } from 'react';
import './ManageBillByEmployee.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import TableCart from './TableCart';
import Image from 'react-bootstrap/Image';
import imageCart from './image/imageCart.jpg';
import ModalAddCustomer from './ModalAddCustomer';
import Form from 'react-bootstrap/Form';
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaUser } from 'react-icons/fa';
import { MdPayment, MdPayments } from "react-icons/md";
import ModalAddVoucher from './ModalAddVoucher';
import ModalAddProduct from './ModalAddProduct';
import PendingBill from './PendingBill';
import { useSelector, useDispatch } from 'react-redux';
import { CodeBillByEmployee, postCreateBill } from '../../../../redux/action/billByEmployeeAction';
const ManageCart = () => {
    const dispatch = useDispatch();
    // mã hóa đơn lấy từ database
    const { displayBills } = useSelector((state) => state.codeBill);
    const products = [];
    const customer = { id: 1, name: "John Doe", age: 30 };
    const [checkCart, setCheckCart] = useState(false);

    const [code, setCode] = useState("");


    const handleAddBill = () => {
        dispatch(postCreateBill(displayBills));
    }

    const handleClickNav = (item) => {
        setCode(item)
    }
    useEffect(() => {
        dispatch(CodeBillByEmployee());
    }, [dispatch]);
    return (
        <div className="cart">
            <div className='cart-title'>
                <h3>Quản lý bán hàng</h3>
                <hr />
            </div>
            <div className='button-add-cart mb-3'>
                <Button variant="primary" onClick={handleAddBill}>Thêm mới đơn hàng</Button>
            </div>
            {displayBills ? (
                <div className='content'>
                    <div className='nav-tab-bill mb-3'>
                        <Nav variant="tabs" className="my-nav-tabs">
                            {displayBills.slice(0, 5).map((item, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link className={code === item ? "active" : ""} onClick={() => handleClickNav(item)}>
                                        {item.split('-')[0]}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                            <PendingBill />
                        </Nav>

                    </div>
                    <div className='d-flex justify-content-between mb-3'>
                        <h5 className='text-start pt-1'><FaMoneyBillAlt /> Đơn hàng {code.split('-')[0]} :</h5>
                        {code ? (<ModalAddProduct code={code} />) : ""}
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
                                <h5><FaUser /> Thêm khách hàng</h5>
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
                                <h5>Thanh toán hóa đơn</h5>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-6 mt-5'>
                                <Form>
                                    <Form.Group className="mb-4" >
                                        <Form.Control type="text" placeholder="Tên khách hàng" />
                                    </Form.Group>
                                    <Form.Group className="mb-4" >
                                        <Form.Control type="text" placeholder="Số điện thoại khách hàng" />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control type="text" placeholder="Địa chỉ khách hàng" />
                                    </Form.Group>
                                    <div className='row m-1 mb-4'>
                                        <Form.Select aria-label="Default select example" className='col m-1'>
                                            <option>Chọn tỉnh</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example" className='col m-1'>
                                            <option>Chọn quận</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example" className='col m-1'>
                                            <option>Chọn phường xã</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>
                                    <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} placeholder='Ghi chú' />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='col-6'>
                                <h5><MdPayments /> Thông tin thanh toán</h5>
                                <hr />
                                <div className='d-flex justify-content-between mb-3'>
                                    <h6 className='pt-2'>Khách thanh toán: </h6>
                                    <Button style={{ width: '100px' }}><MdPayment /></Button>

                                    <h6 className='pt-2'>0 VND </h6>
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <h6 className='pt-2'>Mã giảm giá: </h6>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            readOnly
                                        />
                                    </Form.Group>
                                    <ModalAddVoucher />
                                </div>
                                <div className='d-flex justify-content-start mb-3'>
                                    <h6 className='pt-2'>Trả sau: </h6>
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            className='m-2 ms-5'
                                        />
                                    </Form>
                                </div>
                                <div className='d-flex justify-content-start mb-3'>
                                    <h6 className='pt-2'>Giao hàng: </h6>
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            className='m-2 ms-5'
                                        />
                                    </Form>
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <h6 className='pt-2'>Tiền hàng: </h6>
                                    <h6 className='pt-2'>0 VND </h6>
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <h6 className='pt-2'>Giảm giá: </h6>
                                    <h6 className='pt-2'>0 VND </h6>
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <h5 className='pt-2'>Tổng tiền: </h5>
                                    <h5 className='pt-2' style={{ color: 'red' }}>0 VND </h5>
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <Button style={{ width: '30%' }}>Xác nhận thanh toán</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center p-2">
                    <Image
                        src={imageCart}
                        className="text-center"
                        style={{ width: '300px', height: 'auto' }}
                    />
                    <p className="mt-3">Hiện tại chưa có giỏ hàng nào</p>
                </div>
            )}

        </div>
    )
}
export default ManageCart;