import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEye } from "react-icons/io";

const ModalViewProductDetail = ({ id }) => {
    const [show, setShow] = useState(false);
    const [productDetailInfo, setProductDetailInfo] = useState({
        quantity: '',
        price: '',
        nameProduct: '',
        nameBrand: '',
        nameCategory: '',
        nameMaterial: '',
        nameShoeSole: '',
        nameColor: '',
        nameSize: '',
        status: '',
        // Add other fields as necessary
    });

    // Load data when the modal is opened
    useEffect(() => {

        if (id) {
            const fetchProductDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/productDetail/list-productDetail?id=${id}`);
                    const data = response.data.DT.content[0]; // Assuming data is returned in this format
                    setProductDetailInfo({
                        quantity: data.quantity,
                        price: data.price,
                        nameProduct: data.nameProduct, 
                        nameBrand: data.nameBrand,
                        nameCategory: data.nameCategory,
                        nameMaterial: data.nameMaterial,
                        nameShoeSole: data.nameShoeSole,
                        nameColor: data.nameColor,
                        nameSize: data.nameSize,
                        status: data.status,
                        // Add other fields as necessary
                        // Set other fields as necessary
                    });
                    console.log('Error fetching product detail:', data);
                } catch (error) {
                    console.error('Error fetching product detail:', error);
                    toast.error('Failed to load product detail. Please try again.');
                }
            };
 
            fetchProductDetail();
        }
    }, [id]);

    // Handle modal visibility
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            <IoIosEye />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>Product</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameProduct"
                                    value={productDetailInfo.nameProduct}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameBrand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameBrand"
                                    value={productDetailInfo.nameBrand}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameCategory</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameCategory"
                                    value={productDetailInfo.nameCategory}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameMaterial</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameMaterial"
                                    value={productDetailInfo.nameMaterial}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameShoeSole</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameShoeSole"
                                    value={productDetailInfo.nameShoeSole}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameSize</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameSize"
                                    value={productDetailInfo.nameSize}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>nameColor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameColor"
                                    value={productDetailInfo.nameColor}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={productDetailInfo.quantity}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={productDetailInfo.price}
                                    readOnly // Make input read-only
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="status"
                                    value={productDetailInfo.status}
                                    readOnly // Make input read-only
                                />
                            </Form.Group> */}
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewProductDetail;
