import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IoIosEye } from "react-icons/io";

function ModelDetailProduct({ initialSizes = [] }) {
    const [products, setProducts] = useState(initialSizes);
    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState(Array(products.length).fill(false));

    // Hiển thị modal
    const handleShow = () => setShow(true);

    // Đóng modal
    const handleClose = () => {
        setShow(false);
        setButtonStates(Array(products.length).fill(false)); // Reset trạng thái button
    };

    // Xử lý khi nhấn nút
    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <IoIosEye />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sản phẩm chi tiết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <label htmlFor="productId" className="form-label">ID sản phẩm:</label>
                                <input
                                    type="number"
                                    placeholder="ID"
                                    id="productId"
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="productName" className="form-label">Tên sản phẩm:</label>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    id="productName"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <label htmlFor="productQuantity" className="form-label">Số lượng:</label>
                                <input
                                    type="number"
                                    placeholder="Số lượng"
                                    id="productQuantity"
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="productPrice" className="form-label">Giá:</label>
                                <input
                                    type="number"
                                    placeholder="Giá"
                                    id="productPrice"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <label htmlFor="newQuantity" className="form-label">Nhập số lượng mới:</label>
                                <input
                                    type="number"
                                    placeholder="Nhập số lượng mới"
                                    id="newQuantity"
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="additionalQuantity" className="form-label">Nhập số lượng thêm:</label>
                                <input
                                    type="number"
                                    placeholder="Nhập số lượng thêm"
                                    id="additionalQuantity"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDetailProduct;
