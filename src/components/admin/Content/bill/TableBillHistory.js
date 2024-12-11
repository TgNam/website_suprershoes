import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBillDetailsAndPayments } from '../../../../Service/ApiBillDetailService';
const NotFoundData = '/NotFoundData.png';

const TableBillHistory = ({ onAddTableBillHistory, codeBill }) => {
    const [billHistory, setBillHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pageSize = 5; // Số bản ghi tối đa mỗi trang

    // Fetch bill history data
    const fetchBillDetailsAndPayBill = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchBillDetailsAndPayments(codeBill);
            const reversedData = (data.billHistory || []).reverse(); // Đảo ngược dữ liệu
            setBillHistory(reversedData);
            setTotalPages(Math.ceil(reversedData.length / pageSize));
        } catch (error) {
            setError(error.message);
            toast.error('Error fetching bill history data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill();
        }
    }, [codeBill]);

    // Dữ liệu của trang hiện tại
    const currentData = billHistory.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                                <Table striped bordered hover responsive className='table'>
                                    <thead>
                                        <tr>
                                            <th className="text-center">Thời gian</th>
                                            <th className="text-center">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.length > 0 ? (
                                            currentData.map((historyItem, index) => (
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
                                                <td colSpan={2} className="preview-image justify-content-center text-center p-3">
                                                    <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                                                    <p className='p-3'>Không có dữ liệu</p>
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