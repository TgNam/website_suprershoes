import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ModalAddressEmployee from './ModalAddressEmployee'
import ModelAccountDetail from './ModelAccountDetail';
import ModalUpdateAccountEmployee from './ModalUpdateAccountEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAccountEmployee } from '../../../../../redux/action/AccountAction';


const TableAccount = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.listAccountEmployee);

    useEffect(() => {
        dispatch(fetchAllAccountEmployee());
    }, [dispatch]);

    const handleUpdateStatusAccountEmployee = async (idAccountEmployee) => {
        // try {
        //     const response = await updateStatusSize(idAccountEmployee);
        //     if (response && response.status === 200) {
        //         toast.success("Đã cập nhật trạng thái");
        //         dispatch(fetchAllSize());
        //     } else {
        //         toast.error('Thao tác lỗi');
        //     }
        // } catch (error) {
        //     toast.error('Lỗi mạng');
        // }
    };
    // Khai báo state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Đặt số lượng mục hiển thị trên mỗi trang
    const currentAccounts = [...accounts];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentAccounts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentAccounts.length / itemsPerPage);

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


    return (
        <>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Tích điểm</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-Account-${index}`}>
                                <td>{index + 1 + (currentPage - 1) * 5}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.birthday.slice(0, 10) ? item.birthday.slice(0, 10) : 'N/A'}</td>
                                <td>{item.gender === 1 ? "Nam" : "Nữ"}</td>
                                <td>{item.rewards}</td>
                                <td>
                                    <div className="form-check form-switch ms-5">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id={`flexSwitchCheckChecked-${item.id}`}
                                            defaultChecked={item.status === 'ACTIVE'}
                                            onClick={() => handleUpdateStatusAccountEmployee(item.id)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <ModelAccountDetail idEmployee={item.id} />
                                    <ModalUpdateAccountEmployee idEmployee={item.id} />
                                    <ModalAddressEmployee idEmployee={item.id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>Not found data</td>
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

export default TableAccount;
