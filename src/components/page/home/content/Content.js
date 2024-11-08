import React, { useState, useEffect } from 'react';
import './Content.scss';
import image1 from '../images/product6.webp'; // Hình ảnh mặc định
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import image2 from '../images/collection-item1.jpg';
import image3 from '../images/collection-item2.jpg';
import team1 from '../images/team-1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductPromotion } from '../../../../redux/action/productDetailAction';

const Content = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const dispatch = useDispatch();

    // Lấy sản phẩm từ Redux store
    const products = useSelector((state) => state.productDetail.listProductPromotion);

    useEffect(() => {
        // Gửi hành động lấy tất cả sản phẩm khuyến mãi
        dispatch(fetchAllProductPromotion());
    }, [dispatch]);

    // Lọc sản phẩm duy nhất theo idProduct
    const getUniqueProducts = (products) => {
        const uniqueProducts = [];
        const uniqueIds = new Set();
        for (const product of products) {
            if (!uniqueIds.has(product.idProduct)) {
                uniqueProducts.push(product);
                uniqueIds.add(product.idProduct);
            }
            if (uniqueProducts.length >= 20) break; // Điều chỉnh theo nhu cầu
        }
        return uniqueProducts;
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];

    // Logic phân trang
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className='FeaturedProduct'>
            {/* Phần sản phẩm nổi bật */}
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm nổi bật</h2>
                <Link to="/all-products" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="row m-2">
                {currentProducts.map((product, index) => (
                    <div
                        key={product.idProduct}
                        className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="card product-card">
                            {/* Hiển thị hình ảnh đơn giản */}
                            {product.images?.length ? (
                                <div className="image-container">
                                    {product.images.map((img, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={img || image1}
                                            onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                            className="card-img-top img-fluid"
                                            alt={product.nameProduct || "Sản phẩm"}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <img
                                    src={product.image || image1}
                                    onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                    className="card-img-top img-fluid"
                                    alt={product.nameProduct || "Sản phẩm"}
                                />
                            )}

                            {/* Nút hành động khi hover */}
                            {hoveredIndex === index && (
                                <div className="button-overlay">
                                    <button className="btn btn-light circle-button" aria-label="Thêm vào giỏ hàng">
                                        <IoCartOutline size={"25px"} />
                                    </button>
                                    <button className="btn btn-light circle-button" aria-label="Xem chi tiết">
                                        <IoIosSearch size={"25px"} />
                                    </button>
                                </div>
                            )}

                            <div className="card-body text-center">
                                <p>{product.nameProduct}</p>
                                <p className="price">
                                    <span className="text-danger discount">
                                        {product.promotionValue ? `${product.promotionValue}%` : ""}
                                    </span>
                                    {product.promotionPrice ? `${product.promotionPrice} VND` : ""}
                                </p>
                                <p className='text-decoration-line-through text-secondary'>
                                    {product.productDetailPrice ? `${product.productDetailPrice} VND` : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phần bộ sưu tập */}
            <Row className="justify-content-center m-4">
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center">
                        <Card.Img src={image2} alt="Bộ sưu tập Minimal" className="img-fluid" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                            <Card.Title className="display-4 fw-bold text-dark">Bộ Sưu Tập Minimal</Card.Title>
                            <Link to="/collection/minimal">
                                <h4>Mua ngay</h4>
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center">
                        <Card.Img src={image3} alt="Bộ sưu tập Sneakers" className="img-fluid" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                            <Card.Title className="display-4 fw-bold text-dark">Bộ Sưu Tập Sneakers</Card.Title>
                            <Link to="/collection/sneakers">
                                <h4>Mua ngay</h4>
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm mới</h2>
                <Link to="/all-products" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="row m-2">
                {currentProducts.map((product, index) => (
                    <div
                        key={product.idProduct}
                        className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="card product-card">
                            {/* Hiển thị hình ảnh đơn giản */}
                            {product.images?.length ? (
                                <div className="image-container">
                                    {product.images.map((img, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={img || image1}
                                            onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                            className="card-img-top img-fluid"
                                            alt={product.nameProduct || "Sản phẩm"}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <img
                                    src={product.image || image1}
                                    onError={(e) => { e.target.onerror = null; e.target.src = image1; }}
                                    className="card-img-top img-fluid"
                                    alt={product.nameProduct || "Sản phẩm"}
                                />
                            )}

                            {/* Nút hành động khi hover */}
                            {hoveredIndex === index && (
                                <div className="button-overlay">
                                    <button className="btn btn-light circle-button" aria-label="Thêm vào giỏ hàng">
                                        <IoCartOutline size={"25px"} />
                                    </button>
                                    <button className="btn btn-light circle-button" aria-label="Xem chi tiết">
                                        <IoIosSearch size={"25px"} />
                                    </button>
                                </div>
                            )}

                            <div className="card-body text-center">
                                <p>{product.nameProduct}</p>
                                <p className="price">
                                    <span className="text-danger discount">
                                        {product.promotionValue ? `${product.promotionValue}%` : ""}
                                    </span>
                                    {product.promotionPrice ? `${product.promotionPrice} VND` : ""}
                                </p>
                                <p className='text-decoration-line-through text-secondary'>
                                    {product.productDetailPrice ? `${product.productDetailPrice} VND` : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Phần đội nhóm */}
            <section className="team-section">
                <h2>Đội Nhóm <span>Của Chúng Tôi</span></h2>
                <div className="team-container">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="team-member" key={index}>
                            <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                            <h3>Joseph Brown</h3>
                            <p>Trưởng phòng Marketing</p>
                            <div className="social-icons">
                                <a href="#"><i className="bi bi-facebook"></i></a>
                                <a href="#"><i className="bi bi-twitter"></i></a>
                                <a href="#"><i className="bi bi-linkedin"></i></a>
                                <a href="#"><i className="bi bi-instagram"></i></a>
                                <a href="#"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Content;
