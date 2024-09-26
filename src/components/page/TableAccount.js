import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllAccount } from '../../redux/action/AccountAction'
const TableAccount = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.listAccount);
    useEffect(() => {
        dispatch(fetchAllAccount());
    }, [dispatch]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>AccountName</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
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

export default TableAccount;
