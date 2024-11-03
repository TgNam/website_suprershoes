import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { toast } from 'react-toastify';

const ModelAddImage = () => {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null); // giữ ảnh dưới dạng File
    const [previewImage, setPreviewImage] = useState("");
    const [imageBytes, setImageBytes] = useState(null); // Lưu byte[]

    const handleClose = () => {
        setShow(false);
        setImage(null);
        setPreviewImage("");
        setImageBytes(null);
    };

    const handleShow = () => setShow(true);

    const apiClient = axios.create({
        baseURL: 'http://localhost:8080/api/image'
    });

    const postCreateNewProductImageRequest = async (ProductImageRequest) => {
        return await apiClient.post('uploadImage', ProductImageRequest);
    };

    // Sử dụng FileReader để chuyển File thành byte[]
    const handUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPreviewImage(URL.createObjectURL(file)); // Xem trước ảnh

            const reader = new FileReader();
            reader.onload = function (e) {
                const arrayBuffer = e.target.result;
                const bytes = new Uint8Array(arrayBuffer);
                setImageBytes(Array.from(bytes)); // Chuyển đổi thành mảng byte[]
            };
            reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
            setImage(file); // Lưu file để sử dụng nếu cần
        } else {
            setPreviewImage("");
        }
    };

    const handleSubmitCreate = async () => {
        if (!imageBytes) {
            toast.error("Please upload an image first.");
            return;
        }

        try {
            // Tạo đối tượng ProductImageRequest với imageBytes là byte[]
            const ProductImageRequest = {
                imageByte: imageBytes
            };

            const response = await postCreateNewProductImageRequest(ProductImageRequest);
            if (response.status === 200) {
                const data = response.data;
                toast.success(data);
                handleClose(); // Đóng modal khi upload thành công
            } else {
                toast.error('Error occurred while uploading the image');
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <IoIosAddCircleOutline /> Add new Image
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="uploadFile">
                                        <IoIosAddCircleOutline /> Upload file image
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="uploadFile"
                                        hidden
                                        onChange={handUploadImage}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="preview-image border border-secondary">
                                <Col>
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
                                    ) : (
                                        <span>Preview Image</span>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelAddImage;
