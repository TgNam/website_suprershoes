import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { IoBagCheckOutline } from "react-icons/io5";
import { IoPricetagsSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { fetchBillStatisticsAction } from '../../../../redux/action/billAction';
import { fetchStatisticsProduct } from '../../../../Service/ApiBillDetailService';
import './ManageStatistical.scss';
import { format } from 'date-fns';

const ManageStatistical = () => {
    const [currentPage1, setCurrentPage1] = useState(1); // Pagination for first table
    const [currentPage2, setCurrentPage2] = useState(1); // Pagination for second table
    const itemsPerPage = 4;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('year');
    const indexOfLastItem1 = currentPage1 * itemsPerPage;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage;
    const indexOfLastItem2 = currentPage2 * itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;
    const dispatch = useDispatch();
    const rawBillStatistics = useSelector((state) => state.bill.billStatistics) || [];
    const totalPages1 = Math.ceil(rawBillStatistics.length / itemsPerPage);
    const [datas, setDatas] = useState([]);
    const totalPages2 = Math.ceil(datas.length / itemsPerPage);
    const sortedData = datas.sort((a, b) => b.quantity - a.quantity);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4B4B', '#40E0D0', '#FF4500', '#FFD700'];

    const fetchBillDetail = async () => {
        setLoading(true);
        try {
            const fetchedData = await fetchStatisticsProduct();
            console.log('Fetched Data:', fetchedData);
            setDatas(fetchedData);
        } catch (error) {
            console.error('Error fetching bill details:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
        setCurrentPage1(1);
    };

    const handlePageChange1 = (number) => {
        setCurrentPage1(number);
    };

    const handlePageChange2 = (number) => {
        setCurrentPage2(number);
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchBillStatisticsAction());
        };
        fetchBillDetail();
        fetchData();
    }, [dispatch]);

    const groupStatisticsByView = (statistics, view) => {
        const grouped = {};
        statistics.forEach((item) => {
            let key;
            const date = new Date(item.createdAt);
            switch (view) {
                case 'day':
                    key = format(date, 'dd/MM');
                    break;
                case 'month':
                    key = format(date, 'MM');
                    break;
                case 'year':
                default:
                    key = date.getFullYear().toString();
                    break;
            }
            if (!grouped[key]) {
                grouped[key] = {
                    date: key,
                    numberBill: 0,
                    price: 0,
                };
            }
            grouped[key].numberBill += item.numberBill || 0;
            grouped[key].price += item.price || 0;
        });

        return Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const billStatistics = groupStatisticsByView(rawBillStatistics, currentView);
    const currentItems1 = billStatistics.slice(indexOfFirstItem1, indexOfLastItem1);
    const currentItems2 = sortedData.slice(indexOfFirstItem2, indexOfLastItem2);

    const getPaginationItems = (totalPages, currentPage, setPage) => {
        let startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i).map(page => (
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setPage(page)}
            >
                {page}
            </Pagination.Item>
        ));
    };

    return (
        <div className="manage-cart-container">
            <div className="row m-3">
                <div className="col-6">
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoBagCheckOutline size={35} />
                        </div>
                        <div className="col">
                            {/* <p className="m-0 fs-4 ps-4">15</p> */}
                            <p className="m-0 fs-10">Khách Hàng</p>
                        </div>
                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoCart size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">
                                {datas && datas.length > 0 ? datas.reduce((total, item) => total + item.quantity, 0) : 0}
                            </p>
                            <p className="m-0 fs-10">Sản phẩm</p>
                        </div>

                    </div>
                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoDocumentTextSharp size={35} />
                        </div>
                        <div className="col">
                            {/* Replace <td> with appropriate element */}
                            <p className="m-0 fs-4 ps-4">
                                {/* Assuming item.price is your total revenue */}
                                {rawBillStatistics && rawBillStatistics.length > 0 ? rawBillStatistics.reduce((acc, item) => acc + item.numberBill, 0) : 0}
                            </p>
                            <p className="m-0 fs-10">Đơn hàng</p>
                        </div>
                    </div>

                    <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                        <div className="col ps-4">
                            <IoPricetagsSharp size={35} />
                        </div>
                        <div className="col">
                            <p className="m-0 fs-4 ps-4">
                                {/* Assuming item.price is your total revenue */}
                                {rawBillStatistics && rawBillStatistics.length > 0 ? rawBillStatistics.reduce((acc, item) => acc + item.price, 0) : 0}
                            </p>
                            <p className="m-0 fs-10">Tổng doanh thu</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 bg-white rounded p-3 shadow-sm">
                <PieChart width={400} height={400}>
    <Pie
        data={billStatistics.map(stat => ({ name: stat.date, value: stat.price }))}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={5}
        label
    >
        {billStatistics.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    </Pie>
    <Tooltip />
    <Legend />
</PieChart>
                </div>
            </div>
            <div className="row m-3">
                <div className="col-6">
                    {/* Render first table */}
                    <div className="bg-white rounded p-3 shadow-sm m-2">
                        <div><h5>Doanh thu theo sản phẩm</h5></div>
                        <div className='table-product mb-3'>
                            <Table striped bordered hover className='align-middle'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems2 && currentItems2.length > 0 ? (
                                        currentItems2.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>{index + 1 + (currentPage2 - 1) * itemsPerPage}</td>
                                                <td>
                                                    <img
                                                        src={item.imageUrl || "https://placehold.co/100x100"}
                                                        alt={item.nameProduct || "Product image"}
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </td>
                                                <td>{item.nameProduct}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.priceDiscount}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className='text-center'>Không tìm thấy danh sách</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                            {/* Pagination for the first table */}
                            <div className='d-flex justify-content-center'>
                                <Pagination>
                                    <Pagination.First onClick={() => handlePageChange2(1)} disabled={currentPage2 === 1} />
                                    <Pagination.Prev onClick={() => handlePageChange2(currentPage2 - 1)} disabled={currentPage2 === 1} />
                                    {getPaginationItems(totalPages2, currentPage2, handlePageChange2)}
                                    <Pagination.Next onClick={() => handlePageChange2(currentPage2 + 1)} disabled={currentPage2 === totalPages2} />
                                    <Pagination.Last onClick={() => handlePageChange2(totalPages2)} disabled={currentPage2 === totalPages2} />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-6">
                    {/* Render second table */}
                    <div className="bg-white rounded p-3 shadow-sm m-2">
<div className='row'>
                            <div className='col-3'>
                                <h5>Doanh thu theo</h5>
                            </div>
                            <div className='col-2'>
                                <Form.Select
                                    value={currentView}
                                    onChange={(e) => handleViewChange(e.target.value)}
                                    className="mb-3"
                                >
                                    <option value="day">Ngày</option>
                                    <option value="month">Tháng</option>
                                    <option value="year">Năm</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='table-product mb-3'>
                            <Table striped bordered hover className='align-middle'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>{currentView === 'day' ? 'Ngày' : currentView === 'month' ? 'Tháng' : 'Năm'}</th>
                                        <th>Số lượng đơn</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems1 && currentItems1.length > 0 ? (
                                        currentItems1.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + (currentPage1 - 1) * itemsPerPage}</td>
                                                <td>{item.date}</td>
                                                <td>{item.numberBill}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className='text-center'>Không tìm thấy danh sách</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            {/* Pagination for the second table */}
                            <div className='d-flex justify-content-center'>
                                <Pagination>
                                    <Pagination.First onClick={() => handlePageChange1(1)} disabled={currentPage1 === 1} />
                                    <Pagination.Prev onClick={() => handlePageChange1(currentPage1 - 1)} disabled={currentPage1 === 1} />
                                    {getPaginationItems(totalPages1, currentPage1, handlePageChange1)}
                                    <Pagination.Next onClick={() => handlePageChange1(currentPage1 + 1)} disabled={currentPage1 === totalPages1} />
                                    <Pagination.Last onClick={() => handlePageChange1(totalPages1)} disabled={currentPage1 === totalPages1} />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
export default ManageStatistical;