import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalCreateShoe = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);


    const handleSubmitCreate = async () => {
        toast.success('Create a new participant succeed')
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <IoIosAddCircleOutline /> Add new product
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Tên sản phẩm</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            // value={}
                                            // onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formGroupName">
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            // value={name}
                                            // onChange={(event) => setName(event.target.value)}
                                        />
                                    </Form.Group>
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

export default ModalCreateShoe;