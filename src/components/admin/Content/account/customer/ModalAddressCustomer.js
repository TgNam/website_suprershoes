// ModalAddressCustomer.js
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalCreateAddressCustomer from './ModalCreateAddressCustomer';

function ModalAddressCustomer() {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCloseAddressModal = () => setShowAddressModal(false);
    const handleShowAddressModal = () => setShowAddressModal(true);

    const handleOpenCreateModal = () => {
        setShowAddressModal(false); // Đóng ModalAddressCustomer
        setShowCreateModal(true);   // Mở ModalCreateAddressCustomer
    };

    const handleShowAddressAfterSubmit = () => {
        setShowCreateModal(false);  // Đóng ModalCreateAddressCustomer
        setShowAddressModal(true);  // Mở lại ModalAddressCustomer
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShowAddressModal}>
                <FaMapMarkedAlt />
            </Button>

            {/* Modal Address */}
            <Modal show={showAddressModal} onHide={handleCloseAddressModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Địa chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Mở ModalCreateAddressCustomer */}
                    <div className='text-end'>
                        <Button variant="outline-primary" onClick={handleOpenCreateModal}>
                            Thêm địa chỉ mới
                        </Button>
                    </div>
                    <hr />
                    <div className='row'>
                        <div class="form-check col-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                        </div>
                        <div className='col-7'>
                            <h5 className='fw-bold'>Nguyễn Văn A  <MdDelete color='red' /></h5>
                            <p>0983729351</p>
                            <p>Phú Đô, Nam Từ Liêm, Hà Nội, Việt Nam</p>
                            <Button variant='outline-success'>Mặc định</Button>
                        </div>
                        <div className='col-3'>
                            <Button variant='outline-warning'>Cập nhật</Button>
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div class="form-check col-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        </div>
                        <div className='col-7'>
                            <h5 className='fw-bold'>Nguyễn Văn A  <MdDelete color='red' /></h5>
                            <p>0983729351</p>
                            <p>Phú Đô, Nam Từ Liêm, Hà Nội, Việt Nam</p>
                        </div>
                        <div className='col-3'>
                            <Button variant='outline-warning'>Cập nhật</Button>
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div class="form-check col-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        </div>
                        <div className='col-7'>
                            <h5 className='fw-bold'>Nguyễn Văn A  <MdDelete color='red' /></h5>
                            <p>0983729351</p>
                            <p>Phú Đô, Nam Từ Liêm, Hà Nội, Việt Nam</p>
                        </div>
                        <div className='col-3'>
                            <Button variant='outline-warning'>Cập nhật</Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddressModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {showCreateModal && (
                <ModalCreateAddressCustomer
                    onSubmitSuccess={handleShowAddressAfterSubmit}
                />
            )}
        </>
    );
}

export default ModalAddressCustomer;
