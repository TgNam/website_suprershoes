import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { deleteProduct } from '../../../../../Service/ApiProductService';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import ModelDetailProduct from './ModelDetailProduct';

const TableShoe = ({ products }) => {
    const groupAndSumQuantities = (products) => {
        const grouped = products.reduce((acc, item) => {
            const key = `${item.nameProduct}|${item.nameBrand}|${item.nameCategory}|${item.nameMaterial}|${item.nameshoeSole}|${item.status}|${item.price}`;

            if (!acc[key]) {
                acc[key] = { ...item, quantity: 0 };
            }

            acc[key].quantity += (item.quantity || 1);

            return acc;
        }, {});

        return Object.values(grouped);
    };

    const [currentPage, setCurrentPage] = useState(0); // Thay đổi thành bắt đầu từ 0
    const itemsPerPage = 5; // Số lượng sản phẩm trên mỗi trang
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAllProduct());
    // }, [dispatch]);

    // const handleDeleteProduct = async (idProduct) => {
    //     try {
    //         const response = await deleteProduct(idProduct);

    //         if (response && response.status === 200) {
    //             toast.success("Product deleted successfully");
    //             dispatch(fetchAllProduct());
    //         } else {
    //             toast.error('Error deleting Product');
    //         }
    //     } catch (error) {
    //         toast.error('Network Error');
    //     }
    // };

    // Kiểm tra nếu `products.content` tồn tại và là mảng
    const productList = Array.isArray(products.content) ? products.content : [];

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(productList.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead className='table-info'>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thương hiệu</th>
                        <th>Danh mục</th>
                        <th>ảnh</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-product-${index}`}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.nameProduct || 'N/A'}</td>
                                <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
                                <td>{item.nameBrand || 'N/A'}</td>
                                <td>{item.nameCategory || 'N/A'}</td>
                                {/* <td>{item.imageByte}</td> */}
                                <img
                                    src={`data:image/jpeg;base64,${item.imageByte}`} // Dữ liệu Base64
                                    alt="Uploaded Image"
                                    style={{ width: '200px', height: '200px' }} // Bạn có thể tùy chỉnh kích thước
                                />

                                <td>
                                    {item.status === "ACTIVE" ? "Hoạt động" :
                                        item.status === "STOPPED" ? "Dừng" :
                                            item.status || 'N/A'}
                                </td>

                                <td>
                                    <ModelDetailProduct className="mx-4 p-2" id={item.id}></ModelDetailProduct>
                                    {/* <Button
                                        variant="danger"
                                        className="ms-3"
                                        onClick={() => handleDeleteProduct(item.id)}
                                    >
                                        Xóa
                                    </Button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => handleClickPage(0)} disabled={currentPage === 0} />
                    <Pagination.Prev onClick={() => handleClickPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0} />

                    {(() => {
                        const pageNumbers = [];
                        const maxPagesToShow = 5;
                        const halfRange = Math.floor(maxPagesToShow / 2);
                        let startPage = Math.max(0, currentPage - halfRange);
                        let endPage = Math.min(totalPages - 1, currentPage + halfRange);

                        if (endPage - startPage + 1 < maxPagesToShow) {
                            if (startPage === 0) {
                                endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
                            } else if (endPage === totalPages - 1) {
                                startPage = Math.max(0, endPage - maxPagesToShow + 1);
                            }
                        }

                        for (let page = startPage; page <= endPage; page++) {
                            pageNumbers.push(
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handleClickPage(page)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            );
                        }
                        return pageNumbers;
                    })()}

                    <Pagination.Next onClick={() => handleClickPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1} />
                    <Pagination.Last onClick={() => handleClickPage(totalPages - 1)} disabled={currentPage === totalPages - 1} />
                </Pagination>
            </div>
        </>
    );
};

export default TableShoe;
