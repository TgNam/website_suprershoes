import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
function ModelCreateColor() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm màu sắc
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm kích cỡ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="namecolor">Tên màu</Form.Label>
                    <Form.Control
                        type="namecolor"
                        id="namecolor"
                    />
                    <Form.Label htmlFor="codecolor">Mã màu</Form.Label>
                    <Form.Control
                        type="codecolor"
                        id="codecolor"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateColor;