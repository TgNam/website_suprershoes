import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { AiOutlineCheck } from "react-icons/ai";

const TableWaitingListBill = ({ searchTerm, selectedBills, onSelectedBillsChange }) => {
    const { waitingList } = useSelector((state) => state.codeBill);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Lọc danh sách chờ theo mã hóa đơn
    const filteredWaitingList = waitingList.filter((bill) =>
        bill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedWaitingList = [...filteredWaitingList].sort((a, b) => a.localeCompare(b));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedWaitingList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedWaitingList.length / itemsPerPage);

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

    const handleAddBill = (bill) => {
        let updatedSelectedBills;
        if (selectedBills.includes(bill)) {
            // Bỏ chọn hóa đơn nếu đã chọn
            updatedSelectedBills = selectedBills.filter((item) => item !== bill);
        } else if (selectedBills.length < 5) {
            // Chỉ cho phép chọn tối đa 5 hóa đơn
            updatedSelectedBills = [...selectedBills, bill];
        } else {
            toast.error('Chỉ được chọn tối đa 5 hóa đơn');
            return;
        }
        onSelectedBillsChange(updatedSelectedBills); // Gọi callback để cập nhật danh sách
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
                                    <Button
                                        variant={selectedBills.includes(item) ? 'success' : 'danger'}
                                        className='me-5 position-relative'
                                        onClick={() => handleAddBill(item)}
                                    >
                                        Chọn
                                        {selectedBills.includes(item) && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary border border-light rounded-circle p-1">
                                                <AiOutlineCheck />
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        )}
                                    </Button>
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

export default TableWaitingListBill;
