import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelAddColor() {
    const colors = [
        { id: 1, code_color: "#FF0000" },
        { id: 2, code_color: "#00FF00" },
        { id: 3, code_color: "#0000FF" },
        { id: 4, code_color: "#FFFF00" },
        { id: 5, code_color: "#FF00FF" },
        { id: 6, code_color: "#00FFFF" },
        { id: 7, code_color: "#800080" },
        { id: 8, code_color: "#FFA500" },
        { id: 9, code_color: "#A52A2A" }
    ];

    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState(Array(colors.length).fill(false));

    const handleClose = () => {
        setShow(false);
        setButtonStates(Array(colors.length).fill(false));
    };

    const handleShow = () => setShow(true);

    const handleSave = () => {
        const selectedColors = colors.filter((color, index) => buttonStates[index]);
        console.log(selectedColors);
        setButtonStates(Array(colors.length).fill(false));
        setShow(false);
    };

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm màu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-end mb-2'>
                        <Button>Thêm màu</Button>
                    </div>
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            style={{ backgroundColor: color.code_color }}
                            className={buttonStates[index] ? "btn btn-primary m-3" : "btn btn-outline-primary m-2"}
                            onClick={() => handleButtonClick(index)}
                        >
                            {color.code_color}
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

export default ModelAddColor;