import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
function ModelAddSize() {
    const sizes = [
        {
            id: 1,
            name: 38
        },
        {
            id: 2,
            name: 39
        },
        {
            id: 3,
            name: 40
        },
        {
            id: 4,
            name: 41
        },
        {
            id: 5,
            name: 42
        },
        {
            id: 6,
            name: 43
        },
        {
            id: 7,
            name: 44
        },
        {
            id: 8,
            name: 45
        },
        {
            id: 9,
            name: 46
        },
    ];
    const [show, setShow] = useState(false);
    const [buttonStates, setButtonStates] = useState(Array(sizes.length).fill(false));

    const handleClose = () => {
        setShow(false)
        setButtonStates(Array(sizes.length).fill(false))
    };
    const handleShow = () => setShow(true);

    const handleSave = () => {
        const selectedSizes = sizes.filter((size, index) => buttonStates[index]);
        console.log(selectedSizes);
        setButtonStates(Array(sizes.length).fill(false))
        setShow(false)
    };

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            <i className="bi bi-plus-square"></i>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-end mb-2'>
                        <Button>Thêm size</Button>
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
