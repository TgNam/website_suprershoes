import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import {
  FaEdit,
  FaRegCalendarTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVoucherAction,
  deleteVoucherAction,
} from "../../../../../redux/action/voucherAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TableVoucher = ({ filters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listVoucher, totalItems, totalPages } = useSelector(
    (state) => state.voucher
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllVoucherAction(filters, currentPage, itemsPerPage));
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

  const handleDeleteVoucher = async (id) => {
    try {
      await dispatch(deleteVoucherAction(id));
      toast.success("Xóa thành công");
      setCurrentPage(0);
      dispatch(fetchAllVoucherAction(filters, 0, itemsPerPage));
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleUpdateVoucherClick = (voucherId) => {
    navigate(`/admins/manage-voucher-update/${voucherId}`);
  };

  const handleJumpToPage = (e) => {
    const page = parseInt(e.target.value, 10) - 1;
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
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

  return (
    <>
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
                <td>{index + 1 + currentPage * itemsPerPage}</td>
                <td>{voucher.codeVoucher}</td>
                <td>{voucher.name}</td>
                <td>{voucher.minBillValue + " đ"}</td>
                <td>{voucher.value + "%"}</td>
                <td>{voucher.quantity}</td>
                <td>
                  {new Date(voucher.startAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {new Date(voucher.endAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{getStatusBadge(voucher.status)}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleUpdateVoucherClick(voucher.id)}
                  >
                    <FaEdit style={{ color: "orange", fontSize: "1.5em" }} />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDeleteVoucher(voucher.id)}
                  >
                    <FaRegCalendarTimes
                      style={{ color: "red", fontSize: "1.5em" }}
                    />
                  </Button>
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
        {/* Tổng số bản ghi và số bản ghi mỗi trang */}
        <div className="d-flex align-items-center">
          <span className="me-2">Tổng {totalItems} bản ghi</span>
          <DropdownButton
            id="dropdown-basic-button"
            title={`${itemsPerPage} / trang`}
            onSelect={(e) => handleItemsPerPageChange(parseInt(e, 10))}
            className="me-3"
          >
            <Dropdown.Item eventKey="5">5 / trang</Dropdown.Item>
            <Dropdown.Item eventKey="10">10 / trang</Dropdown.Item>
            <Dropdown.Item eventKey="20">20 / trang</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Điều hướng trang */}
        <div className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <FaChevronLeft />
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

        {/* Nhảy tới trang */}
        <div className="d-flex align-items-center ms-3">
          <span className="me-2">Nhảy tới</span>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = parseInt(jumpToPage, 10) - 1;
                if (page >= 0 && page < totalPages) {
                  handlePageChange(page); 
                }
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
