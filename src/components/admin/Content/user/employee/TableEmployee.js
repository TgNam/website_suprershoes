import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModelViewEmployee from './ModelViewEmployee';
import { deleteEmployee } from '../../../../../Service/ApiEmployeeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateEmployee from './ModalUpdateEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllEmployee } from '../../../../../redux/action/employeeAction';

const TableEmployee = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.listEmployee);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch employee data when the component mounts
        dispatch(fetchAllEmployee());
    }, [dispatch]);

    const handleDeleteEmployee = async (idEmployee) => {
        setLoading(true);
        try {
            const response = await deleteEmployee(idEmployee);
            if (response && response.status === 200) {
                toast.success("Employee deleted successfully");
                dispatch(fetchAllEmployee()); // Update the employee list after deletion
            } else {
                toast.error('Error deleting employee');
            }
        } catch (error) {
            toast.error('Network Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Employee Name</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.length > 0 ? (
                        employees.map((item, index) => (
                            <tr key={`table-employee-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.number}</td>
                                <td>{item.gmail}</td>
                                <td>
                                    <ModelViewEmployee idEmployee={item.id} />
                                    <ModalUpdateEmployee idEmployee={item.id} />
                                    <Button
                                        variant="danger"
                                        className="me-5"
                                        onClick={() => handleDeleteEmployee(item.id)}
                                        disabled={loading} // Disable the button while loading
                                    >
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No data found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default TableEmployee;
