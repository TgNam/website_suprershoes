import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-bootstrap/Pagination';
import ModalCreateAddressCustomer from './ModalCreateAddressCustomer';
import ModalUpdateAddressCustomer from './ModalUpdateAddressCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAddress, updateAddressTypeByIdAddress, deleteByIdAddress } from '../../../../../redux/action/addressAction';
import { findAccountRequest } from '../../../../../redux/action/AccountAction';
import { toast } from 'react-toastify';

const ModalAddressCustomer = ({ idCustomer }) => {
    const dispatch = useDispatch();
    const { listAddress } = useSelector((state) => state.address);
    const accountDetail = useSelector((state) => state.account.accountDetail);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State để lưu idAddress được chọn
    const [selectedUpdateAddressById, setSelectedUpdateAddressById] = useState(null);
    const handleCloseAddressModal = () => setShowAddressModal(false);
    const handleShowAddressModal = () => setShowAddressModal(true);

    const handleOpenCreateModal = () => {
        setShowAddressModal(false); // Đóng ModalAddressCustomer
        setShowCreateModal(true);   // Mở ModalCreateAddressCustomer
    };
    const handleOpenUpdateModal = (idAddress) => {
        setSelectedUpdateAddressById(idAddress);
        setShowAddressModal(false); // Đóng ModalAddressCustomer
        setShowUpdateModal(true);   // Mở ModalUpdateAddressCustomer
    };
    const handleShowAddressAfterSubmit = () => {
        setShowCreateModal(false);  // Đóng ModalCreateAddressCustomer
        setShowUpdateModal(false);  // Đóng ModalUpdateAddressCustomer
        setShowAddressModal(true);  // Mở lại ModalAddressCustomer
    };

    const handleSubmit = () => {
        if (selectedAddressId) {
            dispatch(updateAddressTypeByIdAddress(selectedAddressId));
            setShowAddressModal(false);
        } else {
            toast.error("Vui lòng chọn địa chỉ nào")
        }
    }
    const handleDelete = (idAddress) => {
        try {
            dispatch(deleteByIdAddress(idAddress));
        } catch (error) {
            toast.error("Lỗi khi xóa. Vui lòng thử lại sau.");
        }

    }
    useEffect(() => {
        if (showAddressModal) {
            dispatch(fetchAllAddress(idCustomer));
            dispatch(findAccountRequest(idCustomer));
        }
    }, [dispatch, showAddressModal, idCustomer]);

    // Khai báo state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Đặt số lượng mục hiển thị trên mỗi trang
    const sortedListAddress = [...listAddress].sort((a, b) => b.type - a.type);
    const currentlistAddress = [...sortedListAddress];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentlistAddress.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentlistAddress.length / itemsPerPage);

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
            <Button variant="secondary" onClick={handleShowAddressModal} className='mx-3'>
                <FaMapMarkedAlt />
            </Button>
            <Modal show={showAddressModal} onHide={handleCloseAddressModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Địa chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-end'>
                        <Button variant="outline-primary" onClick={handleOpenCreateModal}>
                            Thêm địa chỉ mới
                        </Button>
                    </div>
                    <hr />
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <div className='row' key={`table-Address-${index}`}>
                                <div className="form-check col-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="addressRadio"
                                        defaultChecked={item.type === 1}
                                        onChange={() => setSelectedAddressId(item.id)} // Cập nhật idAddress khi chọn
                                    />
                                </div>
                                <div className='col-7'>
                                    <h5 className='fw-bold'>{accountDetail.name} | <MdDelete color='red' onClick={() => handleDelete(item.id)} /></h5>
                                    <p>{accountDetail.phoneNumber}</p>
                                    <p>{item.address}</p>
                                    {item.type === 1 ? <Button variant='outline-success'>Mặc định</Button> : ""}
                                </div>
                                <div className='col-3 mb-2'>
                                    <Button variant='outline-warning' onClick={() => handleOpenUpdateModal(item.id)}>Cập nhật</Button>
                                </div>
                                <hr className='m-2' />
                            </div>
                        ))
                    ) : (
                        <div>
                            <div className='text-center'>Không có địa chỉ nào</div>
                            <hr />
                        </div>
                    )}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddressModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {showCreateModal && (
                <ModalCreateAddressCustomer
                    idCustomer={idCustomer}
                    onSubmitSuccess={handleShowAddressAfterSubmit}
                />
            )}
            {showUpdateModal && (
                <ModalUpdateAddressCustomer
                    showUpdateModal={showUpdateModal}
                    idCustomer={idCustomer}
                    idAddress={selectedUpdateAddressById}
                    onSubmitSuccess={handleShowAddressAfterSubmit}
                />
            )}
        </>
    );
}

export default ModalAddressCustomer;
