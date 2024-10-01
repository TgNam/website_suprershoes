import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

const ModalUpdateCustomer = ({ customerData, onUpdate }) => {
    const [show, setShow] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        note: '',
    });
    const [errors, setErrors] = useState({});

    // Load data when the modal is opened
    useEffect(() => {
        if (customerData) {
            setCustomerInfo({
                name: customerData.nameCustomer || '',
                phoneNumber: customerData.phoneNumber || '',
                address: customerData.address || '',
                note: customerData.note || '',
            });
        }
    }, [customerData]);

    // Handlers for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear errors as user types
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    // Validation function
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

    // Handle form submission to update customer info
    const handleSubmitCreate = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the validation errors before submitting.');
            return;
        }

        const { name, phoneNumber, address, note } = customerInfo;

        const billData = {
            codeBill: customerData.codeBill, // Assuming `customerData` has `codeBill`
            nameCustomer: name,
            phoneNumber,
            address,
            note,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/bill/updateCodeBill/${customerData.codeBill}`,
                billData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Bill updated successfully!');
                handleClose(); // Close the modal after successful update
                if (onUpdate) {
                    onUpdate(); // Trigger the onUpdate callback to refresh the data in the parent component
                }
            } else {
                toast.error('Failed to update the bill. Please try again.');
            }
        } catch (error) {
            console.error('Error occurred while updating the bill:', error);
            toast.error('Error occurred while updating the bill. Please try again.');
        }
    };

    // Handle modal visibility
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
                            <Form.Group className="mb-4">
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
                            </Form.Group>
                            <div className='row m-1 mb-4'>
                                {/* Province, District, and Ward should be fetched dynamically */}
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn tỉnh</option>
                                    <option value="1">Province 1</option>
                                    <option value="2">Province 2</option>
                                    <option value="3">Province 3</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn quận</option>
                                    <option value="1">District 1</option>
                                    <option value="2">District 2</option>
                                    <option value="3">District 3</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn phường xã</option>
                                    <option value="1">Ward 1</option>
                                    <option value="2">Ward 2</option>
                                    <option value="3">Ward 3</option>
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
                    <Button variant="primary" onClick={handleSubmitCreate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateCustomer;
    