import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircle } from "react-icons/io";
import authorizeAxiosInstance from '../../../../../hooks/authorizeAxiosInstance';

function ModelAddColor({ onUpdateColor }) {
    const [colors, setColors] = useState([]);
    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [newColorName, setNewColorName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Lấy danh sách màu từ API
        authorizeAxiosInstance.get('/color/list-color')
            .then(response => {
                setColors(response.data);
                setButtonStates(Array(response.data.length).fill(false));
            })
            .catch(error => {
                console.error("Error fetching colors:", error);
            });
    }, []);

    const handleClose = () => {
        setShow(false);
        setButtonStates(Array(colors.length).fill(false));
        setError(''); // Reset lỗi khi đóng modal
    };

    const handleShow = () => setShow(true);

    const handleSave = () => {
        const selectedColors = colors.filter((color, index) => buttonStates[index]);
        if (onUpdateColor) {
            onUpdateColor(selectedColors);
        }
        setButtonStates(Array(colors.length).fill(false));
        setShow(false);
    };

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    const handleAddNewColor = () => {
        if (!newColor || !newColorName) {
            setError('Vui lòng nhập mã màu và tên màu!');
            return;
        }

        const colorExists = colors.some(color => color.codeColor === newColor);
        if (colorExists) {
            setError('Mã màu đã tồn tại!');
            return;
        }

        const newId = colors.length > 0 ? colors[colors.length - 1].id + 1 : 1;
        const newColorObject = { id: newId, codeColor: newColor, name: newColorName };
console.log("Dữ liệu gửi đi:", newColorObject);

        // Cập nhật danh sách màu mới
        setColors([...colors, newColorObject]);
        setButtonStates([...buttonStates, false]);
        setNewColor('');
        setNewColorName('');
        setError('');

        // Gọi API để lưu màu mới
        authorizeAxiosInstance.post('/color/create-color', newColorObject)
            .then(() => {
                console.log("Màu mới đã được thêm vào cơ sở dữ liệu!");
                
            })
            .catch(err => {
                console.error("Lỗi khi thêm màu:", err);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <IoIosAddCircle />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm màu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="text-danger">{error}</div>}
                    <div className='text-end mb-2'>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            placeholder="Nhập mã màu mới"
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                            placeholder="Nhập tên màu mới"
                            className="form-control mb-2"
                        />
                        <Button onClick={handleAddNewColor}>Thêm màu</Button>
                    </div>
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            style={{ backgroundColor: color.codeColor, width: '50px', height: '50px' }}
                            className={buttonStates[index] ? "m-3" : "m-2"}
                            onClick={() => handleButtonClick(index)}
                        />
                    ))}
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

export default ModelAddColor;
