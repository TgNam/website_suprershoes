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

const ModelAddListImage = () => {
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]); // Lưu nhiều file
    const [previewImages, setPreviewImages] = useState([]); // Preview nhiều ảnh
    const [imageBytes, setImageBytes] = useState([]); // Lưu nhiều byte[]

    const handleClose = () => {
        setShow(false);
        setImages([]);
        setPreviewImages([]);
        setImageBytes([]);
    };

    const handleShow = () => setShow(true);

    const apiClient = axios.create({
        baseURL: 'http://localhost:8080/api/image'
    });

    const handleUploadImages = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files); // Chuyển đổi FileList thành mảng

        setImages(newImages); // Lưu nhiều file vào state

        const newPreviewImages = newImages.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviewImages); // Lưu preview của nhiều ảnh

        // Chuyển đổi tất cả các file thành byte[]
        const readers = newImages.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const arrayBuffer = e.target.result;
                    const bytes = new Uint8Array(arrayBuffer);
                    resolve(Array.from(bytes)); // Trả về mảng byte[]
                };
                reader.readAsArrayBuffer(file);
                console.log(file);
            });
        });

        // Chờ tất cả file được đọc xong
        Promise.all(readers).then((bytesArray) => {
            setImageBytes(bytesArray); // Cập nhật byte[]
        });
    };

    const handleSubmitCreate = async () => {
        if (imageBytes.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        try {
            // Tạo danh sách các đối tượng ProductImageRequest với imageBytes là mảng byte[]
            const ProductImageRequests = imageBytes.map((bytes) => ({
                imageByte: bytes // Tạo đối tượng ProductImageRequest cho từng mảng byte
            }));

            const response = await apiClient.post('uploadListImage', ProductImageRequests);
            console.log("ss",ProductImageRequests)
            if (response.status === 200) {
                toast.success(response.data); // Hiển thị thông báo thành công
                handleClose(); // Đóng modal khi upload thành công
            } else {
                toast.error('Error occurred while uploading the images');
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };


    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <IoIosAddCircleOutline /> Add List Images
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="uploadFiles">
                                        <IoIosAddCircleOutline /> Upload file images
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="uploadFiles"
                                        multiple // Cho phép chọn nhiều file
                                        onChange={handleUploadImages}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="preview-image border border-secondary">
                                <Col>
                                    {previewImages.length > 0 ? (
                                        previewImages.map((src, index) => (
                                            <img key={index} src={src} alt="Preview" style={{ maxWidth: '100%', margin: '5px' }} />
                                        ))
                                    ) : (
                                        <span>No preview images</span>
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

export default ModelAddListImage;
