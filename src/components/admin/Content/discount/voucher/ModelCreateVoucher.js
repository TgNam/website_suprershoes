import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewVoucher } from '../../../../../Service/ApiVoucherService';
import { useDispatch } from 'react-redux';
import { fetchAllVoucherAction } from '../../../../../redux/action/voucherAction';
import 'react-toastify/dist/ReactToastify.css';

function ModelCreateVoucher() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
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
        status: "upcoming"
    });

    const handleClose = () => {
        setVoucherDetails({
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
            status: "upcoming"
        });
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVoucherDetails({ ...voucherDetails, [name]: value });
    };

    const handleCreateVoucher = async () => {
        try {
            let res = await postCreateNewVoucher(voucherDetails);

            if (res.status === 200) {
                toast.success("Voucher created successfully");
                handleClose();
                dispatch(fetchAllVoucherAction());
            } else {
                toast.error("Failed to create voucher.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("An error occurred while creating the voucher.");
            }
        }
    };

    return (
        <>
            <Button variant="info" onClick={handleShow}>
                Thêm phiếu giảm giá
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phiếu giảm giá</Modal.Title>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={voucherDetails.status}
                                onChange={handleChange}
                            >
                                <option value="upcoming">Sắp diễn ra</option>
                                <option value="ongoing">Đang diễn ra</option>
                                <option value="ended">Kết thúc</option>
                                <option value="endedEarly">Kết thúc sớm</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCreateVoucher}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateVoucher;
