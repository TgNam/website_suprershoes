import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-bootstrap/Pagination';
import ModalCreateAddressCustomer from './AddAddress';
import ModalUpdateAddressCustomer from './UpdateAddress';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAddress, updateAddressTypeByIdAddress, deleteByIdAddress } from '../../../redux/action/addressAction';
import { findAccountRequest } from '../../../redux/action/AccountAction';
import { toast } from 'react-toastify';
import "./EditUser.scss";

const ModalAddress = ({ idCustomer, onSubmitSuccess }) => {
    const dispatch = useDispatch();
    const { listAddress } = useSelector((state) => state.address);
    const accountDetail = useSelector((state) => state.account.accountDetail);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedUpdateAddressById, setSelectedUpdateAddressById] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 3;
    const sortedListAddress = [...listAddress].sort((a, b) => b.type - a.type);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedListAddress.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedListAddress.length / itemsPerPage);

    useEffect(() => {
        if (showAddressModal) {
            dispatch(fetchAllAddress(idCustomer));
            dispatch(findAccountRequest(idCustomer));
        }
    }, [dispatch, showAddressModal, idCustomer]);

    const handleShowAddressModal = () => setShowAddressModal(true);
    const handleCloseAddressModal = () => setShowAddressModal(false);

    const handleOpenCreateModal = () => {
        setShowAddressModal(false);
        setShowCreateModal(true);
    };

    const handleOpenUpdateModal = (idAddress) => {
        setSelectedUpdateAddressById(idAddress);
        setShowAddressModal(false);
        setShowUpdateModal(true);
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
            // onSubmitSuccess();
        } else {
            toast.error("Please select an address to update.");
        }
    };

    const handleDelete = (idAddress) => {
        try {
            dispatch(deleteByIdAddress(idAddress));

            // onSubmitSuccess();
        } catch {

        }
    };

    const handlePaginationClick = (page) => setCurrentPage(page);

    const getPaginationItems = () => {
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + 2);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShowAddressModal} className="mx-3">
                Địa chỉ
            </Button>
            <Modal show={showAddressModal} onHide={handleCloseAddressModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý địa chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-end">
                        <Button variant="outline-primary" onClick={handleOpenCreateModal}>
                            Thêm địa chỉ mới
                        </Button>
                    </div>
                    <hr />
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div className="row" key={item.id}>
                                <div className="form-check col-2">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="addressRadio"
                                        defaultChecked={item.type === 1}
                                        onChange={() => setSelectedAddressId(item.id)}
                                    />
                                </div>
                                <div className="col-7">
                                    <h5 className="fw-bold">
                                        {accountDetail.name}
                                        <MdDelete
                                            color="red"
                                            onClick={() => handleDelete(item.id)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </h5>
                                    <p>{accountDetail.phoneNumber}</p>
                                    <p>{item.address}</p>
                                    {item.type === 1 && (
                                        <Button variant="outline-success" disabled>
                                        Mặc định
                                        </Button>
                                    )}
                                </div>
                                <div className="col-3 mb-2">
                                    <Button
                                        variant="outline-warning"
                                        onClick={() => handleOpenUpdateModal(item.id)}
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                                <hr className="m-2" />
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No addresses available.</div>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First
                                onClick={() => handlePaginationClick(1)}
                                disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                                onClick={() => handlePaginationClick(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {getPaginationItems().map((page) => (
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handlePaginationClick(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePaginationClick(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                                onClick={() => handlePaginationClick(totalPages)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddressModal}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {showCreateModal && (
                <ModalCreateAddressCustomer
                    idCustomer={idCustomer}
                    onSubmitSuccess={() => {
                        setShowCreateModal(false);
                        setShowAddressModal(true);

                    }}
                />
            )}
            {showUpdateModal && (
    <ModalUpdateAddressCustomer
        showUpdateModal={showUpdateModal}
        idCustomer={idCustomer}
        idAddress={selectedUpdateAddressById}
        onSubmitSuccess={() => {
            setShowUpdateModal(false); // Close the update modal
            handleShowAddressAfterSubmit(); // Handle post-submit actions
        }}
    />
)}


        </>
    );
};

export default ModalAddress;
