import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBillDetailsAndPayments, updateBillStatusAndNote, completeBill, updatePaymentByQUang, createHistory } from '../../../../Service/ApiBillDetailService';
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
import swal from 'sweetalert';
import { FaCheckCircle, FaTruck, FaBoxOpen, FaClipboardCheck, FaTimesCircle, FaTrash } from 'react-icons/fa';

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
    const [status, setStatus] = useState({
        status1: false,
        status2: false,
        status3: false,
        status4: false,
        status5: false, // New status property
    });



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
    const firstProduct = billDetail[0] || {};
    const totalAmount = firstProduct.totalAmount || 0;
    const priceDiscount = firstProduct.priceDiscount || 0;
    const totalMerchandise = firstProduct.totalMerchandise || 0;




    const handleUpdateBill = async () => {
        dispatch(fetchBillDetailsAndPayBill());
    }

    const handleSubmitCreate = async () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                await dispatch(updateBillDetailByEmployee(codeBill, selectedProductIds));
                await dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                setSelectedProductIds([]);
                setShow(false);
                await createHistoryBill2();
                await handleUpdateBill();
                toast.success("Lưu sản phẩm thành công!");
            } else {
                toast.error("Vui lòng lựa chọn sản phẩm.");
            }
        } catch (error) {
        }
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

    const handleAddProductSuccess = async () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                await dispatch(updateBillDetailByEmployee(codeBill, selectedProductIds));
                setSelectedProductIds([]);
                setShow(false);
                await fetchBillDetailsAndPayBill(); // Refresh data dynamically
                toast.success("Sản phẩm đã được thêm thành công!");
            } else {
                toast.error("Vui lòng chọn sản phẩm.");
            }
        } catch (error) {
            toast.error("Lỗi khi thêm sản phẩm. Vui lòng thử lại.");
        }
    };

    const handleCancelBill = async () => {
        swal({
            title: "Nhập lý do hủy hóa đơn",
            content: {
                element: "input",
                attributes: {
                    placeholder: "Nhập lý do tại đây...",
                    type: "text",
                },
            },
            buttons: ["Hủy", "Gửi"],
        }).then(async (reason) => {
            if (reason) {
                try {
                    await updateBillStatusAndNote(codeBill, 'CANCELLED', reason);
                    await createHistoryBill3(reason);
                    swal("Đã hủy!", "Hóa đơn đã được hủy thành công.", "success");
                    await fetchBillDetailsAndPayBill(); // Refresh data
                } catch (error) {
                    swal("Lỗi!", "Đã xảy ra lỗi khi hủy hóa đơn. Vui lòng thử lại.", "error");
                }
            }
        });
    };




    const createHistoryBill = async () => {
        try {
            // Fetch user details first
            const account = await getAccountLogin()
            const user = account.data;
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
                case 'WAITTING_FOR_SHIPPED':
                    historyMessage = `${user.name} đã xác nhận đang giao`;
                    break;
                case 'CONFIRMED':
                    historyMessage = `Chờ bên giao hàng nhận hàng`;
                    break;
                default:
                    historyMessage = `${user.name} đã thực hiện một hành động`;
            }

            // Create history entry
            await createHistory(historyMessage, today, filteredBill.id, user.id, 'ACTIVE');

            // Refresh bill details after creating history
            fetchBillDetailsAndPayBill(page);


        } catch (error) {
            // alert(`Error creating history: ${error.message}`);
        }
    };


    const createHistoryBill2 = async () => {
        try {

            const account = await getAccountLogin()
            const user = account.data;
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
            // alert(`Error creating history: ${error.message}`);
        }
    };

    const createHistoryBill3 = async (inputValue) => {
        try {
            const account = await getAccountLogin();
            const user = account.data;
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
            await createHistory(`${user.name} đã hủy hóa đơn vì ${inputValue}`, today, filteredBill.id, user.id, 'ACTIVE');

            fetchBillDetailsAndPayBill(page);
        } catch (error) {
            alert(`Error creating history: ${error.message}`);
        }
    };
    const createHistoryBill4 = async (inputValue) => {
        try {
            const account = await getAccountLogin();
            const user = account.data;
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
            await createHistory(`${user.name} ${inputValue}`, today, filteredBill.id, user.id, 'ACTIVE');

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
            // alert(error.message);
        }

    };

    const handleCompleteBill = async () => {
        swal({
            title: "Bạn có chắc chắn?",
            text: "Bạn muốn thay đổi trạng thái của hóa đơn này?",
            icon: "warning",
            buttons: ["Hủy", "Hoàn tất"],
            dangerMode: true,
        }).then(async (willComplete) => {
            if (willComplete) {
                try {
                    await completeBill(codeBill);
                    await createHistoryBill();
                    await fetchBillDetailsAndPayBill(page);
                    swal("Thành công!", "Trạng thái hóa đơn đã được cập nhật.", "success");
                } catch (error) {
                    swal("Lỗi!", "Một số sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.", "error");
                }
            }
        });
    };




    const showStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Xác nhận';
            case 'CONFIRMED':
                return 'Chờ giao hàng';
            case 'WAITTING_FOR_SHIPPED':
                return 'Đang giao';
            case 'SHIPPED':
                return 'Hoàn thành'
            case 'FAILED':
                return 'Giao hàng thất bại'; // Handle failed case
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
            'PENDING': { status1: true, status2: false, status3: false, status4: false, status5: false },
            'CONFIRMED': { status1: true, status2: true, status3: false, status4: false, status5: false },
            'WAITTING_FOR_SHIPPED': { status1: true, status2: true, status3: true, status4: false, status5: false },
            'SHIPPED': { status1: true, status2: true, status3: true, status4: true, status5: false },
            'COMPLETED': { status1: true, status2: true, status3: true, status4: true, status5: true },
            'CANCELLED': { status1: false, status2: false, status3: false, status4: false, status5: false },
            'FAILED': { status1: true, status2: true, status3: true, status4: false, status5: false }, // New mapping
        };
        setStatus(statusMap[billStatus] || { status1: false, status2: false, status3: false, status4: false, status5: false });
    };




    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill(page);
        }
    }, [codeBill, page]);


    const renderTableRows = (data, type) => {
        return data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={
                item.tradingCode ||
                item.productCode ||
                `${item.productCode}-${index}`
              }
            >
              <td className="text-center">{index + 1}</td>
              {type === "payment" ? (
                <>
                  <td className="text-center">{item.tradingCode}</td>
                  <td className="text-center">{formatCurrency(item.amount)}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        item.status === "COMPLETED"
                          ? "text-bg-success"
                          : item.status === "WAITING_FOR_PAYMENT"
                          ? "text-bg-danger"
                          : "text-bg-warning"
                      }`}
                    >
                      {item.status === "COMPLETED"
                        ? "Đã thanh toán"
                        : item.status === "WAITING_FOR_PAYMENT"
                        ? "Chưa thanh toán"
                        : "Đang xử lý"}
                    </span>
                  </td>

                  <td className="text-center">
                    {new Date(item.createdAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge text-bg-${
                        item.type === 1 ? "warning" : "danger"
                      }`}
                    >
                      {item.type === 1 ? "Trả trước" : "Trả sau"}
                    </span>
                  </td>

                  <td className="text-center">
                    {item.namePayment === "Cash payment"
                      ? "Tiền mặt"
                      : "Chuyển khoản"}
                  </td>
                </>
              ) : (
                <></>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={type === "payment" ? 9 : 8} className="text-center">
              No {type === "payment" ? "payment history" : "products"} found for
              this bill.
            </td>
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
                            <ul className={`bs4-order-tracking ${status.status5 || !status.status1 ? "disabled-tracking" : ""}`}>
                                {billSummary?.status === 'CANCELLED' ? (
                                    <li className="step cancelled text-center">
                                        <div className="d-flex justify-content-center">
                                            <FaTimesCircle size={48} />
                                        </div>
                                        <span className="text-danger fw-bold">Hóa đơn đã bị hủy</span>
                                    </li>
                                ) : billSummary?.status === 'FAILED' ? (
                                    ['Chờ xác nhận', 'Xác nhận', 'Chờ giao hàng', 'Đang giao', 'Giao hàng thất bại'].map((label, i) => {
                                        const isActive = i < 4; // Mark the first four steps as active
                                        return (
                                            <li key={i} className={`step ${isActive ? "active" : "failed"}`}>
                                                <div>
                                                    {i === 4 ? <FaTimesCircle size={48} /> : <FaCheckCircle />}
                                                </div>
                                                {label}
                                            </li>
                                        );
                                    })
                                ) : (
                                    ['Chờ xác nhận', 'Xác nhận', 'Chờ giao hàng', 'Đang giao', 'Hoàn thành'].map((label, i) => {
                                        const isActive = status[`status${i + 1}`];
                                        return (
                                            <li key={i} className={`step ${isActive ? "active" : ""}`}>
                                                <div>
                                                    {[
                                                        <FaClipboardCheck />, // "Chờ xác nhận"
                                                        <FaCheckCircle />,    // "Xác nhận"
                                                        <FaBoxOpen />,        // "Chờ giao hàng"
                                                        <FaTruck />,          // "Đang giao"
                                                        <FaCheckCircle />,    // "Hoàn thành"
                                                    ][i]}
                                                </div>
                                                {label}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>


                            {billSummary?.status !== 'FAILED' && (
                                <div className="bth m-3 text-center">
                                    <Button
                                        variant="primary"
                                        className="m-3"
                                        disabled={status.status5 || !status.status1}
                                        onClick={async () => {
                                            try {
                                                await handleCompleteBill();

                                                if (billSummary?.status === 'SHIPPED') {
                                                    await updatePayment();
                                                }
                                            } catch (error) {
                                                alert("Có lỗi xảy ra: " + error.message);
                                            }
                                        }}
                                    >
                                        {showStatus(billSummary?.status)}
                                    </Button>

                                    {billSummary?.status === 'SHIPPED' && (
                                        <Button
                                            variant="warning"
                                            className="m-3"
                                            onClick={() => {
                                                swal({
                                                    title: "Xác nhận giao hàng thất bại?",
                                                    text: "Vui lòng nhập lý do giao hàng thất bại:",
                                                    content: {
                                                        element: "input",
                                                        attributes: {
                                                            placeholder: "Nhập lý do tại đây...",
                                                            type: "text",
                                                        },
                                                    },
                                                    buttons: ["Hủy", "Xác nhận"],
                                                    dangerMode: true,
                                                }).then(async (reason) => {
                                                    if (reason) {
                                                        try {
                                                            await updateBillStatusAndNote(codeBill, 'FAILED', reason); // Update the status with the reason
                                                            await createHistoryBill4(reason); // Pass the entered reason to the history creation function
                                                            await fetchBillDetailsAndPayBill(); // Refresh the bill details
                                                            toast.success("Đã cập nhật trạng thái giao hàng thất bại.");
                                                        } catch (error) {
                                                            toast.error("Lỗi khi cập nhật trạng thái giao hàng thất bại.");
                                                        }
                                                    } else {
                                                        toast.error("Lý do không được để trống.");
                                                    }
                                                });
                                            }}
                                        >
                                            Giao hàng thất bại
                                        </Button>

                                    )}

                                    {billSummary?.status !== 'SHIPPED' && (
                                        <Button
                                            variant="danger"
                                            className="m-3"
                                            disabled={status.status5 || !status.status1 || status === 'FAILED'}
                                            onClick={handleCancelBill}
                                        >
                                            Hủy
                                        </Button>
                                    )}
                                </div>
                            )}




                        </div>
                    </div>
                    <div className="history-pay m-3 d-flex align-items-center">
                        <h4 className="me-3">Lịch sử hóa đơn:</h4>
                        {billHistory && billHistory.length > 0 ? (
                            <div
                                className="d-flex flex-column"
                                onClick={handleShowHistoryModal}
                                style={{ cursor: 'pointer' }}
                            >
                                <p className="mb-0 text-secondary">
                                    {new Date(billHistory[billHistory.length - 1].createdAt).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })} - {billHistory[billHistory.length - 1].note}
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
                                <Button variant="secondary" onClick={handleCloseHistoryModal} >
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
                            {billSummary?.status !== 'FAILED' && billSummary?.status !== 'SHIPPED' && billSummary?.status !== 'COMPLETED' && billSummary?.status !== 'CONFIRMED' && billSummary?.status !== 'WAITTING_FOR_SHIPPED' && billSummary?.status !== 'CANCELLED' ? (
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
                                        <h5>{billSummary.nameCustomer || 'Khách lẻ'}</h5>
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
                            {billSummary?.status !== 'FAILED' && billSummary?.status !== 'SHIPPED' &&
                                billSummary?.status !== 'COMPLETED' &&
                                billSummary?.status !== 'CONFIRMED' &&
                                billSummary?.status !== 'WAITTING_FOR_SHIPPED' &&
                                billSummary?.status !== 'CANCELLED'
                                ? (
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
                            <TableCart
                                codeBill={codeBill}
                                setLoading={setLoading}
                                setBillSummary={setBillSummary}
                                setBillDetail={setBillDetail}
                                setPayBill={setPayBill}
                                setBillHistory={setBillHistory}
                                updateStatus={updateStatus}
                                setError={setError}
                                billSummary={billSummary}
                            />
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
                                <h5 className='text-center'>{formatCurrency(totalMerchandise)} VND</h5>
                            </div>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Voucher giảm giá:</h5>
                                <h5 className='text-center'>
                                    {priceDiscount ? `${formatCurrency(priceDiscount)} VND` : '0 VND'}
                                </h5>


                            </div>
                            {billSummary?.address && (
                                <div className='status d-flex flex-row mb-3'>
                                    <h5 className='mx-3'>Phí vận chuyển:</h5>
                                    <h5 className='text-center'>
                                        30,000 VND
                                    </h5>
                                </div>
                            )}

                            <hr />
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                                <h5>{formatCurrency(totalAmount)} VND</h5>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalDetailBill;