import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { postCreateNewCategory } from '../../../../../Service/ApiCategoryService';
import { useDispatch } from 'react-redux';
import { fetchAllCategory } from '../../../../../redux/action/categoryAction';
import 'react-toastify/dist/ReactToastify.css';
function ModelCreateCategory() {
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

    const handleCreateCategory = async () => {
        // const isValidateSize = validateSize(name);
        // if (!isValidateSize) {
        //     toast.error("Vui lòng nhập kích cỡ từ 20 đến 100");
        //     return;
        // }

        try {
            const createCategory = { name };
            let res = await postCreateNewCategory(createCategory);

            if (res.status === 200) {
                toast.success(res.data);
                handleClose();
                dispatch(fetchAllCategory());
            } else {
                toast.error("Thêm danh mục thất bại.");
            }
        } catch (error) {
            // Kiểm tra xem lỗi có phải từ phản hồi của server không
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi thêm danh mục.");
            }
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm danh mục
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="category">Tên danh mục</Form.Label>
                    <Form.Control
                        type="text"
                        id="category"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateCategory;