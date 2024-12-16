import { useState, useEffect } from 'react';
import TablePromotion from "./TablePromotion";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchPosts, fetchAllPromotion } from '../../../../../redux/action/promotionAction';
import EventListener from '../../../../../event/EventListener'
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";
const ManagePromotion = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [searchStatus, setSearchStatus] = useState(""); // Tạo state để lưu trạng thái
    const { listPromotion } = useSelector(state => state.promotion);
    // Cập nhật dữ liệu khi giá trị search hoặc searchStatus thay đổi
    useEffect(() => {
        dispatch(fetchAllPromotion());
    }, [dispatch]);

    const filteredAccounts = listPromotion.filter((promotion) => {
        const searchLower = search?.trim().toLowerCase();
        const statusFilter = searchStatus.toLowerCase();

        // Tìm kiếm theo tên hoặc số điện thoại
        const namePromotion = promotion.name?.trim().toLowerCase().includes(searchLower);
        const codePromotion = promotion.codePromotion?.trim().toLowerCase().includes(searchLower);

        // Lọc theo trạng thái nếu `searchStatus` được cung cấp
        const statusMatch = searchStatus === "" || promotion.status?.toLowerCase() === statusFilter;

        return (namePromotion || codePromotion) && statusMatch;
    });

    // Hàm xử lý khi radio button thay đổi giá trị
    const handleStatusChange = (event) => {
        setSearchStatus(event.target.value); // Cập nhật state khi thay đổi radio button
    };
    const handlers = {
        UPDATE_PROMOTION: () => dispatch(fetchAllPromotion())
    };
    // Tự động gọi fetchAllPromotion mỗi 30 giây
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(fetchAllPromotion());
        }, 30000); // 30 giây

        // Dọn dẹp khi component bị unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);
    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
                <div className="manage-promotion-container">
                    <EventListener handlers={handlers} />
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
                                                    <label htmlFor="promotionCode" className="form-label">Tìm kiếm:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="promotionCode"
                                                        placeholder="Mã và tên đợt khuyến mại...."
                                                        onChange={(event) => setSearch(event.target.value)}
                                                    />
                                                </div>
                                                <div className='promotion-status col-6'>
                                                    <label htmlFor="statusPromotion" className="form-label">Trạng thái khuyến mãi:</label>
                                                    <div className='promotion-status d-flex justify-content-start'>
                                                        <div className="form-check m-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="statusPromotion"
                                                                value=""
                                                                checked={searchStatus === ""} // Gán checked dựa trên state
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
                                                                value="UPCOMING"
                                                                checked={searchStatus === "UPCOMING"}
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
                                                                value="ONGOING"
                                                                checked={searchStatus === "ONGOING"}
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
                                                                value="FINISHED"
                                                                checked={searchStatus === "FINISHED"}
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
                                                                value="ENDING_SOON"
                                                                checked={searchStatus === "ENDING_SOON"}
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
                                                    <TablePromotion filteredAccounts={filteredAccounts} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard>
    );
};

export default ManagePromotion;
