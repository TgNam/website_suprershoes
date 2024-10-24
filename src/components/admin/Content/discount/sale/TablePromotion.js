import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPromotion, updateStatusPromotionById } from '../../../../../redux/action/promotionAction';
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

const TablePromotion = () => {
    const dispatch = useDispatch();
    const { listPromotion } = useSelector(state => state.promotion);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const currentPromotion = [...listPromotion];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentPromotion.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentPromotion.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    // Tạo danh sách các nút phân trang
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
    useEffect(() => {
        dispatch(fetchAllPromotion());
    }, [dispatch]);
    const showStatus = (status) => {
        switch (status) {
            case 'UPCOMING':
                return 'Sắp diễn ra';
            case 'ONGOING':
                return 'Đang diễn ra';
            case 'FINISHED':
                return 'Kết thúc';
            case 'ENDING_SOON':
                return 'Kết thúc sớm';
            default:
                return '';
        }
    }
    const handleUpdateStatusPromotion = async (idPromotion, isChecked) => {
        dispatch(updateStatusPromotionById(idPromotion, isChecked))
    };
    return (
        <>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khuyến mãi</th>
                        <th>Tên khuyến mãi</th>
                        <th>Giá trị (%)</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1 + (currentPage - 1) * 5}</td>
                                <td>{item.codePromotion}</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
                                <td>{item.startAt ? item.startAt.slice(0, 10) : 'N/A'}</td>
                                <td>{item.endAt ? item.endAt.slice(0, 10) : 'N/A'}</td>
                                <td>{showStatus(item.status)}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-between mx-2">
                                        <Button variant="warning">
                                            <FaRegEye />
                                        </Button>
                                        <Button variant="success">
                                            <FaPenToSquare />
                                        </Button>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={`flexSwitchCheckChecked-${item.id}`}
                                                checked={item.status === 'ONGOING' || item.status === 'UPCOMING'}
                                                onChange={(e) => handleUpdateStatusPromotion(item.id, e.target.checked)}  // Truyền trạng thái checked
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Không tìm thấy khuyến mãi</td>
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

export default TablePromotion;
