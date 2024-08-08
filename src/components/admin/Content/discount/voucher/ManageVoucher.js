import { useState } from 'react';
import TableManageVoucher from "./TableManageVoucher";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const ManageVoucher = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    return (
        <div className="manage-cart-container">
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
                            <div className="cart-content">
                                <div className='shoe-content-header'>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-3">
                                            <label htmlFor="nameShoe" className="form-label">Mã của phiếu giảm giá</label>
                                            <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm phiếu giảm giá theo mã...." />
                                        </div>
                                        <div className='shoe-status col-6'>
                                            <label htmlFor="statusSale" className="form-label">Trạng thái phiếu giảm giá</label>
                                            <div className='shoe-status d-flex justify-content-start'>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusSale"
                                                        id="statusAll"
                                                        value="all"
                                                        checked={selectedStatus === 'all'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusAll">
                                                        Tất cả
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusSale"
                                                        id="statusUpcoming"
                                                        value="upcoming"
                                                        checked={selectedStatus === 'upcoming'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusUpcoming">
                                                        Sắp diễn ra
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusSale"
                                                        id="statusOngoing"
                                                        value="ongoing"
                                                        checked={selectedStatus === 'ongoing'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusOngoing">
                                                        Đang diễn ra
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusSale"
                                                        id="statusEnded"
                                                        value="ended"
                                                        checked={selectedStatus === 'ended'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusEnded">
                                                        Kết thúc
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusSale"
                                                        id="statusEndedEarly"
                                                        value="endedEarly"
                                                        checked={selectedStatus === 'endedEarly'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusEndedEarly">
                                                        Kết thúc sớm
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='shoe-add my-4 p-2 col-3'>
                                            <Link to="/admins/manage-voucher-create">
                                                <Button variant="info">
                                                    <IoIosAddCircleOutline /> Thêm phiếu giảm giá
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className='shoe-content-body mt-3'>
                                            <TableManageVoucher selectedStatus={selectedStatus} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ManageVoucher;