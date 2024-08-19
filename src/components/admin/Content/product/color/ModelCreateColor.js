import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewColor } from '../../../../../Service/ApiColorService';
import { useDispatch } from 'react-redux';
import { fetchAllColor } from '../../../../../redux/action/colorAction';
import 'react-toastify/dist/ReactToastify.css';
function ModelCreateColor() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [codeColor, setCodeColor] = useState("");
    const handleClose = () => {
        setName("");
        setCodeColor("");
        setShow(false);
    }
    const handleShow = () => setShow(true);

    // const validateSize = (size) => {
    //     const numericSize = Number(size);
    //     return numericSize > 20 && numericSize <= 100;
    // };

    const handleCreateColor = async () => {
        // const isValidateSize = validateSize(name);
        // if (!isValidateSize) {
        //     toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
        //     return;
        // }

        try {
            const createColor = { name, codeColor };
            let res = await postCreateNewColor(createColor);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllColor());
            } else {
                toast.error("Thêm kích cỡ thất bại.");
            }
        } catch (error) {
            // Kiểm tra xem lỗi có phải từ phản hồi của server không
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi thêm kích cỡ.");
            }
        }
    };


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm màu sắc
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm màu sắc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="nameColor">Tên màu sắc</Form.Label>
                    <Form.Control
                        type="text"
                        id="nameColor"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Label htmlFor="codeColor">Mã màu sắc</Form.Label>
                    <Form.Control
                        type="text"
                        id="codeColor"
                        value={codeColor}
                        onChange={(event) => setCodeColor(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateColor}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateColor;