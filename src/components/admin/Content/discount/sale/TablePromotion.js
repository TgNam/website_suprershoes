import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPromotion, updateStatusPromotionById } from '../../../../../redux/action/promotionAction';
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const NotFoundData = '/NotFoundData.png';
const TablePromotion = ({ filteredAccounts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const currentPromotion = [...filteredAccounts];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPromotion.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(currentPromotion.length / itemsPerPage);

  const handleClickPage = (number) => {
    setCurrentPage(number);
  };

  // Tạo danh sách các nút phân trang
  const getPaginationItems = () => {
    let startPage, endPage;

    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
  };
  const showStatus = (status) => {
    switch (status) {
      case 'UPCOMING':
        return <td><span class="badge text-bg-info">Sắp diễn ra</span></td>;
      case 'ONGOING':
        return <td><span class="badge text-bg-primary">Đang diễn ra</span></td>;
      case 'FINISHED':
        return <td><span class="badge text-bg-danger">Kết thúc</span></td>;
      case 'ENDING_SOON':
        return <td><span class="badge text-bg-warning">Kết thúc sớm</span></td>;
      default:
        return '';
    }
  }
  const handleUpdateClick = (item) => {
    if (item.status === 'ENDING_SOON') {
      toast.warn('Vui lòng bật trạng thái kết thúc sớm lên trước khi cập nhật!');
    } else {
      navigate(`/admins/manage-promotion-update?idPromotion=${item.id}`);
    }
  };
  const handleUpdateStatusPromotion = async (idPromotion, isChecked) => {
    dispatch(updateStatusPromotionById(idPromotion, isChecked))
  };
  return (
    <>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khuyến mãi</th>
            <th>Tên khuyến mãi</th>
            <th>Giá trị</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 + (currentPage - 1) * 5}</td>
                <td>{item.codePromotion}</td>
                <td>{item.name}</td>
                <td>{`${item.value}%`}</td>
                <td>
                  {item.startAt
                    ? new Date(item.startAt).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) +
                    " " +
                    new Date(item.startAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "N/A"}
                </td>
                <td>
                  {item.endAt
                    ? new Date(item.endAt).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) +
                    " " +
                    new Date(item.endAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : "N/A"}
                </td>
                {showStatus(item.status)}
                <td>
                  <div className="d-flex align-items-center justify-content-between mx-2">
                    <Link
                      to={`/admins/manage-promotion-detail?idPromotion=${item.id}`}
                    >
                      <Button variant="warning">
                        <FaRegEye />
                      </Button>
                    </Link>
                    <Button
                      variant="success"
                      onClick={() => handleUpdateClick(item)}
                    >
                      <FaPenToSquare />
                    </Button>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheckChecked-${item.id}`}
                        checked={
                          item.status === "ONGOING" ||
                          item.status === "UPCOMING"
                        }
                        onChange={(e) =>
                          handleUpdateStatusPromotion(
                            item.id,
                            e.target.checked
                          )
                        } // Truyền trạng thái checked
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td colSpan={8} className="preview-image justify-content-center text-center p-3">
                <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                <p className='p-3'>Không có dữ liệu</p>
            </td>
        </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {getPaginationItems().map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handleClickPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
};

export default TablePromotion;
