import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircle } from "react-icons/io";
import authorizeAxiosInstance from '../../../../../hooks/authorizeAxiosInstance';

function ModelAddSize({ onUpdateSizes }) {
    const [sizes, setSizes] = useState([]); // Để trống ban đầu
    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [error, setError] = useState(''); // Thêm state error
    // Gọi API để lấy danh sách size từ cơ sở dữ liệu
    useEffect(() => {
        authorizeAxiosInstance.get('/size/list-size') // Thay bằng đường dẫn API thật
            .then(response => {
                setSizes(response.data); // Cập nhật size từ dữ liệu API
                setButtonStates(Array(response.data.length).fill(false)); // Cập nhật trạng thái button
            })
            .catch(error => {
                console.error("Error fetching sizes:", error);
            });
    }, []);

    const handleClose = () => {
        setShow(false);
        setButtonStates(Array(sizes.length).fill(false));
    };

    const handleShow = () => setShow(true);

    const handleSave = () => {
        const selectedSizes = sizes.filter((size, index) => buttonStates[index]);
        console.log("Selected Sizes:", selectedSizes);
        // Gọi callback để cập nhật size ở bên ngoài (nếu cần)
        if (onUpdateSizes) {
            onUpdateSizes(selectedSizes);
        }
        setButtonStates(Array(sizes.length).fill(false));
        setShow(false);
    };

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    const handleAddNewSize = () => {
        if (!newSize) {
            setError('Vui lòng nhập size!');
            return;
        }

        const sizeExists = sizes.some(size => size.name === parseInt(newSize));
        if (sizeExists) {
            setError('Size đã tồn tại!');
            return;
        }

        const newSizeObject = { id: sizes.length > 0 ? sizes[sizes.length - 1].id + 1 : 1, name: parseInt(newSize) };
        setSizes([...sizes, newSizeObject]);
        setButtonStates([...buttonStates, false]);
        setNewSize('');
        setError('');
        
        // Gọi API để lưu size mới
        authorizeAxiosInstance.post('/size/create-size', newSizeObject)
            .then(() => {
                console.log("Size mới đã được thêm vào cơ sở dữ liệu!");
            })
            .catch(err => {
                console.error("Lỗi khi thêm size:", err);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <IoIosAddCircle />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-end mb-2'>
                        <input
                            type="number"
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            placeholder="Nhập size mới"
                            className="form-control mb-2"
                        />
                        <Button onClick={handleAddNewSize}>Thêm size</Button>
                    </div>
                    {sizes.map((size, index) => (
                        <button
                            key={index}
                            type="button"
                            className={buttonStates[index] ? "btn btn-primary m-3" : "btn btn-outline-primary m-2"}
                            onClick={() => handleButtonClick(index)}
                        >
                            {size.name}
                        </button>
                    ))}
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

export default ModelAddSize;
