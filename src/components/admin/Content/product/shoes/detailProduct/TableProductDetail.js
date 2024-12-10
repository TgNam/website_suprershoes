import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import ListImageProduct from '../ListImage'
import { updateStatusProductDetailById } from '../../../../../../redux/action/productDetailAction'
import { useSelector, useDispatch } from 'react-redux';
const NotFoundData = '/NotFoundData.png';
const TableProductDetail = ({ product, productDetail }) => {
    const dispatch = useDispatch();
    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                            <th>Trạng thái</th>
                            <th>Ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={`${item.id}`}>
                                    <td>{index + 1 + (currentPage - 1) * 5}</td>
                                    <td>{product?.name}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{formatCurrency(item?.price)} VND</td>
                                    <td>{item?.nameColor}</td>
                                    <td>{item?.nameSize}</td>
                                    <td>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={`flexSwitchCheckChecked-${item.id}`}
                                                checked={item.status === 'ACTIVE'}
                                                onChange={(e) => dispatch(updateStatusProductDetailById(product?.id, item.id, e.target.checked))}  // Truyền trạng thái checked
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Row className="preview-image text-center">
                                            <Col>
                                                <ListImageProduct id={item.id} maxWidth={'50px'} />
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