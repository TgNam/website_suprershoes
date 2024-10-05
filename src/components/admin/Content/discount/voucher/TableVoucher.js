import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
<<<<<<< Updated upstream
import { FaEdit, FaRegCalendarTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
=======
import {
  FaEdit,
  FaRegCalendarTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaDownload,
  FaTrash,
  FaEye,
} from "react-icons/fa";
>>>>>>> Stashed changes
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  fetchAllVoucherAction,
  deleteVoucherAction,
  updateVoucherAction,
} from "../../../../../redux/action/voucherAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const TableVoucher = ({ filters, handleShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listVoucher, loading, error, totalPages } = useSelector(
    (state) => state.voucher
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchVouchers = async () => {
      await dispatch(fetchAllVoucherAction(filters, currentPage, itemsPerPage));
    };
    fetchVouchers();
  }, [dispatch, filters, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(0);
  };

  const handleDeleteVoucher = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phiếu giảm giá này?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteVoucherAction(id));
      toast.success("Xóa thành công");
      setCurrentPage(0);
      dispatch(fetchAllVoucherAction(filters, 0, 5));
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleUpdateVoucherClick = (voucherId) => {
    navigate(`/admins/manage-voucher-update/${voucherId}`);
  };

<<<<<<< Updated upstream
=======
  const handleJumpToPage = (e) => {
    let page = parseInt(e.target.value, 10) - 1;
    if (page >= totalPages) {
      page = totalPages - 1;
    } else if (page < 0) {
      page = 0;
    }
    setCurrentPage(page);
    setJumpToPage(page + 1);
  };

>>>>>>> Stashed changes
  const getStatusBadge = (status) => {
    switch (status) {
      case "ONGOING":
        return <span className="badge bg-primary">Đang diễn ra</span>;
      case "UPCOMING":
        return <span className="badge bg-info">Sắp diễn ra</span>;
      case "FINISHED":
        return <span className="badge bg-danger">Đã kết thúc</span>;
      case "ENDING_SOON":
        return <span className="badge bg-warning text-dark">Kết thúc sớm</span>;
      default:
        return <span className="badge bg-secondary">Không tồn tại</span>;
    }
  };

  const handleExportReport = () => {
    if (!listVoucher || listVoucher.length === 0) {
      toast.warn("Không có dữ liệu để xuất báo cáo.");
      return;
    }

    toast.info("Đang xuất báo cáo...");
  };

  const formatNumber = (number) => {
    return number != null ? number.toLocaleString("vi-VN") : "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date)
      ? ""
      : date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const handleToggleEndedEarly = async (voucher) => {
    const confirmToggle = window.confirm(
      `Bạn có chắc chắn muốn ${
        voucher.status === "ENDED_EARLY" ? "bật lại" : "kết thúc sớm"
      } phiếu giảm giá này?`
    );
    if (!confirmToggle) return;

    try {
      if (voucher.status === "ENDED_EARLY") {
        await dispatch(
          updateVoucherAction(voucher.id, { ...voucher, status: "ONGOING" })
        );
      } else {
        await dispatch(
          updateVoucherAction(voucher.id, { ...voucher, status: "ENDED_EARLY" })
        );
      }
      toast.success("Cập nhật trạng thái thành công");
      dispatch(fetchAllVoucherAction(filters, currentPage, itemsPerPage));
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Link to="/admins/manage-voucher-create" className="me-2">
          <Button variant="info">
            <FaPlus style={{ marginRight: "5px" }} /> Thêm phiếu giảm giá
          </Button>
        </Link>

        <Button
          variant="success"
          onClick={handleExportReport}
          disabled={!listVoucher || listVoucher.length === 0}
        >
          <FaDownload style={{ marginRight: "5px" }} /> Xuất báo cáo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã</th>
            <th>Tên phiếu giảm giá</th>
            <th>Đơn tối thiểu</th>
            <th>Giá trị</th>
            <th>Số lượng</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listVoucher && listVoucher.length > 0 ? (
            listVoucher.map((voucher, index) => (
              <tr key={voucher.id}>
<<<<<<< Updated upstream
                <td>{index + 1 + currentPage * 10}</td>
                <td>{voucher.codeVoucher}</td>
                <td>{voucher.name}</td>
                <td>{voucher.minBillValue + " đ"}</td>
                <td>{voucher.value + "%"}</td>
                <td>{voucher.quantity}</td>
=======
                <td>{index + 1 + currentPage * itemsPerPage}</td>
                <td>{voucher.codeVoucher || ""}</td>
                <td>{voucher.name || ""}</td>
                <td>{formatNumber(voucher.minBillValue)} đ</td>
>>>>>>> Stashed changes
                <td>
                  {voucher.type === 0
                    ? `${voucher.value}%`
                    : `${formatNumber(voucher.value)} VND`}
                </td>
                <td>{voucher.quantity != null ? voucher.quantity : ""}</td>
                <td>{formatDate(voucher.startAt)}</td>
                <td>{formatDate(voucher.endAt)}</td>
                <td>{getStatusBadge(voucher.status)}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleShowModal(voucher)}
                  >
                    <FaEye
                      style={{ color: "blue", fontSize: "1.5em" }}
                      title="Xem chi tiết phiếu giảm giá"
                    />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleUpdateVoucherClick(voucher.id)}
                  >
<<<<<<< Updated upstream
                    <FaEdit style={{ color: "orange", fontSize: "1.5em" }} />
                  </Button>{" "}
=======
                    <FaEdit
                      style={{ color: "orange", fontSize: "1.5em" }}
                      title="Cập nhật phiếu giảm giá"
                    />
                  </Button>
>>>>>>> Stashed changes
                  <Button
                    variant="link"
                    onClick={() => handleDeleteVoucher(voucher.id)}
                  >
                    <FaTrash
                      style={{ color: "red", fontSize: "1.5em" }}
                      title="Xóa phiếu giảm giá"
                    />
                  </Button>
                  <Form.Check
                    type="switch"
                    id={`toggle-ended-early-${voucher.id}`}
                    checked={voucher.status === "ENDED_EARLY"}
                    onChange={() => handleToggleEndedEarly(voucher)}
                    title="Kết thúc sớm / Bật lại voucher"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không tìm thấy phiếu giảm giá</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-end align-items-center">
<<<<<<< Updated upstream
        <Button
          variant="link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <FaChevronLeft />
        </Button>

        <span className="border p-2">{currentPage + 1}</span>
=======
        <div className="d-flex align-items-center me-3">
          <span className="me-2">Tổng {totalItems} bản ghi</span>
          <DropdownButton
            id="dropdown-basic-button"
            title={`${itemsPerPage} / trang`}
            onSelect={(e) => handleItemsPerPageChange(parseInt(e, 10))}
          >
            <Dropdown.Item eventKey="5">5 / trang</Dropdown.Item>
            <Dropdown.Item eventKey="10">10 / trang</Dropdown.Item>
            <Dropdown.Item eventKey="20">20 / trang</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Page Navigation */}
        <div className="d-flex align-items-center me-3">
          <Button
            variant="link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <FaChevronLeft />
          </Button>
>>>>>>> Stashed changes

        <Button
          variant="link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <FaChevronRight />
        </Button>

<<<<<<< Updated upstream
        <DropdownButton
          id="dropdown-basic-button"
          title={`${itemsPerPage} / page`}
          onSelect={handleItemsPerPageChange}
          className="ml-3"
        >
          <Dropdown.Item eventKey="5">5 / page</Dropdown.Item>
          <Dropdown.Item eventKey="10">10 / page</Dropdown.Item>
          <Dropdown.Item eventKey="20">20 / page</Dropdown.Item>
        </DropdownButton>
=======
          <Button
            variant="link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <FaChevronRight />
          </Button>
        </div>

        {/* Jump to Page */}
        <div className="d-flex align-items-center">
          <span className="me-2">Nhảy tới</span>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJumpToPage(e);
              }
            }}
            min="1"
            max={totalPages}
          />
        </div>
>>>>>>> Stashed changes
      </div>
    </>
  );
};

export default TableVoucher;
