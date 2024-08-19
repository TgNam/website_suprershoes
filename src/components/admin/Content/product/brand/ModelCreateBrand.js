import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewBrand } from '../../../../../Service/ApiBrandService';
import { useDispatch } from 'react-redux';
import { fetchAllBrand } from '../../../../../redux/action/brandAction';
import 'react-toastify/dist/ReactToastify.css';
function ModelCreateBrand() {
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

    const handleCreateBrand = async () => {
        // const isValidateSize = validateSize(name);
        // if (!isValidateSize) {
        //     toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
        //     return;
        // }

        try {
            const createBrand = { name };
            let res = await postCreateNewBrand(createBrand);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllBrand());
            } else {
                toast.error("Thêm hãng thất bại.");
            }
        } catch (error) {
            // Kiểm tra xem lỗi có phải từ phản hồi của server không
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi thêm hãng.");
            }
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm hãng sản phẩm
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm hãng sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="Brand">Tên hãng</Form.Label>
                    <Form.Control
                        type="text"
                        id="Brand"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateBrand}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateBrand;