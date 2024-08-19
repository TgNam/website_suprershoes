import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewShoeSole } from '../../../../../Service/ApiShoeSoleService';
import { useDispatch } from 'react-redux';
import { fetchAllShoeSole } from '../../../../../redux/action/shoeSoleAction';
import 'react-toastify/dist/ReactToastify.css';
function ModelCreateShoeSole() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleClose = () => {
        setName("");
        setShow(false);
    }
    const handleShow = () => setShow(true);

    // const validateSize = (size) => {
    //     const numericSize = Number(size);
    //     return numericSize > 20 && numericSize <= 100;
    // };

    const handleCreateShoeSole = async () => {
        // const isValidateSize = validateSize(name);
        // if (!isValidateSize) {
        //     toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
        //     return;
        // }

        try {
            const createShoeSole = { name };
            let res = await postCreateNewShoeSole(createShoeSole);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllShoeSole());
            } else {
                toast.error("Thêm loại đế thất bại.");
            }
        } catch (error) {
            // Kiểm tra xem lỗi có phải từ phản hồi của server không
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi thêm loại đế.");
            }
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm chất liệu đế giày
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm chất liệu đế giày</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="ShoeSole">Chất liệu đế giày</Form.Label>
                    <Form.Control
                        type="text"
                        id="ShoeSole"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateShoeSole}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateShoeSole;