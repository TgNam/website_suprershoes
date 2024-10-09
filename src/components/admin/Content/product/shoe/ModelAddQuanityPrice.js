import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ModelAddQuanityPrice({ initialSizes = [] }) {
    const [quantity, setQuantity] = useState(initialSizes); // Nhận initialSizes từ props
    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState(Array(quantity.length).fill(false));
    const [price, setPrice] = useState([]); // Nhận initialSizes từ props
    // Hiển thị modal
    const handleShow = () => setShow(true);

    // Đóng modal
    const handleClose = () => {
        setShow(false);
        setButtonStates(Array(quantity.length).fill(false)); // Reset trạng thái button
    };

    // Xử lý khi nhấn nút
    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    // Xử lý khi lưu size mới
    const handleSave = () => {
        if (quantity) {
            setQuantity([...quantity, price]); // Thêm size mới vào mảng quantity

        }
        handleClose(); // Đóng modal sau khi lưu
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chỉnh số lượng và giá chung
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm số lượng và giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-end mb-2'>
                        <input
                            type="number"
                            value={quantity} // Giá trị input
                            onChange={(e) => setQuantity(e.target.value)} // Xử lý sự kiện thay đổi input
                            placeholder="Nhập số lượng mới"
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            value={price} // Giá trị input
                            onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                            placeholder="Nhập số lượng mới"
                            className="form-control mb-2"
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelAddQuanityPrice;
