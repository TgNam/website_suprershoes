import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBillDetailsAndPayments } from '../../../../Service/ApiBillDetailService';

const TableBillHistory = ({ onAddTableBillHistory, codeBill }) => {
    const [billHistory, setBillHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch bill history data
    const fetchBillDetailsAndPayBill = async (currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchBillDetailsAndPayments(codeBill, currentPage);
            setBillHistory(data.billHistory || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            setError(error.message);
            toast.error('Error fetching bill history data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill(currentPage);
        }
    }, [codeBill, currentPage]);

    // Render pagination items
    const renderPaginationItems = () => {
        const items = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <>
            <ToastContainer />
            <Container>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                ) : (
                    <>
                        <Row>
                            <Col>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th className="text-center">Thời gian</th>
                                            <th className="text-center">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billHistory.length > 0 ? (
                                            billHistory.map((historyItem, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {new Date(historyItem.createdAt).toLocaleString('vi-VN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="text-center">{historyItem.note}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    Không có lịch sử hóa đơn nào.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <div className="d-flex justify-content-end">
                                <Pagination>
                                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    />
                                    {renderPaginationItems()}
                                    <Pagination.Next
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    />
                                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                                </Pagination>
                            </div>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default TableBillHistory;
