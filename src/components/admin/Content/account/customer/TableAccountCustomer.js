import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ModalAddressCustomer from './ModalAddressCustomer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAccountCusomer } from '../../../../../redux/action/AccountAction';
import { FaRegEye, FaMapMarkedAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from 'react-toastify';

const TableAccount = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.listAccountCusomer);

    // Khai báo state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Đặt số lượng mục hiển thị trên mỗi trang

    useEffect(() => {
        dispatch(fetchAllAccountCusomer());
    }, [dispatch]);

    const handleUpdateStatusAccountCustomer = async (idAccountCustomer) => {
        // try {
        //     const response = await updateStatusSize(idAccountCustomer);
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
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.birthday.slice(0, 10)}</td>
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
                                            onClick={() => handleUpdateStatusAccountCustomer(item.id)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <Button variant="warning" className='mx-2'><FaRegEye /></Button>
                                    <Button variant="success" className='mx-2'><FaPenToSquare /></Button>
                                    <ModalAddressCustomer />
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