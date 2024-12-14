import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import { createNewPayBillOrder, deletePayBillOrder } from '../../../../redux/action/PayBillOrderAction';
import {FaTrash} from 'react-icons/fa';
const NotFoundData = '/NotFoundData.png';
const ModalPayMoney = ({ show, setShow, totalAmount, totalPaid, codeBill }) => {
    const dispatch = useDispatch();
    const [amountDue, setAmountDue] = useState(0); // Tiền còn thiếu
    const [customerPaid, setCustomerPaid] = useState(0);  // Tiền khách đưa
    const [change, setChange] = useState(0);              // Tiền thừa
    const [checkMoney, setCheckMoney] = useState(false);   // Kiểm tra tiền thừa/thiếu

    const isValidNumber = (value) => {
        if (!value) return "0";
        return /^\d+(\.\d{0,2})?$/.test(value); // Kiểm tra giá trị chỉ chứa số và tối đa 2 chữ số sau dấu thập phân
    };

    const handleAmountChange = (event) => {
        const value = event.target.value.replace(/,/g, "");
        if (isValidNumber(value)) {
            setCustomerPaid(Number(value)); // Đảm bảo `customerPaid` là số
        } else {
            toast.error("Vui lòng chỉ nhập số.");
        }
    }

    const formatCurrency = (value) => {
        if (!value) return "0";
        const roundedValue = Math.round(value);
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const pay = useSelector((state) => state.payBillOrder.listPayBillOrder);

    useEffect(() => {
        if (totalAmount > totalPaid) {
            setAmountDue(totalAmount - totalPaid);
            setChange(0); // Reset tiền thừa khi còn thiếu
            setCheckMoney(false);
        } else {
            setAmountDue(0); // Reset tiền thiếu khi đủ tiền
            setChange(totalPaid - totalAmount);
            setCheckMoney(true);
        }
    }, [show, pay, totalAmount, totalPaid]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentPay = [...pay];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentPay.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentPay.length / itemsPerPage);

    const handleClickPage = (number) => setCurrentPage(number);

    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const handleCashPayment = () => {
        if (!customerPaid) {
            toast.error("Vui lòng nhập số tiền trước khi thanh toán!");
            return;
        }

        const PayBillRequest = {
            amount: customerPaid,
            codeBill: codeBill,
            type: 2
        };

        if (PayBillRequest) {
            dispatch(createNewPayBillOrder(codeBill, PayBillRequest));
        } else {
            toast.error("Vui lòng thử lại sau!");
        }
        setCurrentPage(1)
    };
    const handleDeleteById = (id) => {
        if (id && codeBill) {
            dispatch(deletePayBillOrder(codeBill, id));
        }
        setCurrentPage(1)
    };

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thanh toán
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label className='m-2'>Số tiền:</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text'
                            value={formatCurrency(customerPaid)}
                            onChange={handleAmountChange}
                        />
                        <InputGroup.Text>VND</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <div className='row'>
                    <Button variant="primary" className='col m-1' onClick={handleCashPayment}>Thanh toán tiền mặt</Button>
                    {/* <Button variant="primary" className='col m-1'>Thanh toán chuyển khoản</Button> */}
                </div>
                <div className="d-flex justify-content-between align-items-center m-2">
                    <span className="fw-bold">Tiền cần thanh toán</span>
                    <span className="fw-bold text-danger fs-5">{formatCurrency(totalAmount || 0)} VND</span>
                </div>
                <Table striped bordered hover className='m-2'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã giao dịch</th>
                            <th>Số tiền</th>
                            <th>Phương thức</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.idPayBill}>
                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td>{item.tradingCode}</td>
                                    <td>{formatCurrency(item.amount || 0)} VND</td>
                                    <td>{(item.methodName) === 'Cash payment' ? 'Tiền mặt' : 'Chuyển khoản'}</td>
                                    <td className='text-center'><FaTrash className='text-danger' size={'30px'} onClick={() => handleDeleteById(item.idPayBill)} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={5} className="preview-image justify-content-center text-center p-3">
                                <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                                <p className='p-3'>Không có dữ liệu</p>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <div className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

                        {getPaginationItems().map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === currentPage}
                                onClick={() => handleClickPage(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
                <div className="d-flex justify-content-between align-items-center m-2">
                    <span className="fw-bold">Khách thanh toán</span>
                    <span className="fw-bold text-danger fs-5">{formatCurrency(totalPaid || 0)} VND</span>
                </div>
                {checkMoney ? (
                    <div className="d-flex justify-content-between align-items-center m-2">
                        <span className="fw-bold">Tiền thừa</span>
                        <span className="fw-bold text-primary fs-6">{formatCurrency(change || 0)} VND</span>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between align-items-center m-2">
                        <span className="fw-bold">Tiền thiếu</span>
                        <span className="fw-bold text-primary fs-6">{formatCurrency(amountDue || 0)} VND</span>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Lưu</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPayMoney;
