import { useState } from 'react';
import TablePromotion from "./TablePromotion";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ManagePromotion = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [filters, setFilters] = useState({ status: '', codePromotion: '' });

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
            codePromotion: event.target.value,
        });
    };

    return (
        <div className="manage-promotion-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h3>Khuyến mãi</h3>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="promotion-content">
                                <div className='promotion-content-header'>
                                    <div className='promotion-search-add row'>
                                        <div className="promotion-search mb-3 col-3">
                                            <label htmlFor="promotionCode" className="form-label">Mã khuyến mãi</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="promotionCode"
                                                placeholder="Tìm kiếm khuyến mãi theo mã...."
                                                value={filters.codePromotion}
                                                onChange={handleCodeChange}
                                            />
                                        </div>
                                        <div className='promotion-status col-6'>
                                            <label htmlFor="statusPromotion" className="form-label">Trạng thái khuyến mãi</label>
                                            <div className='promotion-status d-flex justify-content-start'>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusPromotion"
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
                                                        name="statusPromotion"
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
                                                        name="statusPromotion"
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
                                                        name="statusPromotion"
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
                                                        name="statusPromotion"
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
                                        <div className='promotion-add my-4 p-2 col-3'>
                                            <Link to="/admins/manage-promotion-create">
                                                <Button variant="info">
                                                    <IoIosAddCircleOutline /> Thêm khuyến mãi
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className='promotion-content-body mt-3'>
                                            <TablePromotion filters={filters} />
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

export default ManagePromotion;
