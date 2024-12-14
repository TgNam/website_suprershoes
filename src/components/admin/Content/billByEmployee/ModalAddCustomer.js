import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce';
import TableAccount from './TableAccountCustomer';
import { fetchAllAccountAddress, fetchSearchAllAccountAddress } from '../../../../redux/action/addressAction';
const ModalAddCustomer = ({ setIdAccountAddress }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };

    const handleShow = () => {
        setSearchName("");
        setShow(true)
    };
    const [searchName, setSearchName] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000);
    useEffect(() => {
        if (show) {
            if (debouncedSearchName) {
                dispatch(fetchSearchAllAccountAddress(debouncedSearchName));
            } else {
                dispatch(fetchAllAccountAddress());
            }
        }
    }, [debouncedSearchName, dispatch, show]);
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
                                            type="text"
                                            placeholder="Tìm kiếm số điện thoại và tên khách hàng..."
                                            onChange={(event) => setSearchName(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TableAccount handleClose={handleClose} setIdAccountAddress={setIdAccountAddress} />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddCustomer;