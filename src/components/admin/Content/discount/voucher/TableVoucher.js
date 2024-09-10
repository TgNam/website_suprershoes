import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { FaEdit, FaRegCalendarTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  fetchAllVoucherAction,
  deleteVoucherAction,
} from "../../../../../redux/action/voucherAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TableVoucher = ({ filters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listVoucher, loading, error, totalPages } = useSelector(
    (state) => state.voucher
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllVoucherAction(filters, currentPage, itemsPerPage));
  }, [dispatch, filters, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(0);
  };

  const handleDeleteVoucher = async (id) => {
    try {
      await dispatch(deleteVoucherAction(id));
      toast.success("Xóa thành công");
      setCurrentPage(0);
      dispatch(fetchAllVoucherAction(filters, 0, 10));
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleUpdateVoucherClick = (voucherId) => {
    navigate(`/admins/manage-voucher-update/${voucherId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ONGOING":
        return <span className="badge bg-primary">Ongoing</span>;
      case "UPCOMING":
        return <span className="badge bg-info">Upcoming</span>;
      case "FINISHED":
        return <span className="badge bg-danger">Finished</span>;
      case "ENDING_SOON":
        return <span className="badge bg-warning text-dark">Ending Soon</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
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
            <th>Giá trị (%)</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listVoucher && listVoucher.length > 0 ? (
            listVoucher.map((voucher, index) => (
              <tr key={voucher.id}>
                <td>{index + 1 + currentPage * 10}</td>
                <td>{voucher.codeVoucher}</td>
                <td>{voucher.name}</td>
                <td>{voucher.value}</td>
                <td>
                  {new Date(voucher.startAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>
                  {new Date(voucher.endAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>{getStatusBadge(voucher.status)}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleUpdateVoucherClick(voucher.id)}
                  >
                    <FaEdit style={{ color: "orange", fontSize: "1.5em" }} />
                  </Button>{" "}
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
              <td colSpan="6">Không tìm thấy phiếu giảm giá</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <div className="d-flex justify-content-end align-items-center">
        {/* Left arrow */}
        <Button
          variant="link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <FaChevronLeft />
        </Button>

        {/* Current page */}
        <span className="border p-2">{currentPage + 1}</span>

        {/* Right arrow */}
        <Button
          variant="link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <FaChevronRight />
        </Button>

        {/* Items per page dropdown */}
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
      </div>
    </>
  );
};

export default TableVoucher;
