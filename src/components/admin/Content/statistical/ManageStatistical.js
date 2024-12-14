import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { IoBagCheckOutline } from "react-icons/io5";
import { IoPricetagsSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { fetchBillStatisticsAction } from '../../../../redux/action/billAction';
import { fetchAllAccountCustomer } from '../../../../redux/action/AccountAction';
import { fetchStatisticsProduct } from '../../../../Service/ApiBillDetailService';
import ListImageProduct from '../../../../image/ImageProduct'
import './ManageStatistical.scss';
import { format } from 'date-fns';
import AuthGuard from "../../../auth/AuthGuard";
import RoleBasedGuard from "../../../auth/RoleBasedGuard";
const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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
    const accounts = useSelector((state) => state.account.listAccountCusomer) || [];

    const formatCurrency = (value) => {
        if (!value) return 0;
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value) || 0;
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [startDate, setStartDate] = useState(formatDateToYYYYMMDD(new Date())); // Từ ngày mặc định là hôm nay
    const [endDate, setEndDate] = useState(''); // Đến ngày để trống mặc định
    const [filteredData, setFilteredData] = useState([]); // Lưu trữ dữ liệu đã lọc
    const handleDateRangeSearch = () => {
        if (!startDate && !endDate) {
            alert("Vui lòng nhập ít nhất một trong hai ngày!");
            return;
        }

        const filteredStatistics = completedBillStatistics.filter((item) => {
            const itemDate = new Date(item.createdAt);

            // Lọc dữ liệu dựa trên Từ ngày hoặc Đến ngày
            if (startDate && !endDate) {
                return itemDate >= new Date(startDate); // Chỉ lọc theo startDate
            } else if (!startDate && endDate) {
                return itemDate <= new Date(endDate); // Chỉ lọc theo endDate
            } else {
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate); // Lọc theo cả hai
            }
        });

        setFilteredData(filteredStatistics); // Cập nhật dữ liệu lọc
    };

    // Gọi hàm handleDateRangeSearch khi trang tải lại
    useEffect(() => {
        handleDateRangeSearch();
    }, []); // Chỉ chạy một lần khi trang được tải

    const completedBillStatistics = rawBillStatistics.filter(
        (bill) => bill.status === 'COMPLETED'
    );



    const cancelledBills = rawBillStatistics.filter(
        (bill) => bill.status === 'CANCELLED'
    );
    
    const failedBills = rawBillStatistics.filter(
        (bill) => bill.status === 'FAILED'
    );
    
    // Kết hợp cả 2 danh sách:
    const cancelledAndFailedBills = [...cancelledBills, ...failedBills];
    



    const totalPages1 = Math.ceil(completedBillStatistics.length / itemsPerPage);
    const [datas, setDatas] = useState([]);
    const totalPages2 = Math.ceil(datas.length / itemsPerPage);
    const sortedData = datas.sort((a, b) => b.quantity - a.quantity);


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4B4B', '#40E0D0', '#FF4500', '#FFD700'];

    const fetchBillDetail = async () => {
        setLoading(true);
        try {
            const fetchedData = await fetchStatisticsProduct();

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
        dispatch(fetchAllAccountCustomer());

    }, [dispatch]);

    const today = formatDateToYYYYMMDD(new Date());


    const groupStatisticsByView = (statistics, view) => {
        const today = new Date();
        switch (view) {
            case 'day':
                return statistics.filter(
                    (stat) => new Date(stat.createdAt).toDateString() === today.toDateString()
                );
            case 'month':
                return statistics.filter(
                    (stat) =>
                        new Date(stat.createdAt).getMonth() === today.getMonth() &&
                        new Date(stat.createdAt).getFullYear() === today.getFullYear()
                );
            case 'year':
                return statistics.filter(
                    (stat) => new Date(stat.createdAt).getFullYear() === today.getFullYear()
                );
            default:
                return statistics;
        }
    };


    const billStatistics = groupStatisticsByView(completedBillStatistics, currentView);
    const dataToDisplay = filteredData.length > 0 ? filteredData : billStatistics;

    const currentItems1 = dataToDisplay.slice(indexOfFirstItem1, indexOfLastItem1);

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
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
                <div className="manage-cart-container">
                    <div className="row m-3">
                        <div className="col-lg-6 col-md-12">
                            <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                                <div className="col ps-4">
                                    <IoBagCheckOutline size={35} />
                                </div>
                                <div className="col">
                                    {/* <p className="m-0 fs-4 ps-4">15</p> */}
                                    <p className="m-0 fs-4 ps-4">
                                        {accounts.length}
                                    </p>

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
                                        {completedBillStatistics && completedBillStatistics.length > 0 ? completedBillStatistics.reduce((acc, item) => acc + item.numberBill, 0) : 0}
                                    </p>
                                    <p className="m-0 fs-10">Đơn hàng đã hoàn thành</p>
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
                                        {cancelledAndFailedBills && cancelledAndFailedBills.length > 0 ? cancelledAndFailedBills.reduce((acc, item) => acc + item.numberBill, 0) : 0}
                                    </p>
                                    <p className="m-0 fs-10">Đơn hàng đã hủy</p>
                                </div>
                            </div>

                            <div className="info-item row align-items-center bg-white rounded p-3 shadow-sm m-2">
                                <div className="col ps-4">
                                    <IoPricetagsSharp size={35} />
                                </div>
                                <div className="col">
                                    <p className="m-0 fs-4 ps-4">
                                        {/* Assuming item.price is your total revenue */}
                                        {formatCurrency(completedBillStatistics && completedBillStatistics.length > 0 ? completedBillStatistics.reduce((acc, item) => acc + item.price, 0) : 0)}
                                    </p>
                                    <p className="m-0 fs-10">Tổng doanh thu</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            {/* Render first table */}
                            <div className="bg-white rounded p-3 shadow-sm m-2">
                                <div><h5>Doanh thu sản phẩm được bán nhiều nhất</h5></div>
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
                                                        <td><ListImageProduct id={item.idProduct} maxWidth={'100px'} maxHeight={'100px'} /></td>

                                                        <td>{item.nameProduct}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{formatCurrency(item.revenue)}</td>
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

                        <div className="col-lg-12 col-md-12 bg-white rounded p-3 shadow-sm">
                            <div className="bg-white rounded p-3 shadow-sm ">
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                        width={100}
                                        height={400}
                                        data={dataToDisplay.map(stat => ({
                                            date: stat.createdAt, // Sử dụng createdAt từ dữ liệu gốc
                                            price: stat.price,    // Doanh thu
                                        }))}
                                        margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            label={{ value: "", position: "insideBottom", offset: -5 }}
                                            tickFormatter={(tick) => format(new Date(tick), "dd/MM/yyyy")} // Định dạng ngày
                                        />
                                        <YAxis
                                            tick={{ fontSize: 14 }} // Increase font size for better readability
                                            tickFormatter={(value) =>
                                                `${new Intl.NumberFormat('vi-VN', {
                                                    maximumFractionDigits: 0,
                                                }).format(value)} VND` // Append " VND" instead of currency symbol
                                            }
                                            label={{ value: "", angle: -90, position: "insideLeft", fontSize: 14 }}
                                        />

                                        <Tooltip
                                            contentStyle={{ fontSize: 14 }}
                                            formatter={(value) =>
                                                `${new Intl.NumberFormat('vi-VN', {
                                                    maximumFractionDigits: 0,
                                                }).format(value)} VND` // Append " VND" instead of currency symbol
                                            }
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="price"
                                            fill="#0088FE"
                                            name="Doanh thu"
                                            label={{
                                                position: 'top',
                                                fontSize: 12,
                                                fill: '#000',
                                                formatter: (value) =>
                                                    `${new Intl.NumberFormat('vi-VN', {
                                                        maximumFractionDigits: 0,
                                                    }).format(value)} VND`, // Append " VND" instead of currency symbol
                                            }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>


                        <div className="col-lg-12 col-md-12">
                            {/* Render second table */}
                            <div className="bg-white rounded p-3 shadow-sm m-2">
                                <div className='row'>
                                    <div className='col-3'>
                                        <h5>Doanh thu theo</h5>
                                    </div>

                                    <div className="col-4">
                                        <Form.Group controlId="startDate">
                                            <Form.Label>Từ ngày:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group controlId="endDate">
                                            <Form.Label>Đến ngày:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-1 d-flex align-items-end">
                                        <button className="btn btn-primary" onClick={handleDateRangeSearch}>
                                            Tìm kiếm
                                        </button>

                                    </div>
                                </div>
                                <div className='table-product mb-3'>
                                    <Table striped bordered hover className="align-middle">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Thời gian</th>
                                                <th>Số lượng đơn</th>
                                                <th>Doanh thu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems1 && currentItems1.length > 0 ? (
                                                currentItems1.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1 + (currentPage1 - 1) * itemsPerPage}</td>
                                                        <td>{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
                                                        <td>{item.numberBill}</td>
                                                        <td>{formatCurrency(item.price)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">Không tìm thấy danh sách</td>
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
            </RoleBasedGuard>
        </AuthGuard>
    )
}
export default ManageStatistical;