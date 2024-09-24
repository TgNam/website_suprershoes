import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const ModalUpdateCustomer = ({ customerData }) => {
    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (customerData) {
            setName(customerData.nameCustomer);
            setPhoneNumber(customerData.phoneNumber);
            setAddress(customerData.address);
            setNote(customerData.note);
        }
    }, [customerData]);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleSubmitCreate = async () => {
        // Logic to handle form submission
        console.log({
            name,
            phoneNumber,
            address,
            note
        });
        handleClose();
    };

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
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="text"
                                    placeholder="Tên khách hàng"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="text"
                                    placeholder="Số điện thoại khách hàng"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="text"
                                    placeholder="Địa chỉ khách hàng"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
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
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder='Ghi chú'
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
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
