import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAccountCustomer } from "../../../../../redux/action/AccountAction";

const TableCustomer = ({ selectedCustomerIds, setSelectedCustomerIds }) => {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.account.listAccountCusomer);

  useEffect(() => {
    dispatch(fetchAllAccountCustomer()); 
  }, [dispatch]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomerIds(allCustomerIds);
    } else {
      setSelectedCustomerIds([]);
    }
  };

  const handleRowSelectChange = (id) => {
    if (selectedCustomerIds.includes(id)) {
      setSelectedCustomerIds(
        selectedCustomerIds.filter((customerId) => customerId !== id)
      );
    } else {
      setSelectedCustomerIds([...selectedCustomerIds, id]);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lọc danh sách khách hàng dựa trên từ khóa tìm kiếm
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handleClickPage = (number) => {
    setCurrentPage(number);
  };

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

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      <div className="search-customer mb-3">
        <label htmlFor="listAccount" className="form-label">
          Danh sách khách hàng
        </label>
        <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm khách hàng theo tên hoặc số điện thoại..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
      </div>

      <Table bordered hover>
        <thead>
        <tr>
          <th>
            <Form.Check
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>#</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((customer, index) => (
              <tr key={`table-customer-${index}`}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedCustomerIds.includes(customer.id)}
                    onChange={() => handleRowSelectChange(customer.id)}
                  />
                </td>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{customer.name}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Không có dữ liệu</td>
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

export default TableCustomer;
