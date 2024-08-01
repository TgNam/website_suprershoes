import React,{useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUser } from '../../redux/action/userAction'
const TableUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.listUser);
    useEffect(() => {
        dispatch(fetchAllUser());
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>UserName</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
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
