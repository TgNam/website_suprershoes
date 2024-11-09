import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterProductDetailByIdProduct, fetchAllProductDetail } from '../../../../../redux/action/productDetailAction';
import { getProductDetailById } from '../../../../../Service/ApiProductDetailService'
import { fetchSizeByStatusActive } from '../../../../../redux/action/sizeAction';
import { fetchColorByStatusActive } from '../../../../../redux/action/colorAction';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';
const TableProductDetail = ({ selectedProductIds, selectedProductDetailIds, setSelectedProductDetailIds }) => {
    const dispatch = useDispatch();
    const listProductDetail = useSelector((state) => state.productDetail.listProductDetail);
    const sizes = useSelector((state) => state.size.listSize);
    const colors = useSelector((state) => state.color.listColor);

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
        if (selectedProductIds.length > 0) {
            if (debouncedSearchName || searchColor !== "" || searchSize !== "" || searchPrice !== "") {
                dispatch(fetchFilterProductDetailByIdProduct(selectedProductIds, debouncedSearchName, searchSize, searchColor, searchPrice));
                setCurrentPage(1);
            } else {
                dispatch(fetchAllProductDetail(selectedProductIds));
                setCurrentPage(1);
            }
        } else {
            dispatch(fetchAllProductDetail(selectedProductIds));
            setCurrentPage(1);
        }
    }, [debouncedSearchName, searchColor, searchPrice, searchSize, dispatch, selectedProductIds]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const currentProduct = [...listProductDetail];

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
            const allProductDetails = listProductDetail.map(item => ({ idProductDetail: item.id, quantity: 1 }));
            setSelectedProductDetailIds(allProductDetails);
        } else {
            setSelectedProductDetailIds([]);
        }
    };

    // Hàm quản lý checkbox từng sản phẩm
    const handleCheckProduct = (event, idProductDetail) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách đã chọn
            const existingProduct = selectedProductDetailIds.find(product => product.idProductDetail === idProductDetail);
            if (!existingProduct) {
                setSelectedProductDetailIds((prev) => [...prev, { idProductDetail, quantity: 1 }]);
            }
        } else {
            setSelectedProductDetailIds((prev) => prev.filter((product) => product.idProductDetail !== idProductDetail));
        }
    };


    // Hàm cập nhật số lượng khi người dùng thay đổi quantity
    const handleQuantityChange = async (event, idProductDetail) => {
        try {
            const updatedQuantity = Math.max(1, Number(event.target.value)); // Đảm bảo số lượng >= 1
            const response = await getProductDetailById(idProductDetail);
            if (response.status === 200) {
                const data = response.data;
                if (updatedQuantity > data.quantity) {
                    toast.error("Số lượng sản phẩm giảm giá vượt quá số lượng sản phẩm");
                    updatedQuantity = data.quantity;
                }
                setSelectedProductDetailIds((prev) =>
                    prev.map((product) =>
                        product.idProductDetail === idProductDetail ? { ...product, quantity: updatedQuantity } : product
                    )
                );
            } else {
                toast.error("Xảy ra lỗi khi nhập số lượng sản phẩm");
                console.log("Xảy ra lỗi khi nhập số lượng sản phẩm");
            }

        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;
                if (statusCode === 409) {
                    const { mess } = errorData;
                    toast.error(mess || "Lỗi khi bỏ trống Id.");
                }
            }
            toast.error(error)
            console.error("Lối khi nhập số lượng", error)
        }

    };

    // Khi component reset, đánh dấu lại các sản phẩm đã chọn
    useEffect(() => {
        if (listProductDetail.length > 0) {
            const allChecked = listProductDetail.every(item => selectedProductDetailIds.some(detail => detail.idProductDetail === item.id));
            setIsAllChecked(allChecked);
        }
    }, [listProductDetail, selectedProductDetailIds]);
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
                            <th>Kích cỡ</th>
                            <th>Màu sắc</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Số lượng giảm giá</th>
                            <th>Giá sản phẩm</th>
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
                                            checked={selectedProductDetailIds.some(product => product.idProductDetail === item.id)}
                                            onChange={(event) => handleCheckProduct(event, item.id)}
                                        />
                                    </td>
                                    <td>{index + 1 + (currentPage - 1) * 5}</td>
                                    <td><img src="https://placehold.co/100x100" alt="" /></td>
                                    <td>{item.nameProduct}</td>
                                    <td>{item.nameSize}</td>
                                    <td>{item.nameColor}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            id="quantityPromotionDetail"
                                            name="quantityPromotionDetail"
                                            min="1"
                                            value={selectedProductDetailIds.find(product => product.idProductDetail === item.id)?.quantity || 1}
                                            onChange={(event) => handleQuantityChange(event, item.id)}
                                            readOnly={!selectedProductDetailIds.some(product => product.idProductDetail === item.id)}
                                        />
                                    </td>
                                    <td className='text-danger'>{formatCurrency(item?.price || 0)} VND</td>
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

export default TableProductDetail;
