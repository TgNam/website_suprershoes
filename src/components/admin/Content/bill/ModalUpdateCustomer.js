
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
import { CiDiscount1 } from "react-icons/ci";
const ModalUpdateCustomer = () => {
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
                Thay đổi thông tin
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Form>
                                <Form.Group className="mb-4" >
                                    <Form.Control type="text" placeholder="Tên khách hàng" />
                                </Form.Group>
                                <Form.Group className="mb-4" >
                                    <Form.Control type="text" placeholder="Số điện thoại khách hàng" />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control type="text" placeholder="Địa chỉ khách hàng" />
                                </Form.Group>
                                <div className='row m-1 mb-4'>
                                    <Form.Select aria-label="Default select example" className='col m-1'>
                                        <option>Chọn tỉnh</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <Form.Select aria-label="Default select example" className='col m-1'>
                                        <option>Chọn quận</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <Form.Select aria-label="Default select example" className='col m-1'>
                                        <option>Chọn phường xã</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={5} placeholder='Ghi chú' />
                                </Form.Group>
                            </Form>
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

export default ModalUpdateCustomer;