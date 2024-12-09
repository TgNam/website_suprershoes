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
import { fetchAllPriceRangePromotion } from '../../../../redux/action/productDetailAction';
import ListImageProduct from '../../../../image/ImageProduct';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


const Content = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const dispatch = useDispatch();

    // Lấy sản phẩm từ Redux store
    const products = useSelector((state) => state.productDetail.listPriceRangePromotion);

    useEffect(() => {
        // Gửi hành động lấy tất cả sản phẩm khuyến mãi
        dispatch(fetchAllPriceRangePromotion());
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
    const formatCurrency = (value) => {
        if (!value) return 0;
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];

    // Logic phân trang
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className='FeaturedProduct'>
            {/* Phần sản phẩm nổi bật */}
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm nổi bật</h2>
                <Link to="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>


            <div className="pagination-container">
                {/* Nút Previous */}
                <button
                    className="pagination-button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <AiOutlineLeft style={{ marginRight: "8px" }} />
                </button>

                {/* Danh sách sản phẩm */}
                <div className="product-list row mx-0">
                    {currentProducts.map((product) => (
                        <div
                            key={product.idProduct}
                            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
                        >
                            <Link
                                to={`/product-detail?idProduct=${product.idProduct}`}
                                className="btn btn-light circle-button"
                                aria-label="View details"
                            >
                                <div className="card">
                                    <div className="image-container">
                                        <ListImageProduct id={product.idProduct} />
                                    </div>
                                    <div className="card-body text-center">
                                        <p>{product.nameProduct}</p>
                                        <div className="product-pricing">
                                            {product.minPriceAfterDiscount === product.minPrice &&
                                                product.maxPriceAfterDiscount === product.maxPrice ? (
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

                {/* Nút Next */}
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                >
                    <AiOutlineRight style={{ marginLeft: "8px" }} />
                </button>
            </div>



            {/* Phần bộ sưu tập */}
            <Row className="justify-content-center m-4">
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src={image2} alt="Bộ sưu tập Minimal" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                Bộ Sưu Tập Minimal
                            </Card.Title>
                            <Link to="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src={image3} alt="Bộ sưu tập Sneakers" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                Bộ Sưu Tập Sneakers
                            </Card.Title>
                            <Link to="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>


            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm mới</h2>
                <Link to="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="row m-2">
                {currentProducts.map((product, index) => (
                    <div
                        key={product.idProduct}
                        className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch"
                    >
                        <Link to={`/product-detail?idProduct=${product.idProduct}`} className="btn btn-light circle-button" aria-label="View details">
                            <div className="card">

                                <div className="image-container">
                                    <ListImageProduct id={product.idProduct} className="card-img-top img-fluid" />
                                </div>
                                {/* Nút hành động khi hover */}
                                {hoveredIndex === index && (
                                    <div className="button-overlay">
                                        <button className="btn btn-light circle-button" aria-label="Add to cart">
                                            <IoCartOutline size={"25px"} />
                                        </button>
                                        <IoIosSearch size={"25px"} />
                                    </div>
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
            {/* Phần đội nhóm */}
            <section className="team-section">
                <h2>Đội Nhóm <span>Của Chúng Tôi</span></h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Thành Hoàng Long</h3>
                        <p>Trưởng nhóm</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Trường Nam</h3>
                        <p>Thành viên</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Thị Hải Yến</h3>
                        <p>Thành viên</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Duy Quang</h3>
                        <p>Thành viên</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Bá Thành</h3>
                        <p>Thành viên</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Thành viên đội nhóm" className="img-fluid" />
                        <h3>Nguyễn Trọng Phi Hùng</h3>
                        <p>Thành viên</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Content;
