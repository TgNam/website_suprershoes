import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
import authorizeAxiosInstance from '../../../../hooks/authorizeAxiosInstance';
// Function to find the name by code
const findByCode = (code, data) => {
    const result = data.find(item => String(item.code) === String(code)); // Compare as strings to avoid type mismatch
    return result ? result.name : "";
};

const ModalUpdateCustomer = ({ customerData, onUpdate }) => {
    const [show, setShow] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        addressDetail: '',
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        note: '',
    });
    const [errors, setErrors] = useState({});
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Cập nhật thông tin khách hàng khi customerData thay đổi
    useEffect(() => {
        if (customerData) {
            setCustomerInfo({
                name: customerData.nameCustomer || '',
                phoneNumber: customerData.phoneNumber || '',
                address: customerData.address || '',
                addressDetail: customerData.addressDetail || '',
                note: customerData.note || '',
                provinceCode: customerData.province || '',
                districtCode: customerData.district || '',
                wardCode: customerData.ward || '',
            });
        }
    }, [customerData]);

    // Lấy danh sách tỉnh/thành phố khi component được tải
    useEffect(() => {
        getCities()
            .then(setCities)
            .catch(() => toast.error('Không thể tải tỉnh/thành phố.'));
    }, []);

    // Xử lý thay đổi input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'provinceCode') {
            setCustomerInfo((prev) => ({
                ...prev,
                provinceCode: value,
                districtCode: '',
                wardCode: '',
            }));
            getDistricts(value)
                .then(setDistricts)
                .catch(() => toast.error('Không thể tải quận/huyện.'));
        } else if (name === 'districtCode') {
            setCustomerInfo((prev) => ({
                ...prev,
                districtCode: value,
                wardCode: '',
            }));
            getWards(value)
                .then(setWards)
                .catch(() => toast.error('Không thể tải phường/xã.'));
        } else {
            setCustomerInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Xác thực form
    const validateFields = () => {
        const { name, phoneNumber, addressDetail, note } = customerInfo;
        let validationErrors = {};

        const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăâêôươẠ-ỹ\s]+$/;
        if (!name || name.length < 3) {
            validationErrors.name = 'Tên phải có ít nhất 3 ký tự.';
        } else if (!nameRegex.test(name)) {
            validationErrors.name = 'Tên chỉ được chứa chữ cái và dấu cách.';
        }
        
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Số điện thoại không hợp lệ. Phải là 10 chữ số và bắt đầu bằng 03, 05, 07, 08 hoặc 09.';
        }
        

        if (!addressDetail || addressDetail.length < 5) {
            validationErrors.addressDetail = 'Chi tiết địa chỉ phải có ít nhất 5 ký tự.';
        }

        if (note && note.length > 200) {
            validationErrors.note = 'Ghi chú không được vượt quá 200 ký tự.';
        }

        return validationErrors;
    };

    // Xử lý cập nhật form
    const handleSubmitUpdate = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Vui lòng sửa lỗi trước khi gửi.');
            return;
        }

        // Use findByCode to get the city, district, and ward names
        const cityName = findByCode(customerInfo.provinceCode, cities);
        const districtName = findByCode(customerInfo.districtCode, districts);
        const wardName = findByCode(customerInfo.wardCode, wards);

        const { name, phoneNumber, addressDetail, note } = customerInfo;
        const fullAddress = `${addressDetail}, ${wardName}, ${districtName}, ${cityName}`;

        const billData = {
            codeBill: customerData.codeBill,
            nameCustomer: name,
            phoneNumber,
            address: fullAddress,
            note,
        };

        try {
            const response = await authorizeAxiosInstance.put(
                `/bill/updateCodeBill/${customerData.codeBill}`, // Ensure the URL is correct
                billData, // Ensure billData is properly structured
                {
                    headers: {
                        'Content-Type': 'application/json', // Axios automatically adds this, so you could remove this
                    },
                }
            );
            if (response.status === 200 || response.status === 204) {
                toast.success('Thông tin khách hàng đã được cập nhật thành công!');
                handleClose();
                if (onUpdate) onUpdate();
            } else {
                toast.error(`Cập nhật thất bại. Trạng thái: ${response.status}`);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật. Vui lòng kiểm tra kết nối.');
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Cập nhật thông tin
            </Button>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Form.Group className="mb-4">
                                <Form.Label>Tên:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Tên khách hàng"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Số điện thoại khách hàng"
                                    value={customerInfo.phoneNumber}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Chi tiết địa chỉ:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="addressDetail"
                                    value={customerInfo.addressDetail}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.addressDetail}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.addressDetail}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className='row m-1 mb-4'>
                                <Form.Select
                                    name="provinceCode"
                                    value={customerInfo.provinceCode}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                >
                                    <option value="">Chọn Tỉnh/Thành phố</option>
                                    {cities.map((city) => (
                                        <option key={city.code} value={city.code}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Form.Select>

                                <Form.Select
                                    name="districtCode"
                                    value={customerInfo.districtCode}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                    disabled={!districts.length}
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.code}>
                                            {district.name}
                                        </option>
                                    ))}
                                </Form.Select>

                                <Form.Select
                                    name="wardCode"
                                    value={customerInfo.wardCode}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                    disabled={!wards.length}
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="note"
                                    placeholder="Ghi chú"
                                    value={customerInfo.note}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.note}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.note}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdate}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateCustomer;
