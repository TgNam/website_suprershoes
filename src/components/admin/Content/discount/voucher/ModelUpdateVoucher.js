import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateVoucherAction } from '../../../../../redux/action/voucherAction';
import { toast } from 'react-toastify';

const ModelUpdateVoucher = ({ show, handleClose, voucher }) => {
    const dispatch = useDispatch();

    const [voucherDetails, setVoucherDetails] = useState({
        codeVoucher: "",
        name: "",
        note: "",
        value: 0,
        quantity: 0,
        maximumDiscount: 0,
        type: "",
        minBillValue: 0,
        startAt: "",
        endAt: "",
        status: "ongoing"
    });

    useEffect(() => {
        if (voucher) {
            setVoucherDetails({
                codeVoucher: voucher.codeVoucher || "",
                name: voucher.name || "",
                note: voucher.note || "",
                value: voucher.value || 0,
                quantity: voucher.quantity || 0,
                maximumDiscount: voucher.maximumDiscount || 0,
                type: voucher.type || "",
                minBillValue: voucher.minBillValue || 0,
                startAt: voucher.startAt || "",
                endAt: voucher.endAt || "",
                status: voucher.status || "ongoing"
            });
        }
    }, [voucher]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVoucherDetails({ ...voucherDetails, [name]: value });
    };

    const handleUpdateVoucher = async () => {
        try {
            await dispatch(updateVoucherAction(voucher.id, voucherDetails));
            toast.success("Cập nhật phiếu giảm giá thành công!");
            handleClose();
        } catch (error) {
            toast.error("Cập nhật phiếu giảm giá thất bại!");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật phiếu giảm giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Mã phiếu giảm giá</Form.Label>
                        <Form.Control
                            type="text"
                            name="codeVoucher"
                            value={voucherDetails.codeVoucher}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên phiếu giảm giá</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={voucherDetails.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                            type="text"
                            name="note"
                            value={voucherDetails.note}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá trị</Form.Label>
                        <Form.Control
                            type="number"
                            name="value"
                            value={voucherDetails.value}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={voucherDetails.quantity}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giảm giá tối đa</Form.Label>
                        <Form.Control
                            type="number"
                            name="maximumDiscount"
                            value={voucherDetails.maximumDiscount}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={voucherDetails.type}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                        <Form.Control
                            type="number"
                            name="minBillValue"
                            value={voucherDetails.minBillValue}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            type="date"
                            name="startAt"
                            value={voucherDetails.startAt}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control
                            type="date"
                            name="endAt"
                            value={voucherDetails.endAt}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleUpdateVoucher}>
                    Cập nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModelUpdateVoucher;
