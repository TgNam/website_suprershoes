import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaTrash,
  FaRegEye,
} from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVoucherAction,
  deleteVoucherAction,
  updateVoucherAction,
  endVoucherEarlyAction,
  reactivateVoucherAction,
  checkExpiredVouchersAction,
} from "../../../../../redux/action/voucherAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {FaPenToSquare} from "react-icons/fa6";

const TableVoucher = ({ filters, handleShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listVoucher, totalItems, totalPages } = useSelector(
    (state) => state.voucher
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [jumpToPage, setJumpToPage] = useState(1);

  useEffect(() => {
    const fetchVouchers = async () => {
      await dispatch(fetchAllVoucherAction(filters, currentPage, itemsPerPage));
    };
    fetchVouchers();

  }, [dispatch, filters, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      setJumpToPage(pageNumber + 1);
    }
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(0);
    setJumpToPage(1);
  };

  const handleDeleteVoucher = async (voucher) => {
    if (voucher.status === "EXPIRED") {
      toast.error("Không thể kết thúc phiếu giảm giá đã hết hạn.");
      return;
    }

    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn kết thúc phiếu giảm giá này?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteVoucherAction(voucher.id));
      toast.success("Kết thúc voucher thành công");
      setCurrentPage(0);
      dispatch(fetchAllVoucherAction(filters, 0, itemsPerPage));
    } catch (error) {
      toast.error(error.message || "Xóa thất bại");
    }
  };

  const handleUpdateVoucherClick = (voucherId) => {
    navigate(`/admins/manage-voucher-update/${voucherId}`);
  };

  const handleJumpToPage = (e) => {
    let page = parseInt(e.target.value, 10) - 1;
    if (page >= totalPages) {
      page = totalPages - 1;
    } else if (page < 0) {
      page = 0;
    }

    setCurrentPage(page);
    setJumpToPage(page + 1);
    dispatch(fetchAllVoucherAction(filters, page, itemsPerPage));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ONGOING":
        return <span className="badge bg-primary">Đang diễn ra</span>;
      case "UPCOMING":
        return <span className="badge bg-info">Sắp diễn ra</span>;
      case "EXPIRED":
        return <span className="badge bg-danger">Đã kết thúc</span>;
      case "ENDED_EARLY":
        return <span className="badge bg-warning text-dark">Kết thúc sớm</span>;
      default:
        return <span className="badge bg-secondary">Không tồn tại</span>;
    }
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
    const currentDate = new Date();

    if (voucher.status === "EXPIRED") {
      toast.error("Không thể thay đổi trạng thái của voucher đã hết hạn.");
      return;
    }

    const confirmToggle = window.confirm(
      `Bạn có chắc chắn muốn ${
        voucher.status === "ENDED_EARLY" ? "bật lại" : "kết thúc sớm"
      } phiếu giảm giá này?`
    );

    if (!confirmToggle) return;

    try {
      if (voucher.status === "ENDED_EARLY") {
        await dispatch(reactivateVoucherAction(voucher.id));
      } else {
        await dispatch(endVoucherEarlyAction(voucher.id));
      }

      toast.success("Cập nhật trạng thái thành công");
      setCurrentPage(0);
      dispatch(fetchAllVoucherAction(filters, 0, itemsPerPage));
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
      </div>

      <Table striped bordered hover>
        <thead className="text-center">
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
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{voucher.codeVoucher || ""}</td>
                  <td>{voucher.name || ""}</td>
                  <td>{formatNumber(voucher.minBillValue)} VND</td>
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
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                      <Button variant="warning" onClick={() => handleShowModal(voucher)}>
                        <FaRegEye
                            title="Xem chi tiết phiếu giảm giá"
                        />
                      </Button>
                      <Button variant="success" onClick={() => handleUpdateVoucherClick(voucher.id)}>
                        <FaPenToSquare title="Cập nhật phiếu giảm giá" />
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteVoucher(voucher)}>
                        <FaTrash title="Xóa phiếu giảm giá" />
                      </Button>
                      <Form.Check
                          type="switch"
                          id={`toggle-ended-early-${voucher.id}`}
                          checked={voucher.status === "ONGOING" || voucher.status === "UPCOMING"}
                          onChange={() => handleToggleEndedEarly(voucher)}
                          title="Kết thúc sớm / Bật lại voucher"
                          disabled={voucher.status === "EXPIRED"}
                      />

                    </div>
                  </td>
                </tr>
            ))
          ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Không tìm thấy phiếu giảm giá
                </td>
              </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end align-items-center">
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

        <div className="d-flex align-items-center me-3">
          <Button
              variant="link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
          >
            <FaChevronLeft/>
          </Button>

          <Pagination className="m-0">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index === currentPage}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          <Button
            variant="link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <FaChevronRight />
          </Button>
        </div>

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
      </div>
    </>
  );
};

export default TableVoucher;
