import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModelViewAccount from './ModelViewAccount';
import { deleteAccount } from '../../../../Service/ApiAccountService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateAccount from './ModalUpdateAccount'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllAccount } from '../../../../redux/action/AccountAction'
const TableAccount = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.listAccount);
    useEffect(() => {
        // Fetch Account data from context when component mounts
        dispatch(fetchAllAccount());
    }, [dispatch]);

    const handleDeleteAccount = async (idAccount) => {
        try {
            const response = await deleteAccount(idAccount);
            console.log(response)
            if (response && response.status === 200) {
                toast.success("Account deleted successfully");
                dispatch(fetchAllAccount()); // Cập nhật lại danh sách người dùng sau khi xóa
            } else {
                toast.error('Error deleting Account');
            }
        } catch (error) {
            toast.error('Network Error');
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>AccountName</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.length > 0 ? (
                        accounts.map((item, index) => (
                            <tr key={`table-Account-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>
                                    <ModelViewAccount idAccount={item.id} />
                                    <ModalUpdateAccount idAccount={item.id} />
                                    <Button variant="danger" className='me-5' onClick={() => handleDeleteAccount(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default TableAccount;
