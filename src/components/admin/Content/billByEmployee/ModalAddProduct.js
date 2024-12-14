
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
import TableProduct from './TableProduct';
import { createNewBillDetailByEmployee } from '../../../../redux/action/billDetailByEmployeeAction'
import { fetchBillDetailByEmployeeByCodeBill } from '../../../../redux/action/billDetailByEmployeeAction';
const ModalAddProduct = ({ codeBill }) => {
    const dispatch = useDispatch();

    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    };

    const handleShow = () => setShow(true);

    const handleSubmitCreate = async () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                dispatch(createNewBillDetailByEmployee(codeBill, selectedProductIds))
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                setSelectedProductIds([])
                setShow(false);
            } else {
                toast.error("Vui lòng lựa chọn sản phẩm.");
            }
        } catch (error) {
            toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chọn sản phẩm
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sản Phẩm: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <TableProduct
                                        selectedProductIds={selectedProductIds}
                                        setSelectedProductIds={setSelectedProductIds}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Thoát
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreate}>
                       Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddProduct;