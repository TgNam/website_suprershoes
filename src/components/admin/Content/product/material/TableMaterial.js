import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { deleteUser } from '../../../../../Service/ApiService';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUser } from '../../../../../redux/action/userAction'
import Pagination from 'react-bootstrap/Pagination';
const TableSize = () => {
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
                        <th>UserName</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>
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
            <div className='d-flex justify-content-evenly'>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </>
    );
};

export default TableSize;
