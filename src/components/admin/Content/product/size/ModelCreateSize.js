import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewSize } from '../../../../../Service/ApiSizeService';
import { useDispatch } from 'react-redux';
import { fetchAllSize } from '../../../../../redux/action/sizeAction';
import 'react-toastify/dist/ReactToastify.css';

function ModelCreateSize() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleClose = () => {
        setName("");
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const validateSize = (size) => {
        const numericSize = Number(size);
        return numericSize > 20 && numericSize <= 100;
    };

    const handleCreateSize = async () => {
        const isValidateSize = validateSize(name);
        if (!isValidateSize) {
            toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
            return;
        }

        try {
            const createSize = { name };
            let res = await postCreateNewSize(createSize);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllSize());
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
                Thêm kích cỡ
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm kích cỡ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="Size">Kích cỡ</Form.Label>
                    <Form.Control
                        type="text"
                        id="size"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateSize}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateSize;