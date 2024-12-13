
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import TableVoucher from './TableVoucher';
import { CiDiscount1 } from "react-icons/ci";
import {
    findAllVoucherBillPublic,
    findAllVoucherBillPrivate
} from '../../../../Service/ApiVoucherService';
import { getAccountLogin } from "../../../../Service/ApiAccountService";
import { initialize } from '../../../../redux/action/authAction';
const ModalAddVoucher = ({ totalMerchandise, setVoucher }) => {
    const dispatch = useDispatch();
    const [listVoucherPublic, setListVoucherPublic] = useState([]);
    const [listVoucherPrivate, setListVoucherPrivate] = useState([]);
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
        (async () => {
            const token = localStorage.getItem('accessToken');
            const voucherBillPublic = await findAllVoucherBillPublic();
            if (voucherBillPublic.status === 200) {
                const data = voucherBillPublic.data;
                setListVoucherPublic(data);
            }
            if (token) {
                try {
                    let users = await getAccountLogin();
                    if (users.status === 200) {
                        const data = users.data;
                        try {
                            const voucherBillPrivate = await findAllVoucherBillPrivate(data.id)
                            if (users.status === 200) {
                                if (voucherBillPrivate.status === 200) {
                                    const data = voucherBillPrivate.data;
                                    setListVoucherPrivate(data);
                                } else {
                                    setListVoucherPrivate([])
                                }
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, [dispatch])
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
                                            onChange={(event) => setSearchName(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TableVoucher
                                        totalMerchandise={totalMerchandise}
                                        handleClose={handleClose}
                                        currentAccounts={filteredAccounts}
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