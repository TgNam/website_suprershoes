import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IoEyeSharp } from "react-icons/io5";
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom'

const TableBill = ({ bills, onPageChange }) => {
    const { content, totalPages, number } = bills;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã hóa đơn</th>
                        <th>Tên khách hàng</th>
                        <th>Tên nhân viên</th>
                        <th>Loại</th>
                        <th>Ngày tạo</th>
                        <th>Tiền giảm</th>
                        <th>Tổng tiền</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {content && content.length > 0 ? (
                        content.map((item, index) => (
                            <tr key={`table-bill-${index}`}>
                                <td>{index + 1 + number * bills.size}</td>
                                <td>{item.codeBill || 'N/A'}</td>
                                <td>{item.nameCustomer || 'N/A'}</td>
                                <td>{item.nameEmployees || 'N/A'}</td>
                                <td>{item.type ? "Online" : "Tại quầy"}</td>
                                <td>{item.createdAt ? formatDate(item.createdAt) : 'N/A'}</td>
                                <td>{item.priceDiscount || 'N/A'}</td>
                                <td>{item.totalAmount || 'N/A'}</td>
                                <td>
                                    <Link to={`/admins/manage-bill-detail/${item.codeBill}`}>
                                        <Button variant="warning" className='me-5'>
                                            <IoEyeSharp />
                                        </Button>
                                    </Link>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center">No data found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex justify-content-center'>
    <Pagination>
        <Pagination.First onClick={() => onPageChange(0)} disabled={number === 0} />
        <Pagination.Prev onClick={() => onPageChange(Math.max(0, number - 1))} disabled={number === 0} />

        {/* Calculate the range of pages to display */}
        {(() => {
            const pageNumbers = [];
            const maxPagesToShow = 5;
            const halfRange = Math.floor(maxPagesToShow / 2);
            let startPage = Math.max(0, number - halfRange);
            let endPage = Math.min(totalPages - 1, number + halfRange);

            // Adjust if there are fewer than maxPagesToShow pages to display at the start or end
            if (endPage - startPage + 1 < maxPagesToShow) {
                if (startPage === 0) {
                    endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
                } else if (endPage === totalPages - 1) {
                    startPage = Math.max(0, endPage - maxPagesToShow + 1);
                }
            }

            for (let page = startPage; page <= endPage; page++) {
                pageNumbers.push(
                    <Pagination.Item
                        key={page}
                        active={page === number}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                );
            }
            return pageNumbers;
        })()}

        <Pagination.Next onClick={() => onPageChange(Math.min(totalPages - 1, number + 1))} disabled={number === totalPages - 1} />
        <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={number === totalPages - 1} />
    </Pagination>
</div>

        </>
    );
};

export default TableBill;
