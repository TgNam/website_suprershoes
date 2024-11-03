import React, { useState } from 'react';
import './Content.scss';
import image1 from './images/product6.webp';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap';
import image2 from './images/collection-item1.jpg';
import image3 from './images/collection-item2.jpg';
import team1 from './images/team-1.jpg'
const Content = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const products = [
        { id: 1, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 2, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 3, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 4, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" }
    ];
    const newProducts = [
        { id: 1, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 2, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 3, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" },
        { id: 4, price: "2.080.000 VND", originalPrice: "5.200.000 VND", discount: "-60%" }
    ];
    const myfriend = [

    ];
    return (
        <div className='FeaturedProduct'>
            <div className="row m-2">
                <h2 className="text-start col m-3">Featured Products</h2>
                <Link className="text-end col m-3 ">
                    <h4 >View all</h4>
                </Link>
            </div>
            <div className="row m-2">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="card product-card"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={image1} // thay bằng URL ảnh của bạn
                            className="card-img-top"
                            alt="Running shoes for men"
                        />
                        {hoveredIndex === index && (
                            <div className="button-overlay">
                                <button className="btn btn-light circle-button"><IoCartOutline size={"25px"} /></button>
                                <button className="btn btn-light circle-button"><IoIosSearch size={"25px"} /></button>
                            </div>
                        )}
                        <div className="card-body text-center">
                            <p className="price">
                                <span className="text-danger discount">{product.discount} </span> {product.price}
                            </p>
                            <p className='text-decoration-line-through text-secondary'>{product.originalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Row className="justify-content-center m-4">
                <Col md={6} lg={6}>
                    <Card className="text-white text-center">
                        <Card.Img src={image2} alt="Minimal Collection" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                            <Card.Title className="display-4 fw-bold text-dark">Minimal Collection</Card.Title>
                            <Link>
                                <h4>Shop Now</h4>
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6}>
                    <Card className="text-white text-center">
                        <Card.Img src={image3} alt="Sneakers Collection" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                            <Card.Title className="display-4 fw-bold text-dark">Sneakers Collection</Card.Title>
                            <Link>
                                <h4>Shop Now</h4>
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            <div className="row m-2">
                <h2 className="text-start col m-3">New Products</h2>
                <Link className="text-end col m-3 ">
                    <h4 >View all</h4>
                </Link>
            </div>
            <div className="row m-2">
                {newProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="card product-card"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={image1} // thay bằng URL ảnh của bạn
                            className="card-img-top"
                            alt="Running shoes for men"
                        />
                        {hoveredIndex === index && (
                            <div className="button-overlay">
                                <button className="btn btn-light circle-button"><IoCartOutline size={"25px"} /></button>
                                <button className="btn btn-light circle-button"><IoIosSearch size={"25px"} /></button>
                            </div>
                        )}
                        <div className="card-body text-center">
                            <p className="price">
                                <span className="text-danger discount">{product.discount} </span> {product.price}
                            </p>
                            <p className='text-decoration-line-through text-secondary'>{product.originalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <section className="team-section">
                <h2>Đội nhóm <span>của chúng tôi</span></h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={team1} alt="Joseph Brown" />
                        <h3>Joseph Brown</h3>
                        <p>Marketing Head</p>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
}

export default Content;
