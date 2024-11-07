import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelAddQuanityPrice({ onUpdate, selectedIndexes }) {
    const [quantity, setQuantity] = useState(''); // Khởi tạo giá trị số lượng
    const [price, setPrice] = useState(''); // Khởi tạo giá trị giá
    const [show, setShow] = useState(false);
    const [error, setError] = useState(''); // Biến kiểm tra lỗi

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setError(''); // Xóa thông báo lỗi khi đóng modal
        setShow(false);
    };

    // Xử lý khi lưu số lượng và giá
    const handleSave = () => {
        if (quantity <= 1) {
            setError('Số lượng phải lớn hơn 1');
            return;
        }
        if (price <= 100000) {
            setError('Giá phải lớn hơn 100,000');
            return;
        }

    

        // Gọi hàm onUpdate từ component cha với số lượng, giá mới, và danh sách chỉ số đã chọn
        onUpdate(selectedIndexes, quantity, price);
        setQuantity(''); // Đặt lại giá trị số lượng
        setPrice(''); // Đặt lại giá trị giá
        handleClose(); // Đóng modal sau khi lưu
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chỉnh số lượng và giá chung
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa số lượng và giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-end mb-2">
                        {error && <p className="text-danger">{error}</p>}
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Nhập số lượng mới"
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Nhập giá mới"
                            className="form-control mb-2"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelAddQuanityPrice;
