import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./user.scss";
import Table from "react-bootstrap/Table";
import ReactLoading from "react-loading";
import { IoEyeSharp } from "react-icons/io5";
import EditUserInfoForm from "./EditUser";
import EditGmail from "./EditGmail";
import EditPass from "./EditPass";
import { Modal, Button } from "react-bootstrap";

const InfoUser = () => {
    const [status, setStatus] = useState(1);

    // Separate states for each modal
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [showEditGmailModal, setShowEditGmailModal] = useState(false);
    const [showEditPassModal, setShowEditPassModal] = useState(false);

    // Handlers for user info modal
    const handleOpenEditInfoModal = () => setShowEditInfoModal(true);
    const handleCloseEditInfoModal = () => setShowEditInfoModal(false);

    // Handlers for Gmail modal
    const handleOpenEditGmailModal = () => setShowEditGmailModal(true);
    const handleCloseEditGmailModal = () => setShowEditGmailModal(false);

    // Handlers for password modal
    const handleOpenEditPassModal = () => setShowEditPassModal(true);
    const handleCloseEditPassModal = () => setShowEditPassModal(false);

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
                {status === 3 ? (
                    <ReactLoading type="cylon" color="#000" height={33} width="9%" />
                ) : status === 2 ? (
                    <div className="p-5">
                        <h4 className="ms-4 mb-3 mt-3 text-center">Đơn đặt hàng</h4>
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
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Trần Thị B</td>
                                    <td>Bán lẻ</td>
                                    <td>2023-01-01</td>
                                    <td>100,000 VND</td>
                                    <td>1,000,000 VND</td>
                                    <td>
                                        <Button variant="warning" className="me-5">
                                            <IoEyeSharp />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>HD002</td>
                                    <td>Phạm Văn C</td>
                                    <td>Nguyễn Thị D</td>
                                    <td>Bán buôn</td>
                                    <td>2023-01-02</td>
                                    <td>50,000 VND</td>
                                    <td>2,000,000 VND</td>
                                    <td>
                                        <Button variant="warning" className="me-5">
                                            <IoEyeSharp />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="user-info-container">
                        <h2>THÔNG TIN CỦA TÔI</h2>
                        <p>
                            Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của bạn luôn được cập nhật.
                        </p>
                        <div className="info-section">
                            <h3>THÔNG TIN CHI TIẾT</h3>
                            <p>WANG WANG</p>
                            <p>1997-08-09</p>
                            <p>GIỚI TÍNH</p>
                            <button onClick={handleOpenEditInfoModal}>CHỈNH SỬA THÔNG TIN</button>

                            {/* Modal for Editing User Info */}
                            <Modal show={showEditInfoModal} onHide={handleCloseEditInfoModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chỉnh sửa thông tin của bạn</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditUserInfoForm onCancel={handleCloseEditInfoModal} />
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div className="info-section">
                            <h3>CHI TIẾT ĐĂNG NHẬP</h3>
                            <p>EMAIL</p>
                            <p>SuperShoes@GMAIL.COM</p>
                            <button onClick={handleOpenEditGmailModal}>CHỈNH SỬA ĐĂNG NHẬP</button>

                            {/* Modal for Editing Gmail */}
                            <Modal show={showEditGmailModal} onHide={handleCloseEditGmailModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chỉnh sửa thông tin đăng nhập</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditGmail onCancel={handleCloseEditGmailModal} />
                                </Modal.Body>
                            </Modal>
                            <p>MẬT KHẨU</p>
                            <p>************</p>
                            <button onClick={handleOpenEditPassModal}>CHỈNH SỬA MẬT KHẨU</button>

                            {/* Modal for Editing Password */}
                            <Modal show={showEditPassModal} onHide={handleCloseEditPassModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chỉnh sửa mật khẩu</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditPass onCancel={handleCloseEditPassModal} />
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
