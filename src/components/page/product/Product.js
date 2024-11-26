import React, { useState, useEffect, useMemo } from "react";
import Banner from "./banner/Banner";
import "./Product.scss";
import Dropdown from "./Dropdown/Dropdow";
import ListGroup from "./ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPriceRangePromotionByQuang } from "../../../redux/action/productDetailAction";
import { fetchSizeByStatusActive } from "../../../redux/action/sizeAction";
import { fetchColorByStatusActive } from "../../../redux/action/colorAction";
import { fetchAllBrand } from "../../../redux/action/brandAction";
import { fetchAllCategory } from "../../../redux/action/categoryAction";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { debounce } from "lodash";
import image1 from "../../page/home/images/product6.webp";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [filters, setFilters] = useState({
    nameProduct: "",
    idColor: null,
    idSize: null,
    idBrand: null,
    idCategory: null,
    minPrice: null,
    maxPrice: null,
    sortOption: "Mới nhất",
  });

  const dispatch = useDispatch();

  // Fetching data from Redux state
  const products = useSelector((state) => state.productDetail.listPriceRangePromotionByQuang || { data: [] });
  const sizes = useSelector((state) => state.size.listSize || []);
  const colors = useSelector((state) => state.color.listColor || []);
  const brands = useSelector((state) => state.brand.listBrand || []);
  const categories = useSelector((state) => state.category.listCategory || []);

  // Fetch dropdown data on mount
  useEffect(() => {
    dispatch(fetchSizeByStatusActive());
    dispatch(fetchColorByStatusActive());
    dispatch(fetchAllBrand());
    dispatch(fetchAllCategory());
  }, [dispatch]);

  // Fetch products based on filters
  useEffect(() => {
    dispatch(
      fetchPriceRangePromotionByQuang(
        filters.nameProduct,
        filters.idColor,
        filters.idSize,
        filters.idBrand,
        filters.idCategory,
        filters.minPrice,
        filters.maxPrice
      )
    );
  }, [dispatch, filters]);

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setItemsPerPage(16);
      } else if (window.innerWidth >= 1200) {
        setItemsPerPage(12);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(4);
      }
      // Reset to the first page to ensure consistent display
      setCurrentPage(1);
    };
  
    // Call handleResize initially to set items per page correctly
    handleResize();
  
    // Debounce resize event to improve performance
    const debouncedResize = debounce(handleResize, 200);
  
    window.addEventListener("resize", debouncedResize);
  
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return 0;
    const roundedValue = Math.round(value) || 0;
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Filter unique products by id
  const uniqueProducts = useMemo(() => {
    if (!Array.isArray(products.data)) return [];

    const productMap = new Map();
    products.data.forEach((product) => {
      if (!productMap.has(product.idProduct)) {
        productMap.set(product.idProduct, product); // Add the first product with this id
      }
    });
    return Array.from(productMap.values()); // Return only unique products
  }, [products.data]);

  const sortedProducts = useMemo(() => {
    const sortOptions = {
      "Mới nhất": (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      "Bán chạy": (a, b) => b.sales - a.sales,
      "Giá cao đến thấp": (a, b) => b.minPrice - a.minPrice,
      "Giá thấp đến cao": (a, b) => a.minPrice - b.minPrice,
    };

    return [...uniqueProducts].sort(sortOptions[filters.sortOption]);
  }, [uniqueProducts, filters.sortOption]);

  // Pagination
  const totalPages = useMemo(() => {
    if (!Array.isArray(sortedProducts)) return 0;
    return Math.ceil(sortedProducts.length / itemsPerPage);
  }, [sortedProducts, itemsPerPage]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, itemsPerPage]);

  // Update filter
  const updateFilter = (key, value) => {
    if (filters[key] === value) return;
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page
  };

  const resetFilters = () => {
    setFilters({
      nameProduct: "",
      idColor: null,
      idSize: null,
      idBrand: null,
      idCategory: null,
      minPrice: null,
      maxPrice: null,
      sortOption: "Mới nhất",
    });
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="homePage">
      <Banner />

      <div className="row m-5">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-4 col-sm-12 pt-5">
          <ListGroup
            title="Thương hiệu"
            items={brands.map((brand) => brand.name)}
            onSelectionChange={(selectedBrand) =>
              updateFilter("idBrand", brands.find((brand) => brand.name === selectedBrand)?.id)
            }
          />
          <ListGroup
            title="Danh mục"
            items={categories.map((category) => category.name)}
            onSelectionChange={(selectedCategory) =>
              updateFilter("idCategory", categories.find((category) => category.name === selectedCategory)?.id)
            }
          />
        </div>

        {/* Product Listing */}
        <div className="col-lg-10 col-md-8 col-sm-12">
          <div className="collection-content-wrapper">
            <div className="collection-head">
              <h1>TẤT CẢ SẢN PHẨM</h1>
              <div className="collection-sidebar">
                <input
                  className="form-control"
                  placeholder="Tìm kiếm tên"
                  value={filters.nameProduct}
                  onChange={(e) => updateFilter("nameProduct", e.target.value)}
                />
                <Dropdown
                  title="Kích cỡ"
                  menu={sizes.map((size) => size.name)}
                  value={sizes.find((size) => size.id === filters.idSize)?.name || ""}
                  onChange={(selectedSize) =>
                    updateFilter("idSize", sizes.find((size) => size.name === selectedSize)?.id)
                  }
                />
                <Dropdown
                  title="Màu sắc"
                  menu={colors.map((color) => color.name)}
                  value={colors.find((color) => color.id === filters.idColor)?.name || ""}
                  onChange={(selectedColor) =>
                    updateFilter("idColor", colors.find((color) => color.name === selectedColor)?.id)
                  }
                />
                <Dropdown
                  title="Sắp xếp"
                  menu={["Mới nhất", "Bán chạy", "Giá cao đến thấp", "Giá thấp đến cao"]}
                  value={filters.sortOption}
                  onChange={(selectedSort) => updateFilter("sortOption", selectedSort)}
                />
                <button className="btn btn-secondary" onClick={resetFilters}>
                  Reset
                </button>
              </div>
            </div>

            <div className="collection-body">
              {currentProducts.length > 0 ? (
                <div className="row m-2">
                  {currentProducts.map((product, index) => (
                    <div
                      key={`${product.idProduct}-${index}`}
                      className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch"
                    >
                      <Link to={`/product-detail?idProduct=${product.idProduct}`}>
                        <div className="card product-card">
                          <img
                            src={product.image || image1}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = image1;
                            }}
                            className="card-img-top img-fluid"
                            alt={product.nameProduct || "Product"}
                          />
                          <div className="card-body text-center">
                            <p>{product.nameProduct}</p>
                            <div className="product-pricing">
                              {product.minPriceAfterDiscount === product.minPrice &&
                              product.maxPriceAfterDiscount === product.maxPrice ? (
                                <p className="product-price">{formatCurrency(product.minPrice)} VND</p>
                              ) : (
                                <>
                                  <p className="product-sale-price text-danger">
                                    {formatCurrency(product.minPriceAfterDiscount)} VND -{" "}
                                    {formatCurrency(product.maxPriceAfterDiscount)} VND
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
              ) : (
                <div className="text-center">
                  <h3>Không tìm thấy sản phẩm nào</h3>
                  <p>Hãy thử thay đổi bộ lọc hoặc tìm kiếm lại.</p>
                </div>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                  <Pagination.Prev
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {currentPage > 2 && <Pagination.Ellipsis />}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                    .map((page) => (
                      <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                  {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                  <Pagination.Next
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
