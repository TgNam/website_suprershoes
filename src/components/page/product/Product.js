import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import './Product.scss';
import Dropdown from "./Dropdown/Dropdow";
import ListGroup from "./ListGroup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductPromotion } from '../../../redux/action/productDetailAction';
import { fetchSizeByStatusActive } from '../../../redux/action/sizeAction';
import { fetchColorByStatusActive } from '../../../redux/action/colorAction';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import image1 from '../../page/home/images/product6.webp';
import { Link } from 'react-router-dom';


const Product = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productDetail.listProductPromotion);
    const sizes = useSelector((state) => state.size.listSize);
    const colors = useSelector((state) => state.color.listColor);

    useEffect(() => {
        dispatch(fetchAllProductPromotion());
        dispatch(fetchSizeByStatusActive());
        dispatch(fetchColorByStatusActive());
    }, [dispatch]);

    const getUniqueProducts = (products) => {
        const uniqueProducts = [];
        const uniqueIds = new Set();
        for (const product of products) {
            if (!uniqueIds.has(product.idProduct)) {
                uniqueProducts.push(product);
                uniqueIds.add(product.idProduct);
            }
            if (uniqueProducts.length >= 20) break;
        }
        return uniqueProducts;
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
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

                                            {hoveredIndex === index && (
                                               <div className="button-overlay">
                                               <button className="btn btn-light circle-button" aria-label="Add to cart">
                                                   <IoCartOutline size={"25px"} />
                                               </button>
                                               <Link to="/product-detail" className="btn btn-light circle-button" aria-label="View details">
                                                   <IoIosSearch size={"25px"} />
                                               </Link>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
