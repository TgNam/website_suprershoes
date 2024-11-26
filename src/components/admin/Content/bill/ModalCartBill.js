import React, { useEffect, useState } from 'react';
import { FaMoneyBillAlt } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import TableCart from './TableCartBill';
import Image from 'react-bootstrap/Image';
import imageCart from '../billByEmployee/image/imageCart.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { CodeBillByEmployee, findBillByCodeAndEmployee } from '../../../../redux/action/billByEmployeeAction';
import { fetchBillDetailByEmployeeByCodeBill } from '../../../../redux/action/billDetailByEmployeeAction';
const ModalCart = ({ codeBill, setCodeBill }) => {
    const dispatch = useDispatch();
    const { displayBills } = useSelector((state) => state.codeBill);
    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);

    useEffect(() => {
        dispatch(CodeBillByEmployee());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
    }, [dispatch, codeBill]);

    const handleClickNav = (item) => {
        dispatch(findBillByCodeAndEmployee(item))
        setCodeBill(item)
    }
    return (
        <>
            <div className='cart-detail'>
                <div className='table-product'>
                    {listBillDetailOrder && listBillDetailOrder.length > 0 ? (
                        <TableCart codeBill={codeBill} />
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
        </>
    )
}
export default ModalCart;