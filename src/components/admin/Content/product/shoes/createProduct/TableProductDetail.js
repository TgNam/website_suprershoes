import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import uploadFile from './pngegg.png'
const TableProductDetail = ({ productDetail, setProductDetail }) => {

    const [images, setImages] = useState([]); // Lưu nhiều file
    const [previewImages, setPreviewImages] = useState([]); // Preview nhiều ảnh
    const [imageBytes, setImageBytes] = useState([]); // Lưu nhiều byte[]
    const handleUploadImages = (files) => {
        const fileList = Array.from(files); // Chuyển đổi FileList thành mảng

        if (fileList.length > 5) {
            toast.error("Chỉ có thể chọn tối đa 5 ảnh");
            return;
        }

        const newImages = fileList.slice(0, 5); // Giới hạn tối đa 5 file
        setImages(newImages);

        const newPreviewImages = newImages.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviewImages);

        const readers = newImages.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const arrayBuffer = e.target.result;
                    const bytes = new Uint8Array(arrayBuffer);
                    resolve(Array.from(bytes));
                };
                reader.readAsArrayBuffer(file);
            });
        });

        Promise.all(readers).then((bytesArray) => {
            setImageBytes(bytesArray);
        });
    };

    const handleFileChange = (event) => {
        const files = event.target.files; // Lấy toàn bộ danh sách file
        if (files) {
            handleUploadImages(files);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files; // Lấy toàn bộ danh sách file
        if (files) {
            handleUploadImages(files);
        }
    };


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRowClick = () => {
        document.getElementById("uploadListFiles").click();
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sorted = [...productDetail].sort((a, b) => a?.name?.localeCompare(b.name));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sorted.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    // Xác định các trang được hiển thị dựa trên currentPage
    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            // Nếu tổng số trang <= 3, hiển thị tất cả
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            // Nếu đang ở trang đầu tiên
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            // Nếu đang ở trang cuối cùng
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            // Nếu đang ở giữa
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };
    return (
        <>
            <div className="table-product-detail m-3">
                <Table striped bordered hover >
                    <thead className='table-info'>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th>Ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={`table-user-${index}`}>
                                    <td>{index + 1 + (currentPage - 1) * 5}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="file"
                                                id="uploadListFiles"
                                                accept='image/*'
                                                style={{ display: "none" }}
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </Form.Group>
                                        <Row
                                            className="preview-image text-center"
                                            onClick={handleRowClick}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            <Col>
                                                {previewImages.length > 0 ? (
                                                    previewImages.slice(0, 5).map((image, index) => (
                                                        <img
                                                            src={image}
                                                            alt={`Preview ${index}`}
                                                            style={{ maxWidth: '50px', margin: '5px' }}
                                                            key={image}
                                                        />
                                                    ))
                                                ) : (
                                                    <img src={uploadFile} alt="Preview" style={{ maxWidth: '20%' }} />
                                                )}
                                            </Col>
                                        </Row>

                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>Not found data</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

                    {getPaginationItems().map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handleClickPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </>
    );
}
export default TableProductDetail;