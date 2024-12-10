
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import TableVoucher from './TableVoucher';
import { CiDiscount1 } from "react-icons/ci";
import {
    findAllVoucherBillPublic,
    findAllVoucherBillPrivate
} from '../../../../Service/ApiVoucherService';

const ModalAddVoucher = ({ idAccount, totalMerchandise, setVoucher }) => {
    const dispatch = useDispatch();
    const [listVoucherPublic, setListVoucherPublic] = useState([]);
    const [listVoucherPrivate, setListVoucherPrivate] = useState([]);
    const currentAccounts = [
        ...(listVoucherPublic || []),
        ...(listVoucherPrivate || [])
    ];
    useEffect(() => {
        (async () => {
            const voucherBillPublic = await findAllVoucherBillPublic();
            if (voucherBillPublic.status === 200) {
                const data = voucherBillPublic.data;
                setListVoucherPublic(data);
            }
            if (idAccount) {
                const voucherBillPrivate = await findAllVoucherBillPrivate(idAccount)
                if (voucherBillPrivate.status === 200) {
                    const data = voucherBillPrivate.data;
                    setListVoucherPrivate(data);
                }
            }
            else {
                setListVoucherPrivate([])
            }
        })();
    }, [dispatch, idAccount])
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };

    const handleShow = () => setShow(true);

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
                                    <TableVoucher
                                        totalMerchandise={totalMerchandise}
                                        handleClose={handleClose}
                                        currentAccounts={currentAccounts}
                                        setVoucher={setVoucher}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalAddVoucher;