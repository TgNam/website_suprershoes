import { useState } from "react";
import TableVoucher from "./TableVoucher";
import Button from "react-bootstrap/Button";
import { FaSearch, FaSync } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
import EventListener from '../../../../../event/EventListener'
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";

const ManageVoucher = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
    let status = "";

    switch (value) {
      case "finished":
        status = "EXPIRED";
        break;
      case "endingSoon":
        status = "ENDED_EARLY";
        break;
      case "ongoing":
        status = "ONGOING";
        break;
      case "upcoming":
        status = "UPCOMING";
        break;
      default:
        status = "";
        break;
    }

    setFilters((prev) => ({
      ...prev,
      status: status,
    }));
    setCurrentPage(0);
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      type: value,
    }));
    setCurrentPage(0);
  };

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      searchTerm: value,
    }));
    setCurrentPage(0);
  };

  const handleStartDateChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      startDate: event.target.value,
    }));
    setCurrentPage(0);
  };

  const handleEndDateChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      endDate: event.target.value,
    }));
    setCurrentPage(0);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    dispatch(fetchAllVoucherAction(filters, 0, 5));
  };

  const handleReset = () => {
    setFilters({
      searchTerm: "",
      status: "",
      type: "",
      startDate: "",
      endDate: "",
    });
    setSelectedStatus("all");
    setCurrentPage(0);
    dispatch(fetchAllVoucherAction({}, 0, 5));
  };
  // const handlers = {
  //   UPDATE_VOUCHER: () => dispatch(fetchAllVoucherAction(filters, 0, 5))
  // };
  return (
    <AuthGuard>
      <RoleBasedGuard accessibleRoles={["ADMIN"]}>
        {/* <EventListener handlers={handlers} /> */}
        <div className="manage-voucher-container">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <h3>Quản lý phiếu giảm giá</h3>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="voucher-content">
                    <div className="voucher-content-header row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="voucherSearch"
                            className="form-label fw-bold"
                          >
                            Nhập mã hoặc tên
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="voucherSearch"
                            placeholder="Tìm kiếm theo mã hoặc tên"
                            value={filters.searchTerm}
                            onChange={handleSearchTermChange}
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label
                              htmlFor="voucherType"
                              className="form-label fw-bold"
                            >
                              Kiểu giảm giá
                            </label>
                            <select
                              className="form-select"
                              id="voucherType"
                              value={filters.type}
                              onChange={handleTypeChange}
                            >
                              <option value="">Tất cả</option>
                              <option value="0">Giảm theo %</option>
                              {/* <option value="1">Giảm theo số tiền</option> */}
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label
                              htmlFor="statusVoucher"
                              className="form-label fw-bold"
                            >
                              Trạng thái
                            </label>
                            <select
                              className="form-select"
                              id="statusVoucher"
                              value={selectedStatus}
                              onChange={handleStatusChange}
                            >
                              <option value="all">Tất cả</option>
                              <option value="upcoming">Sắp diễn ra</option>
                              <option value="ongoing">Đang diễn ra</option>
                              <option value="finished">Đã kết thúc</option>
                              <option value="endingSoon">Kết thúc sớm</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Ngày bắt đầu
                            </label>
                            <div className="d-flex">
                              <input
                                type="date"
                                className="form-control me-2"
                                value={filters.startDate}
                                onChange={handleStartDateChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Ngày kết thúc
                            </label>
                            <div className="d-flex">
                              <input
                                type="date"
                                className="form-control me-2"
                                value={filters.endDate}
                                onChange={handleEndDateChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12 text-center">
                        <Button
                          variant="secondary"
                          className="me-2"
                          onClick={handleReset}
                        >
                          <FaSync className="me-2" /> Nhập lại
                        </Button>
                        <Button variant="info" onClick={handleSearch}>
                          <FaSearch className="me-2" /> Tìm kiếm
                        </Button>
                      </div>
                    </div>

                    <div className="voucher-content-body mt-3">
                      <TableVoucher
                        filters={filters}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                      />
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

export default ManageVoucher;
