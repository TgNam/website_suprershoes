
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
import { CiDiscount1 } from "react-icons/ci";
const ModalAddVoucher = () => {
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
            <Button variant="primary" onClick={handleShow} style={{ width: '60px' }}>
                <CiDiscount1 />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Phiếu giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formVoucher">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm kiếm phiếu giảm giá theo mã..."
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

export default ModalAddVoucher;