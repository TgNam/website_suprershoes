import { useState, useEffect } from 'react';
import TableAccountEmployee from './TableAccountEmployee';
import Form from 'react-bootstrap/Form';
import './ManageAccountEmployee.scss'
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { fetchSearchPostsEmployee, fetchAllAccountEmployee } from '../../../../../redux/action/AccountAction';
import ModalCreateAccountEmployee from './ModalCreateAccountEmployee';
import AuthGuard from "../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../auth/RoleBasedGuard";


const ManageAccount = () => {
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000);
    useEffect(() => {
        if (debouncedSearchName || searchStatus !== "") {
            // Dispatch action để tìm kiếm theo tên và trạng thái
            dispatch(fetchSearchPostsEmployee(debouncedSearchName, searchStatus));
        } else {
            dispatch(fetchAllAccountEmployee());
        }
    }, [debouncedSearchName, searchStatus, dispatch]);
    return (
      <AuthGuard>
        <RoleBasedGuard accessibleRoles={["ADMIN"]}>
          <div className="manage-account-container">
            <div className="manage-account-hender">
              <h2 className="text-center">Quản lý tài khoản nhân viên</h2>
            </div>
            <div className="manage-filter-account">
              <h4>Bộ lọc tài khoản nhân viên:</h4>
              <hr></hr>
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3">
                    <Form.Label>Tìm kiếm nhân viên:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tìm kiếm số điện thoại và tên nhân viên..."
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
                <h4>Danh sách tài khoản nhân viên:</h4>
                <hr></hr>
                <div className="create-account mb-3 text-end">
                  <ModalCreateAccountEmployee />
                </div>
                <div className="table-account">
                  <TableAccountEmployee />
                </div>
              </div>
            </div>
          </div>
        </RoleBasedGuard>
      </AuthGuard>
    );
}
export default ManageAccount;