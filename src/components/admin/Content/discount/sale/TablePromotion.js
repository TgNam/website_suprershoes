import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPromotionAction, deletePromotionAction } from '../../../../../redux/action/promotionAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TablePromotion = ({ filters }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { listPromotion, loading, error, totalPages } = useSelector(state => state.promotion);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(fetchAllPromotionAction(filters, currentPage, 10));
    }, [dispatch, filters, currentPage]);

    const handleDeletePromotion = async (id) => {
        try {
            await dispatch(deletePromotionAction(id));
            toast.success("Xóa thành công");
            dispatch(fetchAllPromotionAction(filters, currentPage, 10));
        } catch (error) {
            toast.error("Xóa thất bại");
        }
    };

    const handleUpdatePromotionClick = (promotionId) => {
        navigate(`/admins/manage-promotion-update/${promotionId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khuyến mãi</th>
                        <th>Tên khuyến mãi</th>
                        <th>Giá trị (%)</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listPromotion && listPromotion.length > 0 ? (
                        listPromotion.map((promotion, index) => (
                            <tr key={promotion.id}>
                                <td>{index + 1 + currentPage * 10}</td>
                                <td>{promotion.codePromotion}</td>
                                <td>{promotion.name}</td>
                                <td>{promotion.value}</td>
                                <td>{promotion.status}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleUpdatePromotionClick(promotion.id)}
                                    >
                                        Cập nhật
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeletePromotion(promotion.id)}
                                    >
                                        Xóa
                                    </Button>
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
            <Pagination>
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default TablePromotion;
