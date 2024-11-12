import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import './Product.scss';
import Dropdown from "./Dropdown/Dropdow";
import ListGroup from "./ListGroup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPriceRangePromotion } from '../../../redux/action/productDetailAction';
import { fetchSizeByStatusActive } from '../../../redux/action/sizeAction';
import { fetchColorByStatusActive } from '../../../redux/action/colorAction';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import image1 from '../../page/home/images/product6.webp';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const Product = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productDetail.listPriceRangePromotion);
    const sizes = useSelector((state) => state.size.listSize);
    const colors = useSelector((state) => state.color.listColor);

    useEffect(() => {
        dispatch(fetchAllPriceRangePromotion());
        dispatch(fetchSizeByStatusActive());
        dispatch(fetchColorByStatusActive());
    }, [dispatch]);

    const formatCurrency = (value) => {
        if (!value) return 0;
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const getUniqueProducts = (products) => {
        const uniqueProducts = [];
        const uniqueIds = new Set();
        for (const product of products) {
            if (!uniqueIds.has(product.idProduct)) {
                uniqueProducts.push(product);
                uniqueIds.add(product.idProduct);
            }
            if (uniqueProducts.length >= 1000) break;
        }
        return uniqueProducts;
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        if (filteredProducts.length > 0) {
            setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
        }
    }, [filteredProducts]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className='homePage'>
            <Banner />

            <div className="row m-5">
                <div className="col-lg-3 col-md-4 col-sm-12 pt-5">
                    <ListGroup title={"Thương hiệu"} items={["item1", "item2", "item3"]} />
                    <ListGroup title={"Danh mục"} items={["item1", "item2", "item3"]} />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="collection-content-wrapper">
                        <div className="collection-head">
                            <div className="collection-head-title">
                                <h1>TẤT CẢ SẢN PHẨM</h1>
                            </div>
                            <div className="collection-sidebar">
                                <Dropdown title={"Kích cỡ"} menu={sizes ? sizes.map(size => size.name) : []} />
                                <Dropdown title={"Màu sắc"} menu={colors ? colors.map(color => color.name) : []} />
                                <Dropdown title={"Giá"} menu={["1-2000$", "2000$-5000$"]} />
                                <Dropdown
                                    title={"Sắp xếp"}
                                    menu={[
                                        "Mới nhất",
                                        "Bán chạy",
                                        "Giá cao đến thấp",
                                        "Giá thấp đến cao",
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="collection-body">
                            <div className="row m-2">
                                {currentProducts.map((product, index) => (
                                    <div
                                        key={product.idProduct}
                                        className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
                                    >
                                        <Link to={`/product-detail?idProduct=${product.idProduct}`} className="btn btn-light circle-button" aria-label="View details">
                                            <div className="card product-card">
                                                {product.images?.length ? (
                                                    <div className="image-container">
                                                        {product.images.map((img, imgIndex) => (
                                                            <img
                                                                key={imgIndex}
                                                                src={img || image1}
                                                                onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                                                className="card-img-top img-fluid"
                                                                alt={product.nameProduct || "Product"}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={product.image || image1}
                                                        onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                                        className="card-img-top img-fluid"
                                                        alt={product.nameProduct || "Product"}
                                                    />
                                                )}

                                                <div className="card-body text-center">
                                                    <p>{product.nameProduct}</p>
                                                    <div className="product-pricing">
                                                        {product.minPriceAfterDiscount === product.minPrice && product.maxPriceAfterDiscount === product.maxPrice ? (
                                                            <p className="product-price">{formatCurrency(product.minPrice)} VND</p>
                                                        ) : (
                                                            <>
                                                                <p className="product-sale-price text-danger">
                                                                    {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                                </p>
                                                                <p className="product-original-price text-decoration-line-through">
                                                                    {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className='d-flex justify-content-center'>
                                <Pagination>
                                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} aria-label="Go to first page" />
                                    <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} aria-label="Go to previous page" />

                                    {[...Array(5).keys()].map(i => {
                                        const windowSize = 5; // Customizable window size
                                        const startPage = Math.max(1, Math.min(currentPage - Math.floor(windowSize / 2), totalPages - windowSize + 1));
                                        const page = startPage + i;
                                        if (page <= totalPages) {
                                            return (
                                                <Pagination.Item
                                                    key={page}
                                                    active={page === currentPage}
                                                    onClick={() => handlePageChange(page)}
                                                    aria-current={page === currentPage ? "page" : undefined}
                                                >
                                                    {page}
                                                </Pagination.Item>
                                            );
                                        }
                                        return null;
                                    })}

                                    <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} aria-label="Go to next page" />
                                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} aria-label="Go to last page" />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
