import { useState, useEffect } from "react";
import TableAccountCustomer from "./TableAccountCustomer";
import Form from "react-bootstrap/Form";
import "./ManageAccountCustomer.scss";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllAccountCustomer,
} from "../../../../../redux/action/AccountAction";
import ModalCreateAccountCustomer from "./ModalCreateAccountCustomer";
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";
const ManageAccount = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const accounts = useSelector((state) => state.account.listAccountCusomer);
  useEffect(() => {
    dispatch(fetchAllAccountCustomer());
  }, [dispatch]);

  const filteredAccounts = accounts.filter((account) => {
    const searchLower = searchName?.trim().toLowerCase();
    const statusFilter = searchStatus.toLowerCase();

    // Tìm kiếm theo tên hoặc số điện thoại
    const nameAccount = account.name?.trim().toLowerCase().includes(searchLower);
    const phoneNumberAccount = account.phoneNumber?.trim().toLowerCase().includes(searchLower);

    // Lọc theo trạng thái nếu `searchStatus` được cung cấp
    const statusMatch = searchStatus === "" || account.status?.toLowerCase() === statusFilter;

    return (nameAccount || phoneNumberAccount) && statusMatch;
  });

  return (
    <AuthGuard>
      <RoleBasedGuard accessibleRoles={["ADMIN", "EMPLOYEE"]}>
        <div className="manage-account-container">
          <div className="manage-account-hender">
            <h2 className="text-center">Quản lý tài khoản khách hàng</h2>
          </div>
          <div className="manage-filter-account">
            <h4>Bộ lọc tài khoản khách hàng:</h4>
            <hr></hr>
            <div className="row">
              <div className="col">
                <Form.Group className="mb-3">
                  <Form.Label>Tìm kiếm khách hàng:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm số điện thoại và tên khách hàng..."
                    onChange={(event) => setSearchName(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Label>Trạng thái:</Form.Label>
                <Form.Select
                  value={searchStatus}
                  onChange={(event) => setSearchStatus(event.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="ACTIVE">Kích hoạt</option>
                  <option value="INACTIVE">Khóa</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="accordion-body">
            <div className="Accounts-content">
              <h4>Danh sách tài khoản khách hàng:</h4>
              <hr></hr>
              <div className="create-account mb-3 text-end">
                <ModalCreateAccountCustomer />
              </div>
              <div className="table-account">
                <TableAccountCustomer filteredAccounts={filteredAccounts} />
              </div>
            </div>
          </div>
        </div>
      </RoleBasedGuard>
    </AuthGuard>
  );
};
export default ManageAccount;
