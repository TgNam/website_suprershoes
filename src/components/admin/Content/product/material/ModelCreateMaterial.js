import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewMaterial } from '../../../../../Service/ApiMaterialService';
import { useDispatch } from 'react-redux';
import { fetchAllMaterial } from '../../../../../redux/action/materialAction';
import 'react-toastify/dist/ReactToastify.css';
function ModelCreateMaterial() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleClose = () => {
        setName("");
        setShow(false);
    }
    const handleShow = () => setShow(true);

    // const validateMaterial = (size) => {
    //     const numericMaterial = Number(size);
    //     return numericMaterial > 20 && numericMaterial <= 100;
    // };

    const handleCreateMaterial = async () => {
        // const isValidateMaterial = validateMaterial(name);
        // if (!isValidateMaterial) {
        //     toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
        //     return;
        // }

        try {
            const createMaterial = { name };
            let res = await postCreateNewMaterial(createMaterial);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllMaterial());
            } else {
                toast.error("Thêm chất liệu thất bại.");
            }
        } catch (error) {
            // Kiểm tra xem lỗi có phải từ phản hồi của server không
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi thêm chất liệu.");
            }
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm chất liệu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm chất liệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="material">chất liệu</Form.Label>
                    <Form.Control
                        type="text"
                        id="material"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateMaterial}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateMaterial;