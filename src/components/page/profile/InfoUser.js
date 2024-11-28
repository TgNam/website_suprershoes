import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./user.scss";
import Table from "react-bootstrap/Table";
import { IoEyeSharp } from "react-icons/io5";
import EditUserInfoForm from "./EditUser";
import { Modal, Button, Nav, Pagination } from "react-bootstrap";
import { fetchAllBills } from "../../../redux/action/billAction";
import { getAccountLogin } from "../../../Service/ApiAccountService";
import { useNavigate } from "react-router-dom";


const InfoUser = () => {
    const navigate = useNavigate();
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [status, setStatus] = useState(1);
    const [filters, setFilters] = useState({
        searchCodeBill: "",
        type: "",
        deliveryDate: "",
        receiveDate: "",
        status: "",
        page: 0,
        size: 10,
    });
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [filteredBills, setFilteredBills] = useState([]);

    const dispatch = useDispatch();
    const { listBill, loading } = useSelector((state) => state.bill);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getAccountLogin();
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        dispatch(fetchAllBills(filters));
    }, [filters, dispatch]);

    useEffect(() => {
        if (listBill?.content && user?.id) {
            const filtered = listBill.content.filter(
                (bill) => bill.idCustomer === user.id
            );
            setFilteredBills(filtered);
        }
    }, [listBill, user]);
    

    const handleStatusChange = (newStatus) => {
        setFilters((prevFilters) => ({ ...prevFilters, status: newStatus, page: 0 }));
    };

    const handlePageChange = (pageNumber) => {
        setFilters((prevFilters) => ({ ...prevFilters, page: pageNumber }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Invalid date";
        try {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            return new Date(dateString).toLocaleDateString("vi-VN", options);
        } catch {
            return "Invalid date";
        }
    };

    const formatCurrency = (value) => {
        if (isNaN(value)) return "0";
        return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleViewDetail = (codeBill) => {
        navigate(`/profile/bill-detail/${codeBill}`);
    };

    return (
        <div className="margin-left-right padding-bottom-3x marginTop marginBot row">
            <div className="table-responsive block-infor-left ms-2">
                <div className="borderStyle">
                    <button
                        className={`buttonHead w-100 ${status === 1 ? "active" : ""}`}
                        onClick={() => setStatus(1)}
                    >
                        Hồ sơ của tôi
                    </button>
                    <button
                        className={`buttonHead mb-3 w-100 ${status === 2 ? "active" : ""}`}
                        onClick={() => setStatus(2)}
                    >
                        Đơn đặt hàng
                    </button>
                    <button
                        className={`buttonHead mb-3 w-100 ${status === 3 ? "active" : ""}`}
                        onClick={() => setStatus(3)}
                    >
                        Đơn đã mua
                    </button>
                </div>
            </div>

            <div className="table-responsive block-infor-right borderStyle">
                {status === 2 ? (
                    <div className="p-5">
                        <div className="body-bill p-3">
                            <h5>Danh sách hoá đơn</h5>
                            <div className="row">
                                <div className="col-5">
                                    Mã hóa đơn:
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="searchCodeBill"
                                        placeholder="Tìm kiếm hóa đơn theo mã..."
                                        value={filters.searchCodeBill}
                                        onChange={(event) =>
                                            setFilters({
                                                ...filters,
                                                searchCodeBill: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <hr />
                            <Nav justify variant="tabs" defaultActiveKey="all" className="my-nav-tabs">
                                {[
                                    { key: "", label: "Tất cả" },
                                    { key: "PENDING", label: "Chờ xác nhận" },
                                    { key: "CONFIRMED", label: "Xác nhận" },
                                    { key: "WAITTING_FOR_SHIPPED", label: "Chờ giao hàng" },
                                    { key: "SHIPPED", label: "Đang giao" },
                                    { key: "COMPLETED", label: "Hoàn thành" },
                                    { key: "CANCELLED", label: "Đã hủy" },
                                ].map((tab) => (
                                    <Nav.Item key={tab.key}>
                                        <Nav.Link
                                            eventKey={tab.key}
                                            onClick={() => handleStatusChange(tab.key)}
                                        >
                                            {tab.label}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã hóa đơn</th>
                                        <th>Tên khách hàng</th>
                                        <th>Tên nhân viên</th>
                                        <th>Loại</th>
                                        <th>Ngày tạo</th>
                                        <th>Tiền giảm</th>
                                        <th>Tổng tiền</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={9} className="text-center">
                                                Đang tải dữ liệu...
                                            </td>
                                        </tr>
                                    ) : filteredBills.length > 0 ? (
                                        filteredBills.map((item, index) => (
                                            <tr key={`table-bill-${index}`}>
                                                <td>{index + 1 + filters.page * filters.size}</td>
                                                <td>{item.codeBill || "Lỗi"}</td>
                                                <td>{item.nameCustomer || "Khách lẻ"}</td>
                                                <td>{item.nameEmployees || "Không có"}</td>
                                                <td>{item.type === 1 ? "Online" : "Tại quầy"}</td>
                                                <td>{item.createdAt ? formatDate(item.createdAt) : "Lỗi"}</td>
                                                <td>{item.priceDiscount || "Không có"}</td>
                                                <td>{item.totalAmount ? formatCurrency(item.totalAmount) : ""}</td>
                                                <td>
                                                    <Button
                                                        variant="warning"
                                                        className="me-5"
                                                        onClick={() => handleViewDetail(item.codeBill)}
                                                    >
                                                        <IoEyeSharp />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center">
                                                Không tìm thấy dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            <Pagination className="justify-content-center">
                                {[...Array(listBill?.totalPages || 1)].map((_, pageIndex) => (
                                    <Pagination.Item
                                        key={pageIndex}
                                        active={pageIndex === filters.page}
                                        onClick={() => handlePageChange(pageIndex)}
                                    >
                                        {pageIndex + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </div>
                    </div>
                ) : (
                    <div className="user-info-container">
                        <h2>THÔNG TIN CỦA TÔI</h2>
                        <p>
                            Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản
                            của bạn luôn được cập nhật.
                        </p>
                        <div className="info-section">
                            <h3>THÔNG TIN CHI TIẾT</h3>
                            <p>Họ và tên: {user?.name || "Tên không xác định"}</p>
                            <p>
                                Ngày sinh:{" "}
                                {user?.birthday ? formatDate(user.birthday) : "Ngày sinh không xác định"}
                            </p>
                            <p>
                                Giới tính:{" "}
                                {user?.gender ? (user.gender === 1 ? "Nam" : "Nữ") : "Giới tính không xác định"}
                            </p>
                            <button onClick={() => setShowEditInfoModal(true)}>
                                CHỈNH SỬA THÔNG TIN
                            </button>

                            <Modal
                                show={showEditInfoModal}
                                onHide={() => setShowEditInfoModal(false)}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Chỉnh sửa thông tin của bạn</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditUserInfoForm onCancel={() => setShowEditInfoModal(false)} />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoUser;