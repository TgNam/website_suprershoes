import React, { useEffect, useState } from 'react';
import { FaMoneyBillAlt } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import TableCart from './TableCart';
import Image from 'react-bootstrap/Image';
import imageCart from './image/imageCart.jpg';
import PendingBill from './PendingBill';
import ModalAddProduct from './ModalAddProduct';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import EventListener from '../../../../event/EventListener'
import { CodeBillByEmployee, findBillByCodeAndEmployee, fetchPostsBillSuccess } from '../../../../redux/action/billByEmployeeAction';
import { fetchBillDetailByEmployeeByCodeBill } from '../../../../redux/action/billDetailByEmployeeAction';
import { findBillResponseByCodeBill } from '../../../../Service/ApiBillByEmployeeService'
const ModalCart = ({ codeBill, setCodeBill }) => {
    const dispatch = useDispatch();
    const { billByCode } = useSelector((state) => state.codeBill);
    const { displayBills } = useSelector((state) => state.codeBill);
    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);

    useEffect(() => {
        dispatch(CodeBillByEmployee());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
    }, [dispatch, codeBill]);
    useEffect(() => {
        if (billByCode && billByCode.status && billByCode?.status !== "WAITING_FOR_PAYMENT") {
            setCodeBill("");
            dispatch(CodeBillByEmployee());
            dispatch(fetchPostsBillSuccess({}));
            toast.warning("Hóa đơn không còn ở trạng thái chờ thanh toán");
        }
    }, [billByCode]);
    const handleClickNav = (item) => {
        dispatch(findBillByCodeAndEmployee(item))
        setCodeBill(item)
    }
    const checkPayBill = async () => {
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
        PAYBILL_SUCCESS: checkPayBill // Truyền tham chiếu đến hàm, không gọi trực tiếp
    };
    return (
        <>
            <EventListener handlers={handlers} />
            <div className='nav-tab-bill mb-3'>
                <Nav variant="tabs" className="my-nav-tabs">
                    {displayBills.slice(0, 5).map((item, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link className={codeBill === item ? "active" : ""} onClick={() => handleClickNav(item)}>
                                {item.split('-')[0]}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                    <PendingBill />
                </Nav>
            </div>
            <div className='d-flex justify-content-between mb-3'>
                <h5 className='text-start pt-1'><FaMoneyBillAlt /> Đơn hàng {codeBill ? codeBill.split('-')[0] : ""} :</h5>
                {codeBill ? (<ModalAddProduct codeBill={codeBill} />) : ""}
            </div>
            <div className='cart-detail'>
                <h5 className='m-2'>Giỏ hàng:</h5>
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