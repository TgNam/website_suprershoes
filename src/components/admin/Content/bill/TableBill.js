import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IoEyeSharp } from "react-icons/io5";
import Pagination from 'react-bootstrap/Pagination';



const TableBill = ({ bills, onPageChange }) => {
    const { content, totalPages, number } = bills;
    const navigate = useNavigate(); // Initialize navigate

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleViewDetail = (codeBill) => {
        // Navigate to the bill detail route with the specific codeBill
        navigate(`/admins/manage-bill-detail/${codeBill}`);
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
                                <td>{item.codeBill || 'Lỗi'}</td>
                                <td>{item.nameCustomer || 'Khách lẻ'}</td>
                                <td>{item.nameEmployees || ''}</td>
                                <td>{item.type === 1 ? "Online" : "Tại quầy"}</td>
                                <td>{item.createdAt ? formatDate(item.createdAt) : 'Lỗi'}</td>
                                <td>{item.priceDiscount ? formatCurrency(item.priceDiscount) : 'Không có'}</td>
                                <td>{item.totalAmount ? formatCurrency(item.totalAmount) : ''}</td>
                                <td>
                                    {/* Button to view details */}
                                    <Button
                                        variant="warning"
                                        className='me-5'
                                        onClick={() => handleViewDetail(item.codeBill)} // Pass the codeBill to navigate
                                    >
                                        <IoEyeSharp />
                                      
                                    </Button>
                                    
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

            {/* Pagination Controls */}
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => onPageChange(0)} disabled={number === 0} />
                    <Pagination.Prev onClick={() => onPageChange(Math.max(0, number - 1))} disabled={number === 0} />

                    {/* Calculate the start and end of the page window */}
                    {[...Array(5).keys()].map(i => {
                        const startPage = Math.max(0, Math.min(number - 2, totalPages - 5)); // Dynamically determine the start of the window
                        const page = startPage + i;
                        if (page < totalPages) {
                            return (
                                <Pagination.Item
                                    key={page}
                                    active={page === number}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            );
                        }
                        return null;
                    })}

                    <Pagination.Next onClick={() => onPageChange(Math.min(totalPages - 1, number + 1))} disabled={number === totalPages - 1} />
                    <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={number === totalPages - 1} />
                </Pagination>
            </div>

        </>
    );
};

export default TableBill;
