import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUser } from '../../redux/action/userAction'
const TableUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.listUser);
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>UserName</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default TableUser;
