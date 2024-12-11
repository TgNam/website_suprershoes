import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import './TableShoe.scss';
import { IoIosEye, IoMdAdd } from "react-icons/io";
import { updateStatusProductById } from '../../../../../redux/action/productAction'
import { Link } from 'react-router-dom';
import { FaPenToSquare } from "react-icons/fa6";
const NotFoundData = '/NotFoundData.png';
const TableShoe = ({ currentPage, setCurrentPage }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.listProduct);

    const itemsPerPage = 5;

    const sorted = [...product]

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
                <thead className='table'>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thương hiệu</th>
                        <th>Danh mục</th>
                        <th>Ảnh</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-product-${item.id}`}>
                                <td>{index + 1 + (currentPage - 1) * 5}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.nameBrand}</td>
                                <td>{item.nameCategory}</td>
                                <td>
                                    {item?.imageByte ? (
                                        <img
                                            src={`data:image/jpeg;base64,${item?.imageByte}`}
                                            alt="Product"
                                            style={{ maxWidth: '150px', maxHeight: '150px' }}
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/150x150"; // Đổi nguồn ảnh khi lỗi
                                            }}
                                        />
                                    ) : (
                                        <img src={`https://placehold.co/150x150`} alt="" style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                    )}
                                </td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id={`flexSwitchCheckChecked-${item.id}`}
                                            checked={item.status === 'ACTIVE'}
                                            onChange={(e) => dispatch(updateStatusProductById(item.id, e.target.checked))}  // Truyền trạng thái checked
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-start">
                                        <Link to={`/admins/manage-detail-shoe?idProduct=${item.id}`} className="mx-2">
                                            <Button variant='warning'>
                                                <IoIosEye />
                                            </Button>
                                        </Link>
                                        <Link to={`/admins/manage-update-shoe?idProduct=${item.id}`} className="mx-2">
                                            <Button   variant="success">
                                                <FaPenToSquare />
                                            </Button>
                                        </Link>
                                        <Link to={`/admins/manage-create-shoe-detail?idProduct=${item.id}`} className="mx-2">
                                            <Button>
                                                <IoMdAdd />
                                            </Button>
                                        </Link>
                                    </div>
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
