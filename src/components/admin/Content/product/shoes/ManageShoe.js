import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom';
import './ManageShoe.scss';
import { toast } from 'react-toastify';

import { useDebounce } from 'use-debounce';
import { useSelector, useDispatch } from 'react-redux';
import { fetchfilterProductProductDetail, fetchAllProductProductDetail } from '../../../../../redux/action/productAction'
import { fetchAllBrand } from '../../../../../redux/action/brandAction';
import { fetchAllCategory } from '../../../../../redux/action/categoryAction';
const ManageShoe = () => {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.listBrand);
    const categorys = useSelector((state) => state.category.listCategory);

    const [search, setSearch] = useState("");
    const [searchBrands, setSearchBrands] = useState("");
    const [searchCategorys, setSearchCategorys] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch] = useDebounce(search, 1000);
    // Cập nhật dữ liệu khi giá trị search hoặc searchStatus thay đổi

    useEffect(() => {
        if (debouncedSearch || searchBrands !== "" || searchCategorys !== "" || searchStatus !== "") {
            dispatch(fetchfilterProductProductDetail(debouncedSearch, searchCategorys, searchBrands, searchStatus));
            setCurrentPage(1)
        } else {
            dispatch(fetchAllProductProductDetail());
        }
        dispatch(fetchAllBrand());
        dispatch(fetchAllCategory());
    }, [debouncedSearch, searchBrands, searchCategorys, searchStatus, dispatch]);

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
                                    <div className="form-check m-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="statusProduct"
                                            value=""
                                            checked={searchStatus === ""} // Gán checked dựa trên state
                                            onChange={(event) => setSearchStatus(event.target.value)}
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
                                            onChange={(event) => setSearchStatus(event.target.value)}
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
                                            onChange={(event) => setSearchStatus(event.target.value)}
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
                                    value={searchCategorys}
                                    onChange={(event) => setSearchCategorys(event.target.value)}
                                >
                                    <option value="">Chọn danh mục...</option>
                                    {categorys?.map((category) => (
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
                                    value={searchBrands}
                                    onChange={(event) => setSearchBrands(event.target.value)}
                                >
                                    <option value="">Chọn thương hiệu...</option>
                                    {brands?.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='shoe-content-body mt-3'>
                        <TableShoe currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageShoe;
