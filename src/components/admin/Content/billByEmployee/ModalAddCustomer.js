
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import TableCustomer from './TableCustomer';

const ModalAddCustomer = () => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };

    const handleShow = () => setShow(true);

    const handleSubmitCreate = async () => {

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chọn khách hàng
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="number"
                                            placeholder="Tìm kiếm khách hàng theo số điện thoại..."
                                            min="1" // Đặt giá trị tối thiểu là 1
                                            onChange={(e) => {
                                                // Kiểm tra giá trị nhập vào
                                                const value = e.target.value;
                                                if (value < 1) {
                                                    e.target.value = ""; // Xóa giá trị nếu nhập số âm hoặc 0
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TableCustomer />
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
}

export default ModalAddCustomer;