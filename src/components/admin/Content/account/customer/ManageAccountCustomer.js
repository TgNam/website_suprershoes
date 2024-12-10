import { useState, useEffect } from 'react';
import TableAccountCustomer from './TableAccountCustomer';
import Form from 'react-bootstrap/Form';
import './ManageAccountCustomer.scss'
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { fetchSearchPostsCustomer, fetchAllAccountCustomer } from '../../../../../redux/action/AccountAction';
import ModalCreateAccountCustomer from './ModalCreateAccountCustomer';
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
            dispatch(fetchSearchPostsCustomer(debouncedSearchName, searchStatus));
        } else {
            dispatch(fetchAllAccountCustomer());
        }
    }, [debouncedSearchName, searchStatus, dispatch]);
    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN", "EMPLOYEE"]}>
                <div className="manage-account-container">
                    <div className='manage-account-hender'>
                        <h2 className='text-center'>Quản lý tài khoản</h2>
                    </div>
                    <div className='manage-filter-account'>
                        <h4>Bộ lọc tài khoản:</h4>
                        <hr></hr>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tìm Kiếm:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tìm kiếm số điện thoại và tên khách hàng..."
                                        onChange={(event) => setSearchName(event.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Label>Trạng thái:</Form.Label>
                                <Form.Select
                                    value={searchStatus}
                                    onChange={(event) => setSearchStatus(event.target.value)}
                                >
                                    <option value="">Tất cả</option>
                                    <option value="ACTIVE">Hoạt động</option>
                                    <option value="INACTIVE">Dừng hoạt động</option>
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-body">
                        <div className="Accounts-content">
                            <h4>Danh sách tài khoản:</h4>
                            <hr></hr>
                            <div className='create-account mb-3 text-end'>
                                <ModalCreateAccountCustomer />
                            </div>
                            <div className='table-account'>
                                <TableAccountCustomer />
                            </div>
                        </div>
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard>
    )
}
export default ManageAccount;