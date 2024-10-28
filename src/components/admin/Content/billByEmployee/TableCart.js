import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';

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

    return (
        <>
            <Table striped bordered hover className='align-middle'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={item.idProductDetail}>
                                <td>{index + 1 + (currentPage - 1) * 3}</td>
                                <td className='text-center'><img src="https://placehold.co/100x100" alt="" /></td>
                                <td>
                                    <div>
                                        {item.nameProduct}[{item.nameColor}-{item.nameSize}]
                                    </div>
                                    <p>Màu: {item.nameColor} - Kích cỡ: {item.nameSize}</p>
                                </td>
                                <td>{item.quantity}</td>
                                {item.promotionPrice ? (
                                    <td>
                                        <p className='text-danger'>{item.promotionPrice} VND</p>
                                        <p className="text-decoration-line-through">{item.productDetailPrice} VND</p>
                                    </td>
                                ) : (
                                    <td>
                                        <p className='text-danger'>{item.productDetailPrice} VND</p>
                                    </td>
                                )}
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
