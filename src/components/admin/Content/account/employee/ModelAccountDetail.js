import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { FaRegEye } from "react-icons/fa";
import { getCities, getDistricts, getWards } from "../../../../../Service/ApiProvincesService";
import { findAccountRequest } from '../../../../../redux/action/AccountAction';
import { findEmployeeAddressByIdAccount } from '../../../../../redux/action/addressAction';

function ModelAccountDetail({ idEmployee }) {
    const dispatch = useDispatch();
    const accountDetail = useSelector((state) => state.account.accountDetail);
    const addressDt = useSelector((state) => state.address.address);
    const [show, setShow] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            dispatch(findAccountRequest(idEmployee));
            dispatch(findEmployeeAddressByIdAccount(idEmployee));
        }
    }, [dispatch, show]);
    useEffect(() => {
        if (addressDt) {
            setSelectedCity(addressDt?.codeCity || '');
            setSelectedDistrict(addressDt?.codeDistrict || '');
        }
    }, [addressDt]);

    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]); // Reset wards when city changes
            });
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict).then((data) => {
                setWards(data);
            });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    function findAddressDetail(address) {
        if (address) {
            // Tách chuỗi thành một mảng các phần tử
            const addressParts = address.split(", ");

            // Lấy các phần tử từ đầu đến trước 4 phần tử cuối cùng
            const resultParts = addressParts.slice(0, -4);

            // Kết hợp lại thành chuỗi
            const resultAddress = resultParts.join(", ");

            return resultAddress ? resultAddress : "";
        }
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow} className='mx-3'>
                <FaRegEye />
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin tài khoản nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="container rounded bg-white mt-5 mb-5">
                            <div className="d-flex justify-content-center mb-3">
                                <h4 className="text-right">Thông tin tài khoản nhân viên</h4>
                            </div>
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
                                                    value={accountDetail?.name || ""}
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
                                                    value={accountDetail?.phoneNumber || ""}
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
                                                        checked={accountDetail?.gender === 1 || ""}
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
                                                        checked={accountDetail?.gender === 2 || ""}
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
                                                    value={accountDetail?.email || ""}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">
                                                    <span className="text-danger">*</span> Ngày sinh:
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="birthday"
                                                    value={accountDetail?.birthday ? accountDetail.birthday.split('T')[0] : '' || ""}
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
                                                    value={accountDetail?.status || ""}
                                                    disabled
                                                >
                                                    <option value="ACTIVE">Kích hoạt</option>
                                                    <option value="INACTIVE">Khóa</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 py-5">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Thành phố</Form.Label>
                                            <Form.Select
                                                name="city"
                                                value={addressDt?.codeCity || ""}
                                                disabled
                                            >
                                                <option value="">Tỉnh/Thành phố</option>
                                                {cities.map((city) => (
                                                    <option key={city.code} value={city.code}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Quận/Huyện</Form.Label>
                                            <Form.Select
                                                name="district"
                                                value={addressDt?.codeDistrict || ""}
                                                disabled
                                            >
                                                <option value="">Quận/Huyện</option>
                                                {districts.map((district) => (
                                                    <option key={district.code} value={district.code}>
                                                        {district.name_with_type}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Phường/Xã</Form.Label>
                                            <Form.Select
                                                name="ward"
                                                value={addressDt?.codeWard || ""}
                                                disabled
                                            >
                                                <option value="">Phường/Xã</option>
                                                {wards.map((ward) => (
                                                    <option key={ward.code} value={ward.code}>
                                                        {ward.name_with_type}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Địa chỉ chi tiết:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="addressDetail"
                                                value={findAddressDetail(addressDt?.address || "")}
                                                disabled
                                            />
                                        </Form.Group>
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
