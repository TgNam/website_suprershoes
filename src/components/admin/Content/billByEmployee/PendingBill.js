import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import TableWaitingListBill from './TableWaitingListBill';
import { CiCirclePlus } from "react-icons/ci";
import { sortDisplayBills } from '../../../../redux/action/billByEmployeeAction'; // import action mới

const PendingBill = () => {
    const dispatch = useDispatch();
    // mã hóa đơn lấy từ database
    const { displayBills } = useSelector((state) => state.codeBill);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBills, setSelectedBills] = useState([]); // Trạng thái lưu các hóa đơn đã chọn

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Hàm callback để cập nhật danh sách hóa đơn đã chọn từ component con
    const handleSelectedBillsChange = (bills) => {
        setSelectedBills(bills);
    };

    const handleSubmitCreate = async () => {
        setShow(false);
        dispatch(sortDisplayBills(displayBills, selectedBills))
        setSelectedBills([]);
    };

    return (
        <>
            <CiCirclePlus onClick={handleShow} size={"35px"} type='button' />
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách hóa đơn chờ :</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm kiếm mã hóa đơn..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TableWaitingListBill
                                        searchTerm={searchTerm}
                                        selectedBills={selectedBills}
                                        onSelectedBillsChange={handleSelectedBillsChange} // Truyền callback vào component con
                                    />
                                </Col>
                            </Row>
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

export default PendingBill;
