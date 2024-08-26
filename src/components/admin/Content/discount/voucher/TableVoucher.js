import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllVoucherAction,
    deleteVoucherAction
} from '../../../../../redux/action/voucherAction';
import { toast } from 'react-toastify';

const TableVoucher = ({ filters }) => {
    const dispatch = useDispatch();
    const { listVoucher, loading, error, totalPages } = useSelector(state => state.voucher);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(fetchAllVoucherAction(filters, currentPage, 10));
    }, [dispatch, filters, currentPage]);

    const handleDeleteVoucher = async (id) => {
        try {
            await dispatch(deleteVoucherAction(id));
            toast.success("Deleted successfully");
            dispatch(fetchAllVoucherAction(filters, currentPage, 10));
        } catch (error) {
            toast.error("Failed to delete");
        }
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
                        <th>Mã phiếu giảm giá</th>
                        <th>Tên</th>
                        <th>Giá trị</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listVoucher && listVoucher.length > 0 ? (
                        listVoucher.map((voucher, index) => (
                            <tr key={voucher.id}>
                                <td>{index + 1 + currentPage * 10}</td>
                                <td>{voucher.codeVoucher}</td>
                                <td>{voucher.name}</td>
                                <td>{voucher.value}</td>
                                <td>{voucher.status}</td>
                                <td>
                                    <Button variant="warning">Update</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteVoucher(voucher.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No vouchers found</td>
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

export default TableVoucher;
