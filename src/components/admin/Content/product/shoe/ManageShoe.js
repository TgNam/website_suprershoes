import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManageShoe.scss';

const ManageShoe = () => {
    const [selectedStatus, setSelectedStatus] = useState('ACTIVE');
    const [filters, setFilters] = useState({ status: '', brand: '', category: '',searchProduct:'' });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]); // Thêm state để lưu sản phẩm
    const [debouncedValue, setDebouncedValue] = useState(filters.type);
    // Hàm gọi API để lấy dữ liệu từ SQL

    const fetchProducts = (status) => {
        const { category, brand, searchProduct } = filters; // Lấy giá trị category và brand từ filters
        console.log('Current filters:', filters);
        console.log(`Fetching products with status: ${status}, category: ${category}, brand: ${brand},searchProduct: ${searchProduct}`);

        // Xây dựng URL với các tham số lọc
        let url = `http://localhost:8080/product/list-product?status=${status}`;

        if (category) {
            url += `&category=${category}`;
        }

        if (brand) {
            url += `&brand=${brand}`;
        }
        if (searchProduct) {
            url += `&name=${searchProduct}`; // Thêm điều kiện tìm kiếm theo tên sản phẩm
        }

        axios.get(url)
            .then(response => {
                console.log('products:', response.data.DT);
                setProducts(response.data.DT); // Hoặc sử dụng response.data nếu không có DT
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    };

    // Hàm gọi API để lấy danh sách danh mục
    const fetchCategories = async (category) => {
        try {
            console.log(`Fetching categories with status: ${category}`);
            const response = await axios.get(`http://localhost:8080/api/category/list-category`);
            console.log('Response data:', response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Hàm gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/brand/list-brand`);
            // console.log('Response data:', response.data);
            setBrands(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Gọi API khi component mount hoặc khi selectedStatus thay đổi
    useEffect(() => {
        // console.log('sadasd:', filters, selectedStatus);
        if (filters.category || filters.brand || selectedStatus) { // Ví dụ, chỉ gọi khi có giá trị lọc
            fetchProducts(selectedStatus);
            console.log('Updated products:', products);
        }
    }, [filters, selectedStatus]);

    useEffect(() => {
        fetchCategories(); // Gọi hàm khi component mount hoặc khi cần
    }, []);

    useEffect(() => {
        fetchBrands();
    }, []);

    // useEffect để xử lý debounce
    useEffect(() => {
        // Đặt timeout để thực hiện tìm kiếm sau 500ms
        const handler = setTimeout(() => {
            setDebouncedValue(filters.type);
        }, 500);

        // Xóa timeout trước đó nếu user tiếp tục gõ
        return () => {
            clearTimeout(handler);
        };
    }, [filters.type]); // Chỉ chạy khi filters.type thay đổi

    // Gửi yêu cầu tìm kiếm mỗi khi debouncedValue thay đổi
    useEffect(() => {
        if (debouncedValue) {
            handleSearch();  // Gọi hàm tìm kiếm khi người dùng dừng gõ
        }
    }, [debouncedValue]);

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setSelectedStatus(value);
        fetchProducts(value);

    };
    const handleSearch = () => {
        setFilters(prevFilters => {
            const updatedFilters = {
                ...prevFilters,
                page: 0 // Reset về trang đầu khi tìm kiếm mới được thực hiện
            };
            // Gọi API với updatedFilters để lấy dữ liệu mới
            fetchProducts(updatedFilters); // Giả sử fetchProducts là hàm gọi API
            return updatedFilters;
        });
    };
    const handleSearchProductChange = (event) => {
        setFilters({
            ...filters,
            searchProduct: event.target.value // Cập nhật searchProduct trong filters
        });
    };
    // const handleCategoryChange = (event) => {
    //     const newCategory = event.target.value;
    //     setFilters(prevFilters => ({
    //         ...prevFilters,
    //         category: newCategory || '' // Đảm bảo không gây ra sự thay đổi không cần thiết
    //     }));
    // };

    // const handleBrandChange = (event) => {
    //     const newBrand = event.target.value;
    //     setFilters(prevFilters => ({
    //         ...prevFilters,
    //         brand: newBrand || '' // Đảm bảo không gây ra sự thay đổi không cần thiết
    //     }));
    // };



    const handleCategoryChange = (event) => {
        setFilters({
            ...filters,
            category: event.target.value,

        });
    };


    const handleBrandChange = (event) => {
        setFilters({
            ...filters,
            brand: event.target.value,
        });
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
                                            <input type="text" className="form-control" id="nameShoe" placeholder="Tìm kiếm sản phẩm theo tên...."
                                             value={filters.type}
                                             onChange={handleSearchProductChange}
                            />
                                        </div>
                                        <div className='shoe-add mb-3 col-2'>
                                            <Link to="/admins/manage-create-shoe">
                                                <Button variant="info">
                                                    <IoIosAddCircleOutline /> Add new product
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='shoe-filter row'>
                                        <div className='shoe-status col'>
                                            <label htmlFor="statusProduct" className="form-label">Trạng thái sản phẩm</label>
                                            <div className='shoe-status d-flex justify-content-start'>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusProduct"
                                                        id="statusAll"
                                                        value="ACTIVE"
                                                        checked={selectedStatus === 'ACTIVE'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusAll">
                                                        Tất cả
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusProduct"
                                                        id="statusSelling"
                                                        value="selling"
                                                        checked={selectedStatus === 'selling'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusSelling">
                                                        Đang bán
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="statusProduct"
                                                        id="statusStopped"
                                                        value="stopped"
                                                        checked={selectedStatus === 'stopped'}
                                                        onChange={handleStatusChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="statusStopped">
                                                        Ngừng bán
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='shoe-category col'>
                                            <label htmlFor="categoryShoe" className="form-label">Danh mục</label>
                                            <select className="form-select" aria-label="Default select example" value={filters.category} onChange={handleCategoryChange}>
                                                <option value="">Chọn danh mục...</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='shoe-brand col'>
                                            <label htmlFor="brandShoe" className="form-label">Thương hiệu</label>
                                            <select className="form-select" aria-label="Default select example" value={filters.brand} onChange={handleBrandChange}>
                                                <option value="">Chọn thương hiệu...</option>
                                                {brands.map((brand) => (
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
