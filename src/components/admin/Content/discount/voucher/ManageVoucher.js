import { useState } from "react";
import TableVoucher from "./TableVoucher";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from "react-bootstrap/Button";
<<<<<<< Updated upstream
import { Link } from "react-router-dom";
=======
import { FaSync, FaSearch } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
>>>>>>> Stashed changes

const ManageVoucher = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);

    let status = "";
    switch (value) {
      case "finished":
        status = "FINISHED";
        break;
      case "endingSoon":
        status = "ENDING_SOON";
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

    setFilters({
      ...filters,
      status: status,
    });

    setCurrentPage(0);
  };

  const handleSearchTermChange = (event) => {
    setFilters({
      ...filters,
      searchTerm: event.target.value,
    });
  };

  const handleStartDateChange = (event) => {
    setFilters({
      ...filters,
      startDate: event.target.value,
    });
  };

  const handleEndDateChange = (event) => {
    setFilters({
      ...filters,
      endDate: event.target.value,
    });
  };

<<<<<<< Updated upstream
=======
  const handleSearch = () => {
    setCurrentPage(0);
    dispatch(fetchAllVoucherAction(filters, 0, 10));
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
    dispatch(fetchAllVoucherAction({}, 0, 10));
  };

  const handleShowModal = (voucher) => {
    setSelectedVoucher(voucher);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

>>>>>>> Stashed changes
  return (
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
              <h3>Danh sách phiếu giảm giá</h3>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="voucher-content">
<<<<<<< Updated upstream
                <div className="voucher-content-header">
                  <div className="voucher-search-add row">
                    <div className="row mb-3">
                      <div className="col-3">
                        <label htmlFor="voucherSearch" className="form-label">
                          Nhập mã hoặc tên
=======
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
                          Loại phiếu giảm giá
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                      <div className="col-2">
                        <label htmlFor="startDate" className="form-label">
                          Ngày bắt đầu
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          value={filters.startDate}
                          onChange={handleStartDateChange}
                        />
                      </div>
                      <div className="col-2">
                        <label htmlFor="endDate" className="form-label">
                          Ngày kết thúc
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          value={filters.endDate}
                          onChange={handleEndDateChange}
                        />
                      </div>
                      <div className="col-2">
                        <label htmlFor="statusVoucher" className="form-label">
=======

                      <div className="col-md-6">
                        <label
                          htmlFor="statusVoucher"
                          className="form-label fw-bold"
                        >
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                      <div className="voucher-add my-4 p-2 col-3">
                        <Link to="/admins/manage-voucher-create">
                          <Button variant="info">
                            <IoIosAddCircleOutline /> Thêm phiếu giảm giá
                          </Button>
                        </Link>
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
=======
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
                    handleShowModal={handleShowModal}
                  />
                </div>
>>>>>>> Stashed changes
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVoucher && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết Voucher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tên: {selectedVoucher.name}</p>
            <p>Mã: {selectedVoucher.codeVoucher}</p>
            <p>Ngày bắt đầu: {selectedVoucher.startAt}</p>
            <p>Ngày kết thúc: {selectedVoucher.endAt}</p>
            <p>Người tạo: {selectedVoucher.createdBy}</p>
            <p>Người cập nhật: {selectedVoucher.updatedBy}</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ManageVoucher;
