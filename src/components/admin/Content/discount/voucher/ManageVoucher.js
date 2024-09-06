import { useState } from 'react';
import TableVoucher from "./TableVoucher"; 
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ManageVoucher = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [filters, setFilters] = useState({ status: '', codeVoucher: '' });

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setSelectedStatus(value);

        let status = '';
        switch (value) {
            case 'finished':
                status = 'FINISHED';
                break;
            case 'endingSoon':
                status = 'ENDING_SOON';
                break;
            case 'ongoing':
                status = 'ONGOING';
                break;
            case 'upcoming':
                status = 'UPCOMING';
                break;
            default:
                status = '';
                break;
        }

        setFilters({
            ...filters,
            status: status,
        });
    };

    const handleCodeChange = (event) => {
        setFilters({
            ...filters,
            codeVoucher: event.target.value,
        });
    };

    return (
        <div className="manage-voucher-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Phiếu giảm giá</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="voucher-content">
                                <div className='voucher-content-header'>
                                    <div className='voucher-search-add row'>
                                        <div className="voucher-search mb-3 col-3">
                                            <label htmlFor="voucherCode" className="form-label">Mã của phiếu giảm giá</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="voucherCode"
                                                placeholder="Tìm kiếm phiếu giảm giá theo mã...."
                                                value={filters.codeVoucher}
                                                onChange={handleCodeChange}
                                            />
                                        </div>
                                        <div className='voucher-status col-6'>
                                            <label htmlFor="statusVoucher" className="form-label">Trạng thái phiếu giảm giá</label>
                                            <div className='voucher-status d-flex justify-content-start'>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusVoucher"
                                                        id="statusAll"
                                                        value="all"
                                                        checked={selectedStatus === 'all'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusAll">
                                                        Tất cả
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusVoucher"
                                                        id="statusUpcoming"
                                                        value="upcoming"
                                                        checked={selectedStatus === 'upcoming'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusUpcoming">
                                                        Sắp diễn ra
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusVoucher"
                                                        id="statusOngoing"
                                                        value="ongoing"
                                                        checked={selectedStatus === 'ongoing'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusOngoing">
                                                        Đang diễn ra
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusVoucher"
                                                        id="statusEnded"
                                                        value="finished"
                                                        checked={selectedStatus === 'finished'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusEnded">
                                                        Kết thúc
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusVoucher"
                                                        id="statusEndedEarly"
                                                        value="endingSoon"
                                                        checked={selectedStatus === 'endingSoon'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusEndedEarly">
                                                        Kết thúc sớm
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='voucher-add my-4 p-2 col-3'>
                                            <Link to="/admins/manage-voucher-create">
                                                <Button variant="info">
                                                    <IoIosAddCircleOutline /> Thêm phiếu giảm giá
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className='voucher-content-body mt-3'>
                                            <TableVoucher filters={filters} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageVoucher;
