import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { CodeBillByEmployee, createNewBill } from '../../../../redux/action/billByEmployeeAction';
const TableVoucher = () => {
    const dispatch = useDispatch();
    const { codeBill, waitingList } = useSelector((state) => state.codeBill);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const sortedWaitingList = [...waitingList].sort((a, b) => a.localeCompare(b));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedWaitingList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedWaitingList.length / itemsPerPage);

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
    const handleAddUser = async (idUser) => {
        try {

        } catch (error) {
            toast.error('Network Error');
        }
    };
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã hóa đơn</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.split('-')[0]}</td>
                                <td>
                                    <Button variant="danger" className='me-5' onClick={() => handleAddUser(item.id)}>Chọn</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Not found data</td>
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

export default TableVoucher;
