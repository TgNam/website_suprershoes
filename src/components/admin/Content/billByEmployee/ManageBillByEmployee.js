import React, { useEffect, useState } from 'react';
import './ManageBillByEmployee.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdPayment, MdPayments } from "react-icons/md";
import ModalAddVoucher from './ModalAddVoucher';
import ModalCart from './ModalCart';
import ModalCustomer from './ModalCustomer';
import ModalPayBill from './ModalPayBill';
import { useSelector, useDispatch } from 'react-redux';
import { postCreateBill } from '../../../../redux/action/billByEmployeeAction';
import { FetchFindAddressSuccess } from '../../../../redux/action/addressAction';
const ManageCart = () => {
    const dispatch = useDispatch();
    // mã hóa đơn lấy từ database
    const { displayBills } = useSelector((state) => state.codeBill);
    useEffect(() => {
        dispatch(FetchFindAddressSuccess())
    }, [dispatch]);
    const [codeBill, setCodeBill] = useState("");


    const handleAddBill = () => {
        dispatch(postCreateBill(displayBills));
    }


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
                <ModalCart codeBill={codeBill} setCodeBill={setCodeBill} />
                <ModalCustomer />
                <ModalPayBill />
            </div>
        </div>
    )
}
export default ManageCart;