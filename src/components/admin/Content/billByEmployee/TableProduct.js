import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductPromotion, fetchFilterProductPromotion } from '../../../../redux/action/productDetailAction';
import { fetchSizeByStatusActive } from '../../../../redux/action/sizeAction';
import { fetchColorByStatusActive } from '../../../../redux/action/colorAction';
import { useDebounce } from 'use-debounce';
import Countdown from './Countdown';
const TableProduct = ({ selectedProductIds, setSelectedProductIds }) => {
    const dispatch = useDispatch();

    const listProduct = useSelector((state) => state.productDetail.listProductPromotion);
    const sizes = useSelector((state) => state.size.listSize);
    const colors = useSelector((state) => state.color.listColor);

    useEffect(() => {
        dispatch(fetchAllProductPromotion());
        dispatch(fetchSizeByStatusActive());
        dispatch(fetchColorByStatusActive());
    }, [dispatch]);

    const [searchName, setSearchName] = useState("");
    const [searchColor, setSearchColor] = useState("");
    const [searchSize, setSearchSize] = useState("");
    const [searchPrice, setSearchPrice] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000);

    useEffect(() => {
        if (debouncedSearchName || searchColor !== "" || searchSize !== "" || searchPrice !== "") {
            dispatch(fetchFilterProductPromotion(debouncedSearchName, searchSize, searchColor, searchPrice));
            setCurrentPage(1);
        } else {
            dispatch(fetchAllProductPromotion());
        }

    }, [debouncedSearchName, searchColor, searchPrice, searchSize, dispatch]);

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

    const [isAllChecked, setIsAllChecked] = useState(false);
    // Hàm quản lý checkbox chọn tất cả
    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);

        if (isChecked) {
            const allProductIds = listProduct.map(item => item.idProductDetail);
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
            const allChecked = listProduct.every(item => selectedProductIds.includes(item.idProductDetail));
            setIsAllChecked(allChecked);
        }
    }, [listProduct, selectedProductIds]);

    return (
        <>
            <div className='search-product row mb-3'>
                <div className='col'>
                    <label htmlFor="nameProduct" className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameProduct"
                        placeholder="Tìm kiếm sản phẩm theo tên...."
                        onChange={(event) => setSearchName(event.target.value)}
                    />
                </div>
                <div className='col'>
                    <Form.Label>Màu sắc:</Form.Label>
                    <Form.Select
                        value={searchColor}
                        onChange={(event) => setSearchColor(event.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {colors && colors.length > 0 ? (
                            colors.map((item) => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))
                        ) : (
                            <option value="">1</option>
                        )}
                    </Form.Select>
                </div>
                <div className='col'>
                    <Form.Label>Kích cỡ:</Form.Label>
                    <Form.Select
                        value={searchSize}
                        onChange={(event) => setSearchSize(event.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {sizes && sizes.length > 0 ? (
                            sizes.map((item) => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))
                        ) : (
                            <option value=""></option>
                        )}
                    </Form.Select>
                </div>
                <div className='col'>
                    <Form.Label>Khoảng Giá:</Form.Label>
                    <Form.Select
                        value={searchPrice}
                        onChange={(event) => setSearchPrice(event.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="under500">Dưới 500.000 VND</option>
                        <option value="500to2000">Từ 500.000 VND đến 2.000.000 VND</option>
                        <option value="above2000">Trên 2.000.000 VND</option>
                    </Form.Select>
                </div>
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
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.idProductDetail}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={`flexCheckProduct-${item.idProductDetail}`}
                                            checked={selectedProductIds.includes(item.idProductDetail)}
                                            onChange={(event) => handleCheckProduct(event, item.idProductDetail)}
                                        />
                                    </td>
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
                                            <Countdown endDate={item.endAtByPromotion} />
                                        </td>
                                    ) : (
                                        <td>
                                            <p>{item.productDetailPrice} VND</p>
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
            </div>
        </>
    );
};

export default TableProduct;
