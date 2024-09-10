
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
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
const ModalUpdateProduct = () => {
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
                Thêm sản phẩm
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                                        <Form.Control
                                            type="number"
                                            id="formPhoneNumber"
                                            placeholder="Tìm kiếm sản phẩm theo tên..."
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
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td colSpan={2}>Larry the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row >
                                <div className='d-flex justify-content-end'>
                                    <Pagination>
                                        <Pagination.First />
                                        <Pagination.Prev />
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Next />
                                        <Pagination.Last />
                                    </Pagination>
                                </div>
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

export default ModalUpdateProduct;