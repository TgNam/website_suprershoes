import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoEyeSharp } from "react-icons/io5";
import Pagination from "react-bootstrap/Pagination";
import PrintBillButton from "./PrintBillButton";
const NotFoundData = '/NotFoundData.png';

const TableBill = ({ bills, onPageChange, fetchData }) => {
    const { content, totalPages, number } = bills;
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
    };

    const formatCurrency = (value) => {
        const roundedValue = Math.round(value);
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleViewDetail = (codeBill) => {
        navigate(`/admins/manage-bill-detail/${codeBill}`);
    };

    const handleReloadData = () => {
        if (fetchData) {
            fetchData(); // Reload data when PrintBillButton triggers
        }
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
                                <td>{item.codeBill || "Lỗi"}</td>
                                <td>{item.nameCustomer || "Khách lẻ"}</td>
                                <td>{item.nameEmployees || ""}</td>
                                <td>{item.type === 1 ? "Online" : "Tại quầy"}</td>
                                <td>{item.createdAt ? formatDate(item.createdAt) : "Lỗi"}</td>
                                <td>
                                    {item.priceDiscount ? formatCurrency(item.priceDiscount) : "Không có"}
                                </td>
                                <td>{item.totalAmount ? formatCurrency(item.totalAmount) : ""}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Button
                                            variant="warning"
                                            className="me-3"
                                            onClick={() => handleViewDetail(item.codeBill)}
                                        >
                                            <IoEyeSharp />
                                        </Button>
                                        <PrintBillButton
                                            codeBill={item.codeBill}
                                            onReloadData={handleReloadData}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="preview-image justify-content-center text-center p-3">
                                <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                                <p className='p-3'>Không có dữ liệu</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First
                        onClick={() => onPageChange(0)}
                        disabled={number === 0}
                    />
                    <Pagination.Prev
                        onClick={() => onPageChange(Math.max(0, number - 1))}
                        disabled={number === 0}
                    />

                    {[...Array(5).keys()].map((i) => {
                        const startPage = Math.max(0, Math.min(number - 2, totalPages - 5));
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

                    <Pagination.Next
                        onClick={() => onPageChange(Math.min(totalPages - 1, number + 1))}
                        disabled={number === totalPages - 1}
                    />
                    <Pagination.Last
                        onClick={() => onPageChange(totalPages - 1)}
                        disabled={number === totalPages - 1}
                    />
                </Pagination>
            </div>
        </>
    );
};

export default TableBill;
