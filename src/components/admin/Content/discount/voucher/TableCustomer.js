import React, { useEffect, useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAccountCustomer } from "../../../../../redux/action/AccountAction";

const TableCustomer = ({ selectedCustomerIds, setSelectedCustomerIds, showSelectedOnly, isUpdateMode }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.account.listAccountCusomer);

  useEffect(() => {
    dispatch(fetchAllAccountCustomer());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 5;

  const filteredCustomers = useMemo(() => {
    let filteredList = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (showSelectedOnly) {
      filteredList = filteredList.filter((customer) => selectedCustomerIds.includes(customer.id));
    }
    return filteredList;
  }, [customers, searchTerm, selectedCustomerIds, showSelectedOnly]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const handleClickPage = (number) => {
    setCurrentPage(number);
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

  return (
      <>
        {!isUpdateMode && (
            <div className="search-customer mb-3">
              <label htmlFor="listAccount" className="form-label">Danh sách khách hàng</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm khách hàng theo tên"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        )}

        <Table bordered hover>
          <thead>
          <tr>
            {!isUpdateMode && (
                <th className="text-center">
                  <Form.Check
                      type="checkbox"
                      checked={filteredCustomers.length > 0 && selectedCustomerIds.length === filteredCustomers.length}
                      onChange={() => {
                        if (selectedCustomerIds.length === filteredCustomers.length) {
                          setSelectedCustomerIds([]);
                        } else {
                          setSelectedCustomerIds(filteredCustomers.map((customer) => customer.id));
                        }
                      }}
                  />
                </th>
            )}
            <th className="text-center">#</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
          </tr>
          </thead>
          <tbody>
          {currentItems.length > 0 ? (
              currentItems.map((customer, index) => (
                  <tr key={`table-customer-${index}`}>
                    {!isUpdateMode && (
                        <td className="text-center">
                          <Form.Check
                              type="checkbox"
                              checked={selectedCustomerIds.includes(customer.id)}
                              onChange={() => handleRowSelectChange(customer.id)}
                          />
                        </td>
                    )}
                    <td className="text-center">{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={isUpdateMode ? 3 : 4} className="text-center">Không có khách hàng nào</td>
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
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
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
