import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from 'lodash';
import { MdAddCard } from "react-icons/md";

const ModalUpdateProduct = ({ onAddProductSuccess }) => {
    const { codeBill } = useParams();
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [idBill, setIdBill] = useState(null);
    const [loadingBill, setLoadingBill] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [errors, setErrors] = useState({});

    // Fetch bill ID by codeBill
    const fetchIdBill = useCallback(async () => {
        setLoadingBill(true);
        try {
            const response = await axios.get('http://localhost:8080/bill/list-bills', { params: { codeBill } });
            if (response.data && response.data.content?.length > 0) {
                setIdBill(response.data.content[0].id);
            } else {
                toast.error('Không tìm thấy hóa đơn cho mã đã cung cấp.');
                setIdBill(null);
            }
        } catch (error) {
            console.error('Error fetching bill details:', error);
            toast.error('Lỗi khi lấy thông tin hóa đơn. Vui lòng thử lại.');
            setIdBill(null);
        } finally {
            setLoadingBill(false);
        }
    }, [codeBill]);

    const fetchProducts = useCallback(async (page, searchTerm) => {
        setLoadingProducts(true);
        try {
            const response = await axios.get('http://localhost:8080/productDetail/list-productDetail', {
                params: { page: page - 1, size: 10, name: searchTerm },
            });

            console.log('Product Data:', response.data.DT.content);
            setProducts(response.data.DT.content);
            setTotalPages(response.data.DT.totalPages);

            setQuantities((prev) => {
                const newQuantities = { ...prev };
                response.data.DT.content.forEach((product) => {
                    if (!newQuantities[product.id]) {
                        newQuantities[product.id] = 1;
                    }
                });
                return newQuantities;
            });

            setErrors({});
        } catch (error) {
            console.error('Error fetching product details:', error);
            toast.error('Lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.');
        } finally {
            setLoadingProducts(false);
        }
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setSearchTerm('');
        setCurrentPage(1);
        setProducts([]);
        setIdBill(null);
        setQuantities({});
        setErrors({});
    };

    useEffect(() => {
        if (show) {
            fetchIdBill();
        }
    }, [show, fetchIdBill]);

    useEffect(() => {
        if (show) {
            fetchProducts(currentPage, searchTerm);
        }
    }, [show, currentPage, searchTerm, fetchProducts]);

    const handleSearchChange = debounce((value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset the page when a new search term is entered
    }, 500); // Debounce for 500 milliseconds

    const handleQuantityChange = (productId, value, maxQuantity) => {
        console.log('Product ID:', productId, 'Available Stock (Max Quantity):', maxQuantity);
        const effectiveMaxQuantity = maxQuantity ?? Infinity;

        const quantity = parseInt(value, 10);

        if (isNaN(quantity) || quantity < 1) {
            setErrors((prev) => ({ ...prev, [productId]: 'Số lượng phải ít nhất là 1.' }));
        } else if (quantity > effectiveMaxQuantity) {
            setErrors((prev) => ({ ...prev, [productId]: `Số lượng không được vượt quá ${effectiveMaxQuantity}.` }));
        } else {
            setErrors((prev) => ({ ...prev, [productId]: null }));
        }

        setQuantities((prev) => ({ ...prev, [productId]: quantity >= 1 ? quantity : 1 }));
    };

    const handleAddProduct = useCallback(async (product) => {
        if (!idBill) {
            toast.error('ID hóa đơn đang bị thiếu. Không thể thêm sản phẩm.');
            return;
        }

        const quantity = quantities[product.id];

        if (!quantity || quantity < 1 || quantity > product.maxQuantity) {
            toast.error('Vui lòng nhập số lượng hợp lệ trước khi thêm sản phẩm.');
            setErrors((prev) => ({ ...prev, [product.id]: 'Số lượng không hợp lệ.' }));
            return;
        }

        setAddingProduct(true);

        try {
            const existingBillDetailResponse = await axios.get('http://localhost:8080/bill-detail/list-bill-details', {
                params: { codeBill, idProductDetail: product.id },
            });

            if (existingBillDetailResponse.data && existingBillDetailResponse.data.length > 0) {
                const existingBillDetail = existingBillDetailResponse.data.find(
                    (detail) => detail.idProductDetail === product.id && detail.idBill === idBill
                );

                if (existingBillDetail) {
                    const updatedQuantity = existingBillDetail.quantity + quantity;

                    await axios.put('http://localhost:8080/bill-detail/update', {
                        id: existingBillDetail.id,
                        quantity: updatedQuantity,
                        priceDiscount: existingBillDetail.priceDiscount,
                        note: existingBillDetail.note,
                        idBill: existingBillDetail.idBill,
                        idProductDetail: existingBillDetail.idProductDetail,
                        status: existingBillDetail.status,
                    });

                    toast.success('Số lượng sản phẩm đã được cập nhật thành công!');
                }
            } else {
                const productData = {
                    quantity,
                    priceDiscount: 0,
                    note: '',
                    idBill,
                    idProductDetail: product.id,
                    status: 'ACTIVE',
                };

                const response = await axios.post('http://localhost:8080/bill-detail/add', productData);

                if (response.status === 200) {
                    toast.success('Sản phẩm đã được thêm thành công!');
                    if (onAddProductSuccess) onAddProductSuccess();
                } else {
                    toast.error('Thêm sản phẩm thất bại. Vui lòng thử lại.');
                }
            }
        } catch (error) {
            console.error('Error adding or updating product:', error);
            toast.error('Lỗi khi thêm hoặc cập nhật sản phẩm. Vui lòng thử lại.');
        } finally {
            setAddingProduct(false);
        }
    }, [idBill, onAddProductSuccess, quantities, codeBill]);

    const renderPaginationItems = () => {
        const items = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm sản phẩm
            </Button>

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
                    {(loadingBill || loadingProducts) ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <Form>
                            <Container>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="searchProduct">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm sản phẩm theo tên..."
                                                value={searchTerm}
                                                onChange={(event) => handleSearchChange(event.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th className="text-center">Ảnh sản phẩm</th>
                                                    <th className="text-center">Thông tin sản phẩm</th>
                                                    <th className="text-center">Màu sắc</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-center">Tổng tiền</th>
                                                    <th className="text-center">Trạng thái</th>
                                                    <th className="text-center">Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <tr key={product.id}>
                                                            <td className="text-center">{index + 1 + (currentPage - 1) * 10}</td>
                                                            <td className="text-center">
                                                                <img
                                                                    src={`data:image/jpeg;base64,${product.image}`}
                                                                    alt="Product"
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                            </td>
                                                            <td className="text-center">{product.nameProduct}</td>
                                                            <td className="text-center">{product.nameColor}</td>
                                                            <td className="text-center">
                                                                <Form.Control
                                                                    type="number"
                                                                    min="1"
                                                                    max={product.quantity || Infinity}
                                                                    value={quantities[product.id] || 1}
                                                                    onChange={(e) => handleQuantityChange(product.id, e.target.value, product.quantity)}
                                                                    className="form-control"
                                                                    placeholder="Quantity"
                                                                    aria-label="Quantity"
                                                                    aria-describedby="basic-addon1"
                                                                    style={{ width: '80px', margin: '0 auto' }}
                                                                />
                                                                {errors[product.id] && (
                                                                    <Form.Text className="text-danger">
                                                                        {errors[product.id]}
                                                                    </Form.Text>
                                                                )}
                                                            </td>
                                                            <td className="text-center">{Number(product.price).toLocaleString()} VND</td>
                                                            <td className='text-center'>
                                                                <h6>
                                                                    <span className={`badge ${product.status === 'active' ? 'text-bg-success' :
                                                                        product.status === 'CANCELLED' ? 'text-bg-danger' :
                                                                            product.status === 'SHIPPED' ? 'text-bg-info' :
                                                                                product.status === 'PENDING' ? 'text-bg-warning' :
                                                                                    'text-bg-secondary'}`}>
                                                                        {product.status === 'active' ? 'Còn hàng' :
                                                                            product.status === 'CANCELLED' ? 'Đã hủy' :
                                                                                product.status === 'SHIPPED' ? 'Đã giao hàng' :
                                                                                    product.status === 'PENDING' ? 'Đang chờ' : 'Hoạt động'}
                                                                    </span>
                                                                </h6>
                                                            </td>
                                                            <td className="text-center">
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => handleAddProduct(product)}
                                                                    disabled={!idBill || addingProduct || errors[product.id]}
                                                                >
                                                                    {addingProduct ? (
                                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                    ) : (
                                                                        <MdAddCard />
                                                                    )}
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
                                    <div className="d-flex justify-content-end">
                                        <Pagination>
                                            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                                            <Pagination.Prev
                                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                            />
                                            {renderPaginationItems()}
                                            <Pagination.Next
                                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                            />
                                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                                        </Pagination>
                                    </div>
                                </Row>
                            </Container>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateProduct;
