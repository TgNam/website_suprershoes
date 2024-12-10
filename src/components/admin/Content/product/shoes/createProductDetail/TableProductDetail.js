import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector } from 'react-redux';
import uploadFile from './pngegg.png'
const NotFoundData = '/NotFoundData.png';
const TableProductDetail = ({ product, productDetail, setProductDetail, selectedProductDetail, setSelectedProductDetail }) => {

    const [isAllChecked, setIsAllChecked] = useState(false);

    const validateProduct = (productDetail) => {
        if (!productDetail.quantity || productDetail.quantity < 0) {
            toast.error(`Sản phẩm ${product?.name} màu ${getColorName(productDetail.idColor)} - kích cỡ ${getSizeName(productDetail.idSize)} có số lượng không hợp lệ!`);
            return false;
        }
        if (!productDetail.price || productDetail.price <= 0) {
            toast.error(`Sản phẩm ${product?.name} màu ${getColorName(productDetail.idColor)} - kích cỡ ${getSizeName(productDetail.idSize)} có giá không hợp lệ!`);
            return false;
        }
        if (!productDetail.previewImages || productDetail.previewImages.length === 0) {
            toast.error(`Sản phẩm ${product?.name} màu ${getColorName(productDetail.idColor)} - kích cỡ ${getSizeName(productDetail.idSize)} cần ít nhất một hình ảnh!`);
            return false;
        }
        return true;
    };

    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            // Lọc chỉ những sản phẩm hợp lệ
            const validProducts = productDetail.filter(validateProduct);
            if (validProducts.length !== productDetail.length) {
                toast.error("Một số sản phẩm không hợp lệ, không thể chọn tất cả!");
                setIsAllChecked(false);
                setSelectedProductDetail([]); // Bỏ chọn tất cả
            }
            setSelectedProductDetail([...validProducts]); // Chỉ chọn sản phẩm hợp lệ
        } else {
            setSelectedProductDetail([]); // Bỏ chọn tất cả
        }
    };


    const handleCheckProduct = (event, item) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Kiểm tra sản phẩm trước khi thêm
            if (validateProduct(item)) {
                setSelectedProductDetail((prev) => {
                    if (!prev.includes(item)) {
                        return [...prev, item];
                    }
                    return prev; // Không thêm nếu đã tồn tại
                });
            }
        } else {
            // Xóa sản phẩm khỏi danh sách
            setSelectedProductDetail((prev) => prev.filter(product => product !== item));
        }
    };

    useEffect(() => {
        setIsAllChecked(selectedProductDetail.length === productDetail.length && productDetail.length > 0);
    }, [selectedProductDetail, productDetail]);

    const colors = useSelector((state) => state.color.listColor);
    const sizes = useSelector((state) => state.size.listSize);
    // Hàm lấy tên size từ danh sách sizes
    const getSizeName = (id) => {
        const size = sizes.find((item) => item.id === id);
        return size ? size.name : id; // Nếu không tìm thấy, trả về id
    };

    // Hàm lấy tên màu từ danh sách colors
    const getColorName = (id) => {
        const color = colors.find((item) => item.id === id);
        return color ? color.name : id; // Nếu không tìm thấy, trả về id
    };

    const handleQuantityChange = (event, item) => {
        setSelectedProductDetail([]);
        setIsAllChecked(false);
        const { value } = event.target;
        if (value < 1) return; // Số lượng phải >= 1
        if (value > 100000) return;
        setProductDetail((prev) =>
            prev.map((detail) =>
                detail === item ? { ...detail, quantity: parseInt(value, 10) } : detail
            )
        );
    };

    const isValidNumber = (value) => {
        if (!value) return "0";
        return /^\d+(\.\d{0,2})?$/.test(value); // Kiểm tra giá trị chỉ chứa số và tối đa 2 chữ số sau dấu thập phân
    };
    const formatCurrency = (value) => {
        if (!value) return "0";
        const roundedValue = Math.round(value);
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const handleAmountChange = (event, item) => {
        setSelectedProductDetail([]);
        setIsAllChecked(false);
        const value = event.target.value.replace(/,/g, "");
        if (Number(value) < 0) return; // Số lượng phải >= 1
        if (Number(value) > 100000000000) return;
        if (isValidNumber(value)) {
            setProductDetail((prev) =>
                prev.map((detail) =>
                    detail === item ? { ...detail, price: Number(value) } : detail
                )
            );
        } else {
            toast.error("Vui lòng chỉ nhập số.");
        }
    }

    const handleUploadImages = (files, item) => {
        setSelectedProductDetail([]);
        setIsAllChecked(false);
        const fileList = Array.from(files); // Chuyển đổi FileList thành mảng

        if (fileList.length > 5) {
            toast.error("Chỉ có thể chọn tối đa 5 ảnh");
            return;
        }

        const newImages = fileList.slice(0, 5); // Giới hạn tối đa 5 file
        const newPreviewImages = newImages.map((file) => URL.createObjectURL(file));

        // Đọc nội dung file thành byte array
        const readers = newImages.map((file) => {
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

        // Cập nhật productDetail
        Promise.all(readers).then((bytesArray) => {
            setProductDetail((prev) =>
                prev.map((detail) =>
                    detail.idColor === item.idColor // Cập nhật tất cả các mục có cùng idColor
                        ? {
                            ...detail,
                            listImage: [...detail.listImage, ...bytesArray], // Thêm byte[] vào listImage
                            previewImages: [...detail.previewImages, ...newPreviewImages], // Thêm preview URL
                        }
                        : detail
                )
            );
        });
    };


    const handleFileChange = (event, item) => {
        const files = event.target.files; // Lấy toàn bộ danh sách file
        if (files) {
            handleUploadImages(files, item);
        }
    };

    const handleDrop = (event, item) => {
        event.preventDefault();
        const files = event.dataTransfer.files; // Lấy danh sách file
        if (files) {
            handleUploadImages(files, item); // Gọi hàm upload ảnh cho item
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRowClick = (item) => {
        document.getElementById(`uploadListFiles-${item.idColor}-${item.idSize}`).click(); // Truy cập input file của dòng hiện tại
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
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    id="flexCheckAll"
                                    checked={isAllChecked}
                                    onChange={handleCheckAll}
                                />
                            </th>
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
                                <tr key={`${item.idColor}-${item.idSize}`}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={`flexCheckProduct-${item.idColor}-${item.idSize}`}
                                            checked={selectedProductDetail.includes(item)}
                                            onChange={(event) => handleCheckProduct(event, item)}
                                        />
                                    </td>
                                    <td>{index + 1 + (currentPage - 1) * 5}</td>
                                    <td>{product?.name}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            id="quantityProductDetail"
                                            name="quantityProductDetail"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(event) => handleQuantityChange(event, item)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3">
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type='text'
                                                    value={formatCurrency(item.price)}
                                                    onChange={(event) => handleAmountChange(event, item)}
                                                />
                                                <InputGroup.Text>VND</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </td>
                                    <td>{getColorName(item.idColor)}</td>
                                    <td>{getSizeName(item.idSize)}</td>
                                    <td>
                                        <Form.Control
                                            type="file"
                                            id={`uploadListFiles-${item.idColor}-${item.idSize}`} // ID duy nhất cho từng dòng
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            multiple
                                            onChange={(event) => handleFileChange(event, item)}
                                        />
                                        <Row
                                            className="preview-image text-center"
                                            onClick={() => handleRowClick(item)} // Truyền item để xác định dòng hiện tại
                                            onDrop={(event) => handleDrop(event, item)}
                                            onDragOver={handleDragOver}
                                        >
                                            <Col>
                                                {item.previewImages && item.previewImages.length > 0 ? (
                                                    item.previewImages.slice(0, 5).map((image, index) => (
                                                        <img
                                                            src={image}
                                                            alt={`Preview ${index}`}
                                                            style={{ maxWidth: "50px", margin: "5px" }}
                                                            key={image}
                                                        />
                                                    ))
                                                ) : (
                                                    <img src={uploadFile} alt="Preview" style={{ maxWidth: "20%" }} />
                                                )}
                                            </Col>
                                        </Row>
                                    </td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="preview-image justify-content-center text-center p-3">
                                    <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                                    <p className='p-3'>Không có dữ liệu</p>
                                </td>
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