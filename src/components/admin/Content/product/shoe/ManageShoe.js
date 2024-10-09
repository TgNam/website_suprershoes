import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManageShoe.scss';

const ManageShoe = () => {
    const allStatuses = ['', 'ACTIVE', 'STOPPED'];
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filters, setFilters] = useState({ status: '', brand: '', category: '', searchProduct: '' });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [products, setProducts] = useState([]);

    // Hàm gọi API để lấy sản phẩm
    const fetchProducts = () => {
        const { category, brand, searchProduct } = filters;
        let url = `http://localhost:8080/productDetail/list-productDetail?status=${selectedStatus}`;

        if (category) url += `&category=${category}`;
        if (brand) url += `&brand=${brand}`;
        if (searchProduct) url += `&name=${searchProduct}`;

        axios.get(url)
            .then(response => {
                setProducts(response.data.DT || response.data); // Hoặc sử dụng response.data nếu không có DT
                console.log('Dữ liệu không phải là mảng:', response.data.DT);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    };

    // Hàm gọi API để tìm kiếm sản phẩm theo tên
    const searchProducts = () => {
        axios.get(`http://localhost:8080/productDetail/list-productDetail?name=${searchName}`)
            .then(response => {
                setProducts(response.data.DT || response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi tìm kiếm sản phẩm:', error);
            });
    };

    // Gọi API khi component mount hoặc khi filters hoặc searchName thay đổi
    useEffect(() => {
        if (searchName) {
            searchProducts();
        } else {
            fetchProducts();
        }
    }, [searchName, filters, selectedStatus]);

    // Hàm gọi API để lấy danh sách danh mục
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/category/list-category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Hàm gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/brand/list-brand`);
            setBrands(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách thương hiệu:', error);
        }
    };

    // Gọi API lấy danh mục và thương hiệu khi component mount
    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: event.target.value,
        }));
    };

    const handleBrandChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            brand: event.target.value,
        }));
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    return (
        <div className="manage-cart-container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <h4>Danh sách sản phẩm</h4>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className='shoe-content'>
                                <div className='shoe-content-header'>
                                    <label htmlFor="nameShoe" className="form-label">Tên sản phẩm</label>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nameShoe"
                                                placeholder="Tìm kiếm sản phẩm theo tên...."
                                                onChange={handleSearchNameChange}
                                            />
                                        </div>
                                        <div className='shoe-add mb-3 col-2'>
                                            <Link to="/admins/manage-create-shoe">
                                                <Button variant="info">
                                                    <IoIosAddCircleOutline /> Thêm sản phẩm
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='shoe-filter row'>
                                        <div className='shoe-status col'>
                                            <label htmlFor="statusProduct" className="form-label">Trạng thái sản phẩm</label>
                                            <div className='shoe-status d-flex justify-content-start'>
                                                {allStatuses.map(status => (
                                                    <div className="form-check m-2" key={status}>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="statusProduct"
                                                            id={`status${status}`}
                                                            value={status}
                                                            checked={selectedStatus === status}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <label className="form-check-label" htmlFor={`status${status}`}>
                                                            {status === '' ? 'Tất cả' : status === 'ACTIVE' ? 'Đang bán' : 'Ngừng bán'}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='shoe-category col'>
                                            <label htmlFor="categoryShoe" className="form-label">Danh mục</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={filters.category}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Chọn danh mục...</option>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='shoe-brand col'>
                                            <label htmlFor="brandShoe" className="form-label">Thương hiệu</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={filters.brand}
                                                onChange={handleBrandChange}
                                            >
                                                <option value="">Chọn thương hiệu...</option>
                                                {brands.map(brand => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='shoe-content-body mt-3'>
                                    <TableShoe products={products} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageShoe;
