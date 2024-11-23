import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import './TableShoe.scss';
// import ModelDetailProduct from './ModelDetailProduct';
// import ModelUpdateProduct from './ModelUpdateProduct';

const TableShoe = () => {

    const product = [1, 2, 3, 4, 5, 6]
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sorted = [...product].sort((a, b) => a?.name?.localeCompare(b.name));

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
            <Table striped bordered hover>
                <thead className='table-info'>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thương hiệu</th>
                        <th>Danh mục</th>
                        <th>Ảnh</th>
                        <th></th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-product-${index}`}>
                                <td>{index + 1 + (currentPage - 1) * 5}</td>
                                <td>'N/A'</td>
                                <td>'N/A'</td>
                                <td>'N/A'</td>
                                <td>'N/A'</td>
                                <td>'N/A'</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            // id={`flexSwitchCheckChecked-${item.id}`}
                                            // checked={item.status === 'ACTIVE'}
                                            // onChange={(e) => handleUpdateStatusSize(item.id, e.target.checked)}  // Truyền trạng thái checked
                                        />
                                    </div>
                                </td>
                                <td>
                                    {/* <ModelDetailProduct className="mx-4 p-2" idProduct={item.idProduct}></ModelDetailProduct>
                                    <ModelUpdateProduct className="mx-4 p-2" idProduct={item.idProduct}></ModelUpdateProduct> */}
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
};

export default TableShoe;
