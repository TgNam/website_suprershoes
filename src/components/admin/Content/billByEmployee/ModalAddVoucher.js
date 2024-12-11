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
import { fetchAllVoucherBillPublic, fetchAllVoucherBillPrivate, fetchPostsVoucherBillPrivateSuccess } from '../../../../redux/action/voucherBillAction';

const ModalAddVoucher = ({ idAccount, totalMerchandise }) => {
    const dispatch = useDispatch();
    const { listVoucherPublic, listVoucherPrivate } = useSelector((state) => state.voucherBill);

    const [searchName, setSearchName] = useState("");

    const currentAccounts = [
        ...(listVoucherPublic || []),
        ...(listVoucherPrivate || []),
    ];

    // Apply filter based on searchName
    const filteredAccounts = currentAccounts.filter((account) => {
        const searchLower = searchName.toLowerCase();
        const codeVoucherMatch = account.codeVoucher?.toLowerCase().includes(searchLower);
        const nameMatch = account.name?.toLowerCase().includes(searchLower);
        return codeVoucherMatch || nameMatch;
    });

    useEffect(() => {
        dispatch(fetchAllVoucherBillPublic());
        if (idAccount) {
            dispatch(fetchAllVoucherBillPrivate(idAccount));
        } else {
            dispatch(fetchPostsVoucherBillPrivateSuccess([]));
        }
    }, [dispatch, idAccount]);

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
                                            placeholder="Tìm kiếm phiếu giảm giá theo mã hoặc tên..."
                                            onChange={(event) => setSearchName(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TableVoucher
                                        currentAccounts={filteredAccounts}
                                        totalMerchandise={totalMerchandise}
                                        handleClose={handleClose}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAddVoucher;
