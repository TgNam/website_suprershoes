import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManageShoe.scss';
import { groupAndSumQuantities } from './TableShoe';  // Đảm bảo đường dẫn đúng đến file chứa hàm
import { toast } from 'react-toastify';
const ManageShoe = () => {
    const allStatuses = ['', 'ACTIVE', 'STOPPED'];
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filters, setFilters] = useState({ status: '', brand: '', category: '' });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [products, setProducts] = useState([]);
    


    // Hàm gọi API để lấy sản phẩm
    const fetchProducts = () => {
        const { category, brand } = filters;
        let url = `http://localhost:8080/productDetail/list-productDetail?status=${selectedStatus}`;
        if (category) url += `&category=${category}`;
        if (brand) url += `&brand=${brand}`;
        // Chỉ tìm theo productCode nếu có giá trị, nếu không thì tìm theo name
        const regexProductCode = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>?,.\/\\-]+$/;  // This regex allows alphanumeric and special characters
        const regexName = /^[A-Za-z0-9\s]+$/;  // This regex allows letters, numbers, and whitespace

        if (searchName && regexName.test(searchName)) {
            url += `&name=${searchName}`;  // Search by name if it matches regexName
        } else if (productCode && regexProductCode.test(productCode)) {
            url += `&productCode=${productCode}`;  // Search by product code if it matches regexProductCode
        }




        axios.get(url)
            .then(response => {

                setProducts(response.data.DT || response.data); // Hoặc sử dụng response.data nếu không có DT
                // console.log('Dữ liệu từ API:', response.data.DT.content);

            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    };


    // Gọi API khi component mount hoặc khi filters hoặc searchName thay đổi
    useEffect(() => {

        fetchProducts();

    }, [searchName, productCode, filters, selectedStatus,products]);
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'refreshTable' && event.newValue === 'true') {
                // Gọi fetchProducts để làm mới dữ liệu bảng
                fetchProducts();
                // Xóa cờ sau khi làm mới bảng
                localStorage.setItem('refreshTable', 'false');
                console.log('Storage event:', event);

            }
        };

        // Lắng nghe sự thay đổi trong localStorage
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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
        const input = event.target.value;
        setSearchName(input);
        setProductCode(input);
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
                                                placeholder="Tìm kiếm sản phẩm theo tên hoặc mã sản phẩm...."
                                                onChange={handleSearchNameChange}
                                                value={searchName} // Gán giá trị vào ô tìm kiếm
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
                                    <TableShoe products={products} fetchProducts={fetchProducts} />
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
