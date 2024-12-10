import React, { useEffect, useState } from 'react';
import './ManageBillByEmployee.scss';
import Button from 'react-bootstrap/Button';
import ModalCart from './ModalCart';
import ModalCustomer from './ModalCustomer';
import ModalPayBill from './ModalPayBill';
import { useSelector, useDispatch } from 'react-redux';
import { postCreateBill } from '../../../../redux/action/billByEmployeeAction';
import { FetchFindAddressSuccess } from '../../../../redux/action/addressAction';
import { fetchPostsVoucherDetailSuccess } from '../../../../redux/action/voucherBillAction';
import { fetchPostsPayBillOrderSuccess } from '../../../../redux/action/PayBillOrderAction';
import { fetchAllPayBillOrder } from '../../../../redux/action/PayBillOrderAction';
import AuthGuard from "../../../auth/AuthGuard";
import RoleBasedGuard from "../../../auth/RoleBasedGuard";
const ManageCart = () => {
    const dispatch = useDispatch();
    // mã hóa đơn lấy từ database
    const { displayBills } = useSelector((state) => state.codeBill);
    useEffect(() => {
        dispatch(FetchFindAddressSuccess())
        dispatch(fetchPostsVoucherDetailSuccess())
        dispatch(fetchPostsPayBillOrderSuccess())
    }, [dispatch]);
    const [codeBill, setCodeBill] = useState("");
    useEffect(() => {
        if (codeBill) {
            dispatch(fetchAllPayBillOrder(codeBill));
            dispatch(fetchPostsVoucherDetailSuccess())
        } else {
            dispatch(FetchFindAddressSuccess())
        }
    }, [codeBill]);

    const handleAddBill = () => {
        dispatch(postCreateBill(displayBills));
    }


    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN", "EMPLOYEE"]}>
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
                        <ModalCustomer codeBill={codeBill} />
                        {codeBill ? (<ModalPayBill codeBill={codeBill} setCodeBill={setCodeBill} />) : ""}
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard>
    )
}
export default ManageCart;