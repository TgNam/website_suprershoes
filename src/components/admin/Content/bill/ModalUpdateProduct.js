import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const ModalUpdateProduct = () => {
    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value < 1) {
            setSearchTerm('');
        } else {
            setSearchTerm(value);
        }
    };

    const fetchProducts = async (page, searchTerm) => {
        try {
            const response = await axios.get('http://localhost:8080/productDetail/list-productDetail', {
                params: {
                    page: page - 1,
                    size: 10,
                    name: searchTerm
                }
            });

            setProducts(response.data.DT.content); // Assuming the response structure contains product list in data.DT.content
            setTotalPages(response.data.DT.totalPages);
        } catch (error) {
            toast.error("Error fetching product details. Please try again.");
        }
    };

    useEffect(() => {
        if (show) {
            fetchProducts(currentPage, searchTerm);
        }
    }, [show, currentPage, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSubmitCreate = () => {
        // Logic for submitting the selected products
        toast.success("Products added successfully!");
        handleClose();
    };

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
                                    <Form.Group className="mb-3" controlId="formSearchProduct">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm kiếm sản phẩm theo tên..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>STT</th>
                                                <th className='text-center'>Ảnh sản phẩm</th>
                                                <th className='text-center'>Thông tin sản phẩm</th>
                                                <th className='text-center'>Màu sắc</th>
                                                <th className='text-center'>Số lượng</th>
                                                <th className='text-center'>Tổng tiền</th>
                                                <th className='text-center'>Trạng thái</th>
                                                <th className='text-center'>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length > 0 ? (
                                                products.map((product, index) => (
                                                    <tr key={product.id}>
                                                        <td className='text-center'>{index + 1 + (currentPage - 1) * 10}</td>
                                                        <td className='text-center'>
                                                            <img
                                                                src={`data:image/jpeg;base64,${product.image}`}
                                                                alt="Product"
                                                                style={{ width: '50px', height: '50px' }}
                                                            />
                                                        </td>
                                                        <td className='text-center'>{product.nameProduct}</td>
                                                        <td className='text-center'>{product.nameColor}</td>
                                                        <td className='text-center'>{product.quantity}</td>
                                                        <td className='text-center'>{product.totalPrice} VND</td>
                                                        <td className='text-center'>{product.status}</td>
                                                        <td className='text-center'>
                                                            <Button variant="success" size="sm" onClick={() => dispatch(/* Your add to cart logic */)}>
                                                                Thêm
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">Không có sản phẩm nào</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <div className='d-flex justify-content-end'>
                                    <Pagination>
                                        <Pagination.First onClick={() => handlePageChange(1)} />
                                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                        {[...Array(totalPages)].map((_, index) => (
                                            <Pagination.Item
                                                key={index}
                                                active={index + 1 === currentPage}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
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
};

export default ModalUpdateProduct;
