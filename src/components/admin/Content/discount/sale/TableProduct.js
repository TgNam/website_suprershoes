import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct, fetchSearchProduct } from '../../../../../redux/action/productAction';
import { useDebounce } from 'use-debounce';

const TableProduct = ({ selectedProductIds, setSelectedProductIds }) => {
    const dispatch = useDispatch();
    const listProduct = useSelector((state) => state.product.listProduct);

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentProduct = [...listProduct];

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

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };

    const [searchName, setSearchName] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000);
    useEffect(() => {
        if (debouncedSearchName) {
            dispatch(fetchSearchProduct(debouncedSearchName));
        } else {
            dispatch(fetchAllProduct());
        }
    }, [debouncedSearchName, dispatch]);


    const [isAllChecked, setIsAllChecked] = useState(false);
    // Hàm quản lý checkbox chọn tất cả
    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            const allProductIds = listProduct.map(item => item.id);
            setSelectedProductIds(allProductIds);
        } else {
            setSelectedProductIds([]);
        }
    };

    // Hàm quản lý checkbox từng sản phẩm
    const handleCheckProduct = (event, id) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedProductIds((prev) => [...prev, id]);
        } else {
            setSelectedProductIds((prev) => prev.filter((productId) => productId !== id));
        }
    };

    // Khi component reset, đánh dấu lại các sản phẩm đã chọn
    useEffect(() => {
        if (listProduct.length > 0) {
            const allChecked = listProduct.every(item => selectedProductIds.includes(item.id));
            setIsAllChecked(allChecked);
        }
    }, [listProduct, selectedProductIds]);

    return (
        <>
            <div className='search-product mb-3'>
                <label htmlFor="nameProduct" className="form-label">Tên sản phẩm</label>
                <input
                    type="text"
                    className="form-control"
                    id="nameProduct"
                    placeholder="Tìm kiếm sản phẩm theo tên...."
                    onChange={(event) => setSearchName(event.target.value)}
                />
            </div>
            <div className='table-product mb-3'>
                <Table striped bordered hover className='align-middle'>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    id="flexCheckAll"
                                    checked={isAllChecked}
                                    onChange={handleCheckAll}
                                />
                            </th>
                            <th>#</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Thương hiệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={`flexCheckProduct-${item.id}`}
                                            checked={selectedProductIds.includes(item.id)}
                                            onChange={(event) => handleCheckProduct(event, item.id)}
                                        />
                                    </td>
                                    <td>{index + 1 + (currentPage - 1) * 3}</td>
                                    <td><img src="https://placehold.co/100x100" alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.nameCategory}</td>
                                    <td>{item.nameBrand}</td>
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
            </div>
        </>
    );
};

export default TableProduct;
