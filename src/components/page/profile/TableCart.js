import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import ListImageProduct from '../../../image/ListImageProduct';

const TableCart = () => {
    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentProduct = [...listBillDetailOrder];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentProduct.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentProduct.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    const getPaginationItems = () => {
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

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [listBillDetailOrder]);
    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const handleDeleteByIdBillDetail = (id) => {
        if (id) {

        }
        setCurrentPage(1)
    };
    const handleDecreaseQuantity = (id) => {
        if (id) {

        }
        setCurrentPage(1)
    };
    const handleIncreaseQuantity = (id) => {
        if (id) {

        }
        setCurrentPage(1)
    };
    return (
        <>
            <Table striped bordered hover className='align-middle'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th className='text-center'>Số lượng</th>
                        <th className='text-center'>Giá</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={item.idBillDetail}>
                                <td>{index + 1 + (currentPage - 1) * 3}</td>
                                <td><ListImageProduct id={item.idProductDetail} maxWidth={'100px'} maxHeight={'100px'} /></td>
                                <td>
                                    <div>
                                        {item.nameProduct}[{item.nameColor}-{item.nameSize}]
                                    </div>
                                    <p>Màu: {item.nameColor} - Kích cỡ: {item.nameSize}</p>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* <CiCircleMinus className="me-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleDecreaseQuantity(item.idBillDetail)} /> */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Giá trị hiện tại là {item.quantityBillDetail}</Tooltip>}
                                        >
                                            <Form.Control
                                                type="number"
                                                readOnly
                                                value={item.quantityBillDetail}
                                                size="sm"
                                                className="text-center mx-1"
                                                style={{ width: `${Math.max(5, String(item.quantityBillDetail).length)}ch`, fontSize: '1.25rem' }}
                                            />
                                        </OverlayTrigger>
                                        {/* <CiCirclePlus className="ms-2" style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => handleIncreaseQuantity(item.idBillDetail)} /> */}
                                    </div>
                                </td>


                                <td className='text-center'>
                                    <p className='text-danger'>{formatCurrency(item?.priceDiscount || 0)} VND</p>
                                </td>
                               
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className='text-center'>Không tìm thấy danh sách</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

                    {getPaginationItems().map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handleClickPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </>
    );
};

export default TableCart;
