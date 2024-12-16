import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ModelAccountDetail from './ModelAccountDetail';
import ModalUpdateAccountEmployee from './ModalUpdateAccountEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusAccountById, fetchAllAccountEmployee } from '../../../../../redux/action/AccountAction';
const NotFoundData = '/NotFoundData.png';

const TableAccount = ({ filteredAccounts }) => {
  const dispatch = useDispatch();

  const handleUpdateStatusAccountEmployee = async (idAccountCustomer, isChecked) => {
    await dispatch(updateStatusAccountById(idAccountCustomer, isChecked))
    await dispatch(fetchAllAccountEmployee())
  };
  // Khai báo state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Đặt số lượng mục hiển thị trên mỗi trang
  const currentAccounts = [...filteredAccounts];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentAccounts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(currentAccounts.length / itemsPerPage);

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


  return (
    <>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên nhân viên</th>
            <th>Số điện thoại</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={`table-Account-${index}`}>
                <td>{index + 1 + (currentPage - 1) * 5}</td>
                <td>{item.name}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  {item.birthday
                    ? new Date(item.birthday)
                      .toISOString()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")
                    : "N/A"}
                </td>
                <td>{item.gender === 1 ? "Nam" : "Nữ"}</td>
                <td>
                  <div className="form-check form-switch ms-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheckChecked-${item.id}`}
                      checked={item.status === "ACTIVE"}
                      onChange={(e) =>
                        handleUpdateStatusAccountEmployee(
                          item.id,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </td>
                <td>
                  <ModelAccountDetail idEmployee={item.id} />
                  <ModalUpdateAccountEmployee idEmployee={item.id} />
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

export default TableAccount;
