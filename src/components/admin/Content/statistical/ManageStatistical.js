import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { IoBagCheckOutline } from "react-icons/io5";
import './ManageStatistical.scss'
const ManageStatistical = () => {
    const listProduct = [
        { id: 1, name: "A", nameCategory: "A1", nameBrand: "Nike", revenue: 4000000 },
        { id: 2, name: "B", nameCategory: "A2", nameBrand: "Nike", revenue: 2000000 },
        { id: 3, name: "C", nameCategory: "A3", nameBrand: "Nike", revenue: 1200000 },
        { id: 4, name: "D", nameCategory: "A4", nameBrand: "Nike", revenue: 1210000 },
        { id: 5, name: "E", nameCategory: "A5", nameBrand: "Nike", revenue: 1110000 }
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentProduct = [...listProduct];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentProduct.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentProduct.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };
    return (
        <div className="manage-cart-container">
            <div className="row m-3">
                <div className="col-6">
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">15</p>
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    
                </div>
            </div>
            <div className="row m-3">
                <div className="col-6">
                    <div className="bg-white rounded p-3 shadow-sm m-2">
                        <div><h5>Doanh thu theo sản phẩm</h5></div>
                        <div className='table-product mb-3'>
                            <Table striped bordered hover className='align-middle'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Loại sản phẩm</th>
                                        <th>Thương hiệu</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems && currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1 + (currentPage - 1) * 3}</td>
                                                <td><img src="https://placehold.co/100x100" alt="" /></td>
                                                <td>{item.name}</td>
                                                <td>{item.nameCategory}</td>
                                                <td>{item.nameBrand}</td>
                                                <td>{item.revenue}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className='text-center'>Không tìm thấy danh sách</td>
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
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="bg-white rounded p-3 shadow-sm m-2">
                        <div><h5>Doanh thu theo năm</h5></div>
                        <div className='table-product mb-3'>
                            <Table striped bordered hover className='align-middle'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Loại sản phẩm</th>
                                        <th>Thương hiệu</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems && currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1 + (currentPage - 1) * 3}</td>
                                                <td><img src="https://placehold.co/100x100" alt="" /></td>
                                                <td>{item.name}</td>
                                                <td>{item.nameCategory}</td>
                                                <td>{item.nameBrand}</td>
                                                <td>{item.revenue}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className='text-center'>Không tìm thấy danh sách</td>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManageStatistical;