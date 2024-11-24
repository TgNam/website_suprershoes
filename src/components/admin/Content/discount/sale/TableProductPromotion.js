import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSizeByStatusActive } from '../../../../../redux/action/sizeAction';
import { fetchColorByStatusActive } from '../../../../../redux/action/colorAction';
import { useDebounce } from 'use-debounce';
import { fetchPromotionAndProductPromotion, fetchSearchPromotionAndProductPromotion } from '../../../../../redux/action/promotionAction'
import ListImageProduct from '../../../../../image/ListImageProduct'
const TableProductPromotion = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { listProductPromotion } = useSelector((state) => state.promotion);
    const sizes = useSelector((state) => state.size.listSize);
    const colors = useSelector((state) => state.color.listColor);
    const idPromotion = searchParams.get('idPromotion');
    const [searchName, setSearchName] = useState("");
    const [searchColor, setSearchColor] = useState("");
    const [searchSize, setSearchSize] = useState("");
    const [searchPrice, setSearchPrice] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000);

    useEffect(() => {
        dispatch(fetchSizeByStatusActive());
        dispatch(fetchColorByStatusActive());
    }, [dispatch]);

    useEffect(() => {
        if (idPromotion != null) {
            if (debouncedSearchName || searchColor !== "" || searchSize !== "" || searchPrice !== "") {
                dispatch(fetchSearchPromotionAndProductPromotion(idPromotion, debouncedSearchName, searchSize, searchColor, searchPrice));
                setCurrentPage(1);
            } else {
                dispatch(fetchPromotionAndProductPromotion(idPromotion));
                setCurrentPage(1);
            }
        } else {
            setCurrentPage(1);
            dispatch(fetchPromotionAndProductPromotion(idPromotion));
        }
    }, [debouncedSearchName, searchColor, searchPrice, searchSize, dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const currentProduct = [...listProductPromotion];

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
    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
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
                            colors.map((item, index) => (
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
                            sizes.map((item, index) => (
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
                            <th>#</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Kích cỡ</th>
                            <th>Màu sắc</th>
                            <th>Số lượng sản phẩm còn giảm giá</th>
                            <th>Giá sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.idPromotionDetail}>
                                    <td>{index + 1 + (currentPage - 1) * 5}</td>
                                    <td><ListImageProduct id={item.idProductDetail} maxWidth={'100px'} maxHeight={'100px'} /></td>
                                    <td>{item.nameProduct}</td>
                                    <td className='text-center'>{item.nameSize}</td>
                                    <td className='text-center'>{item.nameColor}</td>
                                    <td className='text-center'>{item.quantityPromotionDetail}</td>
                                    <td className='text-danger'>{formatCurrency(item.productDetailPrice)} VND</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className='text-center'>Không tìm thấy danh sách</td>
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

export default TableProductPromotion;
