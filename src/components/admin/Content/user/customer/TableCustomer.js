import React,{useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import ModelViewUser from './ModelViewCustomer';
import { deleteUser } from '../../../../../Service/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateUser from './ModalUpdateCustomer'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUser } from '../../../../../redux/action/userAction'
const TableUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.listUser);
    useEffect(() => {
        // Fetch user data from context when component mounts
        dispatch(fetchAllUser());
    }, []);

    const handleDeleteUser = async (idUser) => {
        try {
            const response = await deleteUser(idUser);
            console.log(response)
            if (response && response.status === 200) {
                toast.success("User deleted successfully");
                dispatch(fetchAllUser()); // Cập nhật lại danh sách người dùng sau khi xóa
            } else {
                toast.error('Error deleting user');
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
                        <th>id</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <ModelViewUser idUser={item.id} />
                                    <ModalUpdateUser idUser={item.id} />
                                    <Button variant="danger" className='me-5' onClick={() => handleDeleteUser(item.id)}>Delete</Button>
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

export default TableUser;
