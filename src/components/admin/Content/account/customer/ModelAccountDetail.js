import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { FaRegEye } from "react-icons/fa";
import { findAccountRequest } from '../../../../../redux/action/AccountAction';

function ModelAccountDetail({ idCustomer }) {
    const dispatch = useDispatch();
    const accountDetail = useSelector((state) => state.account.accountDetail);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            dispatch(findAccountRequest(idCustomer));
        }
    }, [dispatch, show]);
    return (
        <>
            <Button variant="warning" onClick={handleShow} className='mx-3'>
                <FaRegEye />
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="container rounded bg-white mt-5 mb-5">
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img
                                            className="rounded-circle mt-5"
                                            width="150px"
                                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                            alt="profile"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 border-right">
                                    <div className="p-3 py-5">
                                        <div className="row mt-2">
                                            <div className="col-md-12">
                                                <label className="labels">
                                                    <span className="text-danger">*</span> Họ và tên của người dùng:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Tên người dùng"
                                                    name="name"
                                                    maxLength={50}
                                                    value={accountDetail.name}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className="labels">
                                                    <span className="text-danger">*</span> Số điện thoại của người dùng:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Số điện thoại"
                                                    name="phoneNumber"
                                                    maxLength={11}
                                                    value={accountDetail.phoneNumber}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">
                                                    <span className="text-danger">*</span> Giới tính:
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="nam"
                                                        value="1"
                                                        checked={accountDetail.gender === 1}
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="nam">
                                                        Nam
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id="nu"
                                                        value="2"
                                                        checked={accountDetail.gender === 2}
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="nu">
                                                        Nữ
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">
                                                    <span className="text-danger">*</span> Địa chỉ email của người dùng:
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="NguyenVanA@gmail.com"
                                                    name="email"
                                                    value={accountDetail.email}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 py-5">
                                        <div className="col-md-12">
                                            <label className="labels">
                                                <span className="text-danger">*</span> Ngày sinh:
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="birthday"
                                                value={accountDetail.birthday ? accountDetail.birthday.split('T')[0] : ''}
                                                readOnly
                                            />
                                        </div>
                                        <br />
                                        <div className="col-md-12">
                                            <label className="labels">
                                                <span className="text-danger">*</span> Trạng thái tài khoản:
                                            </label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={accountDetail.status}
                                                disabled
                                            >
                                                <option value="ACTIVE">Kích hoạt</option>
                                                <option value="INACTIVE">Khóa</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModelAccountDetail;
