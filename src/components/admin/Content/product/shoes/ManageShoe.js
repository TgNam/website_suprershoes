import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom';
import './ManageShoe.scss';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
const ManageShoe = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [debouncedSearch] = useDebounce(search, 1000);
    // Cập nhật dữ liệu khi giá trị search hoặc searchStatus thay đổi
    useEffect(() => {
        if (debouncedSearch || searchStatus !== "") {

        } else {

        }
    }, [debouncedSearch, searchStatus, dispatch]);
    // Hàm xử lý khi radio button thay đổi giá trị
    const handleStatusChange = (event) => {
        setSearchStatus(event.target.value); // Cập nhật state khi thay đổi radio button
    };

    return (
        <div className="manage-cart-container">
            <h4>Danh sách sản phẩm</h4>
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
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                            <div className='shoe-add mb-3 col-2'>
                                <Link to="/admins/manage-create-shoe2">
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
                                    <div className="form-check m-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="statusProduct"
                                            value=""
                                            checked={searchStatus === ""} // Gán checked dựa trên state
                                            onChange={handleStatusChange}
                                        />
                                        <label className="form-check-label">
                                            Tất cả
                                        </label>
                                    </div>
                                    <div className="form-check m-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="statusProduct"
                                            value="ACTIVE"
                                            checked={searchStatus === "ACTIVE"}
                                            onChange={handleStatusChange}
                                        />
                                        <label className="form-check-label">
                                            Đang bán
                                        </label>
                                    </div>
                                    <div className="form-check m-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="statusProduct"
                                            value="INACTIVE"
                                            checked={searchStatus === "INACTIVE"}
                                            onChange={handleStatusChange}
                                        />
                                        <label className="form-check-label">
                                            Ngừng bán
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='shoe-category col'>
                                <label htmlFor="categoryShoe" className="form-label">Danh mục</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                // value={}
                                // onChange={}
                                >
                                    <option value="">Chọn danh mục...</option>
                                    {/* {categories.map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))} */}
                                </select>
                            </div>
                            <div className='shoe-brand col'>
                                <label htmlFor="brandShoe" className="form-label">Thương hiệu</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                // value={}
                                // onChange={}
                                >
                                    <option value="">Chọn thương hiệu...</option>
                                    {/* {brands.map(brand => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))} */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='shoe-content-body mt-3'>
                        <TableShoe />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageShoe;
