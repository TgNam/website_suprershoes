import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IoIosEye } from "react-icons/io";
function ModelDetailProduct({ initialSizes = [] }){
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
                <div className='text-end mb-2'>
                    <input
                        type="number"
                        // value={quantity} // Giá trị input
                        // onChange={(e) => setQuantity(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="id"
                        className="form-control mb-2"
                    />
                    <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="name"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="so luong"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="gia"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="Nhập số lượng mới"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="Nhập số lượng mới"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="Nhập số lượng mới"
                        className="form-control mb-2"
                    />
                     <input
                        type="number"
                        // value={price} // Giá trị input
                        // onChange={(e) => setPrice(e.target.value)} // Xử lý sự kiện thay đổi input
                        placeholder="Nhập số lượng mới"
                        className="form-control mb-2"
                    />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);


}
export default ModelDetailProduct;