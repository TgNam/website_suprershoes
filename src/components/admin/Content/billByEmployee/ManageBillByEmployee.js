import React, { useEffect, useState } from 'react';
import './ManageBillByEmployee.scss';
import Button from 'react-bootstrap/Button';
import ModalCart from './ModalCart';
import ModalCustomer from './ModalCustomer';
import ModalPayBill from './ModalPayBill';
import { useSelector, useDispatch } from 'react-redux';
import { postCreateBill, CodeBillByEmployee, fetchPostsBillSuccess } from '../../../../redux/action/billByEmployeeAction';
import { FetchFindAddressSuccess } from '../../../../redux/action/addressAction';
import { fetchPostsVoucherDetailSuccess } from '../../../../redux/action/voucherBillAction';
import { fetchPostsPayBillOrderSuccess } from '../../../../redux/action/PayBillOrderAction';
import { fetchAllPayBillOrder } from '../../../../redux/action/PayBillOrderAction';
import { findBillResponseByCodeBill } from '../../../../Service/ApiBillByEmployeeService'
import { toast } from 'react-toastify';
import EventListener from '../../../../event/EventListener'
import AuthGuard from "../../../auth/AuthGuard";
import RoleBasedGuard from "../../../auth/RoleBasedGuard";
const ManageCart = () => {
    const dispatch = useDispatch();
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
    const checkPayBill = async () => {
        console.log("check load");
        if (codeBill) {
            try {
                const findBill = await findBillResponseByCodeBill(codeBill);
                if (findBill && findBill.status === 200) {
                    const data = findBill.data;
                    if (data && data.status && data.status !== "WAITING_FOR_PAYMENT") {
                        setCodeBill("");
                        dispatch(CodeBillByEmployee());
                        dispatch(fetchPostsBillSuccess({}));
                        toast.warning("Hóa đơn không còn ở trạng thái chờ thanh toán");
                    }
                } else {
                    console.error("Dữ liệu không hợp lệ từ API:", findBill);
                }
            } catch (error) {
                console.error("Lỗi hiển thị hóa đơn hoặc lỗi kết nối:", error);
                setCodeBill("");
                dispatch(CodeBillByEmployee());
                toast.error("Không thể kiểm tra hóa đơn. Vui lòng thử lại sau.");
            }
        }
    };

    const handlers = {
        PAYBILL_SUCCESS: checkPayBill
    };

    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN", "EMPLOYEE"]}>
                <div className="cart">
                    <EventListener handlers={handlers} />
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