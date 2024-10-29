import React, { useEffect, useState, useMemo } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedCustomerIds(selectAll ? [] : customers.map((customer) => customer.id));
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const handleClickPage = (number) => {
    setCurrentPage(number);
  };

  const getPaginationItems = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="search-customer mb-3">
        <label htmlFor="listAccount" className="form-label">Danh sách khách hàng</label>
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm khách hàng theo tên"
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
          {currentItems.length > 0 ? (
            currentItems.map((customer, index) => (
              <tr key={`table-customer-${index}`}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedCustomerIds.includes(customer.id)}
                    onChange={() => handleRowSelectChange(customer.id)}
                  />
                </td>
                <td>{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
                <td>{customer.name}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">Không có khách hàng nào</td>
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
