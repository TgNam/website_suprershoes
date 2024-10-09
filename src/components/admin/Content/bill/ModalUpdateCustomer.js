import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalUpdateCustomer = ({ customerData, onUpdate }) => {
    const [show, setShow] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (customerData) {
            setCustomerInfo({
                name: customerData.nameCustomer || '',
                phoneNumber: customerData.phoneNumber || '',
                address: customerData.address || '',
                note: customerData.note || '',
                province: customerData.province || '',
                district: customerData.district || '',
                ward: customerData.ward || '',
            });
        }
    }, [customerData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input Changed: ${name} -> ${value}`);
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const validateFields = () => {
        const { name, phoneNumber, address, note } = customerInfo;
        let validationErrors = {};

        if (!name || name.length < 3) {
            validationErrors.name = 'Name must be at least 3 characters long.';
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Phone number must be between 10 to 15 digits.';
        }

        if (!address || address.length < 10) {
            validationErrors.address = 'Address must be at least 10 characters long.';
        }

        if (note && note.length > 200) {
            validationErrors.note = 'Note cannot exceed 200 characters.';
        }

        return validationErrors;
    };

    const handleSubmitUpdate = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the validation errors before submitting.');
            return;
        }

        const { name, phoneNumber, address, province, district, ward, note } = customerInfo;

        const billData = {
            codeBill: customerData.codeBill,
            nameCustomer: name,
            phoneNumber,
            address,
            province,
            district,
            ward,
            note,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/bill/updateCodeBill2/${customerData.codeBill}`,
                billData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                toast.success('Bill updated successfully!');
                handleClose();
                if (onUpdate) {
                    onUpdate();
                }
            } else {
                toast.error(`Failed to update the bill. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred while updating the bill:', error);
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || 'Failed to update the bill.'}`);
            } else {
                toast.error('Error occurred while updating the bill. Please check your network and try again.');
            }
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thay đổi thông tin
            </Button>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Form.Group className="mb-4">
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
                            {/* <Form.Group className="mb-4">
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Địa chỉ khách hàng"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group> */}
                            <div className='row m-1 mb-4'>
                                <Form.Select
                                    name="province"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                >
                                    <option value="">Chọn tỉnh</option>
                                    <option value="Province 1">Province 1</option>
                                    <option value="Province 2">Province 2</option>
                                    <option value="Province 3">Province 3</option>
                                </Form.Select>
                                <Form.Select
                                    name="district"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                >
                                    <option value="">Chọn quận</option>
                                    <option value="District 1">District 1</option>
                                    <option value="District 2">District 2</option>
                                    <option value="District 3">District 3</option>
                                </Form.Select>
                                <Form.Select
                                    name="ward"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    className='col m-1'
                                >
                                    <option value="">Chọn phường xã</option>
                                    <option value="Ward 1">Ward 1</option>
                                    <option value="Ward 2">Ward 2</option>
                                    <option value="Ward 3">Ward 3</option>
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateCustomer;
