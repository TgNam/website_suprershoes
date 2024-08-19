import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMaterial } from '../../../../../redux/action/materialAction';
import { updateStatusMaterial } from '../../../../../Service/ApiMaterialService';
import Pagination from 'react-bootstrap/Pagination';
const TableMaterial = () => {
    const dispatch = useDispatch();
    const materials = useSelector((state) => state.material.listMaterial);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchAllMaterial());
    }, [dispatch]);

    const handleUpdateStatusMaterial = async (idMaterial) => {
        try {
            const response = await updateStatusMaterial(idMaterial);
            if (response && response.status === 200) {
                toast.success("Đã cập nhật trạng thái");
                dispatch(fetchAllMaterial());
            } else {
                toast.error('Thao tác lỗi');
            }
        } catch (error) {
            toast.error('Lỗi mạng');
        }
    };

    const sortedMaterials = [...materials].sort((a, b) => a.name.localeCompare(b.name));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedMaterials.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedMaterials.length / itemsPerPage);

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

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên kích cỡ</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id={`flexSwitchCheckChecked-${item.id}`}
                                            defaultChecked={item.status === 'ACTIVE'}
                                            onClick={() => handleUpdateStatusMaterial(item.id)}
                                        />
                                    </div>
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

export default TableMaterial;
