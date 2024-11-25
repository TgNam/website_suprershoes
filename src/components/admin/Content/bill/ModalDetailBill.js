import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBillDetailsAndPayments, updateBillStatusAndNote, completeBill, deleteProductFromBill, updatePaymentByQUang, createHistory } from '../../../../Service/ApiBillDetailService';
import './ModalDetailBill.scss';
import { Button, Table, Pagination, Alert, Modal } from 'react-bootstrap';
import { AiFillBank } from "react-icons/ai";
import { useSelector } from 'react-redux';
import ModalUpdateCustomer from './ModalUpdateCustomer';
import ModalUpdateProduct from './ModalUpdateProduct';
import TableBillHistory from './TableBillHistory';
import TableCart from './TableCartBill';
import Image from 'react-bootstrap/Image';
import imageCart from '../billByEmployee/image/imageCart.jpg';
import { fetchPostsPayBillOrderSuccess } from '../../../../redux/action/PayBillOrderAction';
import { fetchAllPayBillOrder } from '../../../../redux/action/PayBillOrderAction';
import { useDispatch } from 'react-redux';
import { fetchBillDetailByEmployeeByCodeBill } from '../../../../redux/action/billDetailByEmployeeAction';
import { updateBillDetailByEmployee } from '../../../../redux/action/billDetailByEmployeeAction'
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAccountLogin } from '../../../../Service/ApiAccountService';
import { useNavigate } from 'react-router-dom';
import { fetchAllBills } from '../../../../redux/action/billAction';


const ModalDetailBill = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);
    const { codeBill } = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [payBill, setPayBill] = useState([]);
    const [billSummary, setBillSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [billHistory, setBillHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState({ status1: false, status2: false, status3: false, status4: false });
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentProduct = [...listBillDetailOrder];

    const billtable = useSelector((state) => state.bill.listBill);
    const [filters, setFilters] = useState({
        searchCodeBill: '',
        type: '',
        deliveryDate: '',
        receiveDate: '',
        status: '',
        page: 0,
        size: 10,
    });
    useEffect(() => {
        dispatch(fetchAllBills(filters)); // Dispatch fetch action with filters
    }, [filters, dispatch]);

    const totalPages = Math.ceil(currentProduct.length / itemsPerPage);
    const handleShowHistoryModal = () => setShowHistoryModal(true);
    const handleCloseHistoryModal = () => setShowHistoryModal(false);

    const totalAmount = billDetail.reduce((acc, product) => acc + product.totalAmount, 0);
    const priceDiscount = billDetail.reduce((acc, product) => acc + product.priceDiscount, 0);
    const totalMerchandise = billDetail.reduce((acc, product) => acc + product.totalMerchandise, 0);

    const correctedMerchandise = totalMerchandise / 10;
    const correctedDiscount = priceDiscount / 10;
    const correctedAmount = totalAmount / 10;



    const handleSubmitCreate = async () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                dispatch(updateBillDetailByEmployee(codeBill, selectedProductIds))
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                setSelectedProductIds([])
                setShow(false);
                createHistoryBill2()
                dispatch(fetchBillDetailsAndPayBill());
            } else {
                toast.error("Vui lòng lựa chọn sản phẩm.");
            }
        } catch (error) {
          
        }
    }


    const handleClickPage = (number) => {
        setCurrentPage(number);
    };
    useEffect(() => {
        navigate(`/admins/manage-bill-detail/${codeBill}`);
        if (codeBill) {
            dispatch(fetchAllPayBillOrder(codeBill));
            dispatch(fetchPostsPayBillOrderSuccess)

        }
    }, [codeBill, dispatch]);
    useEffect(() => {
        dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
    }, [dispatch, codeBill]);

    useEffect(() => {
        setCurrentPage(1)
    }, [listBillDetailOrder]);
    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchBillDetailsAndPayBill = async () => {
        setLoading(true);
        try {
            const data = await fetchBillDetailsAndPayments(codeBill);
            setBillSummary(data.billSummary);
            setBillDetail(data.billDetails);
            setPayBill(data.payBill);
            setBillHistory(data.billHistory);
            // setTotalPages(data.totalPages);
            if (data.billSummary) {
                updateStatus(data.billSummary.status);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };

    const handleShow = () => setShow(true);

    const handleAddProductSuccess = () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                dispatch(updateBillDetailByEmployee(codeBill, selectedProductIds))
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                setSelectedProductIds([])
                setShow(false);
            } else {
                toast.error("Vui lòng lựa chọn sản phẩm.");
            }
        } catch (error) {
            toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        }
    };


    const handleCancelBill = async () => {
        const note = prompt("Vui lòng nhập ghi chú cho việc hủy bỏ:", "");

        if (note) {
            try {
                await updateBillStatusAndNote(codeBill, 'CANCELLED', note);
                alert("Trạng thái hóa đơn đã được cập nhật thành 'Đã hủy' thành công.");

                fetchBillDetailsAndPayBill(page);
            } catch (error) {
                alert(error.message);
            }
        }
    };



    const createHistoryBill = async () => {
        try {
            // Fetch user details first
            const user = await getAccountLogin();
            if (!user || !user.id) {
                throw new Error("Failed to retrieve user information.");
            }

            // Check if bill data is available
            if (!billtable || !billtable.content) {
                throw new Error("Bill data is not available.");
            }

            const today = new Date().toISOString(); // Current date in ISO format

            // Find the bill corresponding to the codeBill
            const filteredBill = billtable.content.find((bill) => bill.codeBill === codeBill);
            if (!filteredBill) {
                throw new Error(`No bill found with codeBill: ${codeBill}`);
            }

            // Determine the history message based on the bill's status
            let historyMessage = '';
            switch (billSummary?.status) {
                case 'SHIPPED':
                    historyMessage = `${user.name} đã xác nhận hoàn thành`;
                    break;
                case 'PENDING':
                    historyMessage = `${user.name} đã xác nhận`;
                    break;
                case 'CONFIRMED':
                    historyMessage = `${user.name} đã xác nhận đang giao`;
                    break;
                default:
                    historyMessage = `${user.name} đã thực hiện một hành động`;
            }

            // Create history entry
            await createHistory(historyMessage, today, filteredBill.id, user.id, 'ACTIVE');

            // Refresh bill details after creating history
            fetchBillDetailsAndPayBill(page);


        } catch (error) {
            alert(`Error creating history: ${error.message}`);
        }
    };


    const createHistoryBill2 = async () => {
        try {

            const user = await getAccountLogin();
            if (!user || !user.id) {
                throw new Error("Failed to retrieve user information.");
            }

            if (!billtable || !billtable.content) {
                throw new Error("Bill data is not available.");
            }


            const filteredBill = billtable.content.find((bill) => bill.codeBill === codeBill);
            if (!filteredBill) {
                throw new Error(`No bill found with codeBill: ${codeBill}`);
            }

            const today = new Date().toISOString();
            await createHistory(user.name + ' Đã thêm sản phẩm ', today, filteredBill.id, user.id, 'ACTIVE');


            fetchBillDetailsAndPayBill(page);


        } catch (error) {
            alert(`Error creating history: ${error.message}`);
        }
    };

    const createHistoryBill3 = async () => {
        try {

            const user = await getAccountLogin();
            if (!user || !user.id) {
                throw new Error("Failed to retrieve user information.");
            }

            if (!billtable || !billtable.content) {
                throw new Error("Bill data is not available.");
            }


            const filteredBill = billtable.content.find((bill) => bill.codeBill === codeBill);
            if (!filteredBill) {
                throw new Error(`No bill found with codeBill: ${codeBill}`);
            }

            const today = new Date().toISOString();
            await createHistory(user.name + ' Đã thay đổi địa chỉ nhận hàng', today, filteredBill.id, user.id, 'ACTIVE');


            fetchBillDetailsAndPayBill(page);


        } catch (error) {
            alert(`Error creating history: ${error.message}`);
        }
    };






    const updatePayment = async () => {
        try {
            await updatePaymentByQUang(codeBill, 'COMPLETED');
            fetchBillDetailsAndPayBill(page);
        } catch (error) {
            alert(error.message);
        }

    };

    const handleCompleteBill = async () => {
        try {
            await completeBill(codeBill);
            alert("Trạng thái hóa đơn đã được cập nhật thành 'Hoàn thành' thành công.");

            fetchBillDetailsAndPayBill(page);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteProduct = async (productCode, nameColor, sizeName) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            try {
                await deleteProductFromBill(productCode, nameColor, sizeName);
                alert("Sản phẩm đã được xóa thành công.");
                fetchBillDetailsAndPayBill(page);
            } catch (error) {
                alert("Lỗi khi xóa sản phẩm: " + error.message);
            }
        }
    };

    const showStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Xác nhận';
            case 'CONFIRMED':
                return 'Đang giao';
            case 'SHIPPED':
                return 'Hoàn thành';
            case 'COMPLETED':
                return 'Đã hoàn tất';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return 'Hoàn thành';
        }
    };



    const updateStatus = (billStatus) => {
        const statusMap = {
            'PENDING': { status1: true, status2: false, status3: false, status4: false },
            'CONFIRMED': { status1: true, status2: true, status3: false, status4: false },
            'SHIPPED': { status1: true, status2: true, status3: true, status4: false },
            'COMPLETED': { status1: true, status2: true, status3: true, status4: true },
            'CANCELLED': { status1: false, status2: false, status3: false, status4: false },
        };
        setStatus(statusMap[billStatus] || { status1: false, status2: false, status3: false, status4: false });
    };


    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill(page);
        }
    }, [codeBill, page]);


    const renderTableRows = (data, type) => {
        return data.length > 0 ? (
            data.map((item, index) => (
                <tr key={item.tradingCode || item.productCode || `${item.productCode}-${index}`}>
                    <td className='text-center'>{index + 1}</td>
                    {type === "payment" ? (
                        <>
                            <td className='text-center'>{item.tradingCode}</td>
                            <td className='text-center'>{formatCurrency(item.amount)}</td>
                            <td className='text-center'>
                                <span className={`badge ${item.status === 'COMPLETED' ? 'text-bg-success' :
                                    item.status === 'PENDING_PAYMENT' ? 'text-bg-danger' : 'text-bg-warning'}`}>
                                    {item.status === 'COMPLETED' ? 'Đã thanh toán' :
                                        item.status === 'PENDING_PAYMENT' ? 'Chưa thanh toán' : 'Đang xử lý'}
                                </span>
                            </td>

                            <td className='text-center'>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className='text-center'>
                                <span className={`badge text-bg-${item.type === 0 ? 'success' : 'danger'}`}>
                                    {item.type === 0 ? 'Trả trước' : 'Trả sau'}
                                </span>
                            </td>

                            <td className='text-center'>{item.namePayment}</td>

                        </>
                    ) : (
                        <>

                        </>
                    )}
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={type === "payment" ? 9 : 8} className='text-center'>No {type === "payment" ? 'payment history' : 'products'} found for this bill.</td>
            </tr>
        );
    };

    return (
        <div className="main">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <div className="progress-container">
                        <div className="card card-timeline px-2 border-none">
                            <ul className={`bs4-order-tracking ${status.status4 || !status.status1 ? "disabled-tracking" : ""}`}>
                                {['Chờ xác nhận', 'Xác nhận', 'Đang giao', 'Hoàn thành'].map((label, i) => {
                                    const isActive = status[`status${i + 1}`];
                                    const isCancelled = status.status === 'CANCELLED';

                                    return (
                                        <li
                                            key={i}
                                            className={`step ${isCancelled ? "deActive" : isActive ? "active" : ""}`}
                                        >
                                            <div><AiFillBank /></div>
                                            {label}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="bth m-3 text-center">
                                <Button
                                    variant="primary"
                                    className="m-3"
                                    disabled={status.status4 || !status.status1}
                                    onClick={async () => {
                                        try {
                                            // Gọi hàm để hoàn thành hóa đơn
                                            await handleCompleteBill();

                                            // Kiểm tra trạng thái hóa đơn, nếu là 'COMPLETED' thì gọi hàm updatePayment
                                            if (billSummary?.status === 'SHIPPED') {
                                                await updatePayment();

                                            }
                                            await createHistoryBill();
                                        } catch (error) {
                                            alert("Có lỗi xảy ra: " + error.message);
                                        }
                                    }}
                                >
                                    {showStatus(billSummary?.status)}
                                </Button>



                                <Button
                                    variant="danger"
                                    className="m-3"
                                    disabled={status.status4 || !status.status1}
                                    onClick={handleCancelBill}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="history-pay m-3 d-flex align-items-center">
                        <h4 className="me-3">Lịch sử hóa đơn:</h4>
                        {billHistory && billHistory.length > 0 ? (
                            <div className="d-flex flex-column" onClick={handleShowHistoryModal} style={{ cursor: 'pointer' }}>
                                <p className="mb-0 text-secondary">
                                    {new Date(billHistory[0].createdAt).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })} - {billHistory[0].note}
                                </p>
                            </div>
                        ) : (
                            <p className="mb-0">Không có lịch sử hóa đơn nào.</p>
                        )}

                        <Modal show={showHistoryModal} onHide={handleCloseHistoryModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết lịch sử hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <TableBillHistory onAddTableBillHistory={handleAddProductSuccess} codeBill={codeBill} />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseHistoryModal}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>



                    <div className="history-pay m-3">
                        <h4>Lịch sử thanh toán</h4>
                        <Table striped bordered hover size="sm text-center">
                            <thead>
                                <tr>
                                    <th>STT</th><th>Mã giao dịch</th><th>Số tiền</th><th>Trạng thái</th><th>Thời gian</th>
                                    <th>Loại giao dịch</th><th>Phương thức thanh toán</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(payBill, "payment")}</tbody>
                        </Table>
                    </div>

                    <div className="infBill m-3">
                        <div className="d-flex justify-content-between">
                            <h4>Thông tin đơn hàng: {codeBill}</h4>
                            {billSummary?.status !== 'SHIPPED' && billSummary?.status !== 'COMPLETED' && billSummary?.status !== 'CONFIRMED' && billSummary?.status !== 'CANCELLED' ? (
                                <ModalUpdateCustomer
                                    customerData={billSummary}
                                    onUpdate={() => fetchBillDetailsAndPayBill(page)}
                                />
                            ) : (
                                <Button variant="secondary" disabled>
                                    Cập nhật thông tin
                                </Button>
                            )}
                        </div>

                        {billSummary && (
                            <div className='row'>
                                <div className='col'>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Tên khách hàng:</h5>
                                        <h5>{billSummary.nameCustomer || ''}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Địa chỉ:</h5>
                                        <h5>{billSummary.address || ''}</h5>
                                    </div>
                                </div>
                                <div className='col'>

                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>SDT:</h5>
                                        <h5>{billSummary.phoneNumber || ''}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Ghi chú:</h5>
                                        <h5>{billSummary.note || ''}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="history-product m-3">
                        <div className="d-flex justify-content-between mb-3">
                            <h4>Thông tin sản phẩm đã mua</h4>
                            {billSummary?.status !== 'SHIPPED' &&
                                billSummary?.status !== 'COMPLETED' &&
                                billSummary?.status !== 'CONFIRMED' &&
                                billSummary?.status !== 'CANCELLED' ? (
                                <>
                                    <Button variant="primary" onClick={handleShow}>
                                        Thêm sản phẩm
                                    </Button>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        size="xl"
                                        backdrop="static"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Sản Phẩm:</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            <ModalUpdateProduct
                                                                selectedProductIds={selectedProductIds}
                                                                setSelectedProductIds={setSelectedProductIds}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Thoát
                                            </Button>
                                            <Button variant="primary" onClick={handleSubmitCreate}>
                                                Lưu
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ) : (
                                <Button variant="secondary" disabled>
                                    Không thể chọn sản phẩm
                                </Button>
                            )}
                        </div>




                        {listBillDetailOrder && listBillDetailOrder.length > 0 ? (
                            <TableCart codeBill={codeBill} />
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center p-2">
                                <Image
                                    src={imageCart}
                                    className="text-center"
                                    style={{ width: '300px', height: 'auto' }}
                                />
                                <p className="mt-3">Không có sản phẩm nào </p>
                            </div>
                        )}


                    </div>

                    <div className='moneyPay d-flex justify-content-end m-5'>
                        <div className=''>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền hàng:</h5>
                                <h5 className='text-center'>{formatCurrency(correctedMerchandise)} VND</h5>
                            </div>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Voucher giảm giá:</h5>
                                <h5 className='text-center'>
                                    {priceDiscount ? `${formatCurrency(correctedDiscount)} VND` : '0 VND'}
                                </h5>

                            </div>
                            <hr />
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                                <h5>{formatCurrency(correctedAmount)} VND</h5>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalDetailBill;