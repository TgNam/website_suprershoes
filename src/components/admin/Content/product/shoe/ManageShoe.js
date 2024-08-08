import { IoIosAddCircleOutline } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import TableShoe from './TableShoe';
import { Link } from 'react-router-dom'
import './ManageShoe.scss'
const ManageShoe = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
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
                                <div className='shoe-content-hender'>
                                    <label for="nameShoe" className="form-label">Tên sản phẩm</label>
                                    <div className='shoe-search-add row'>
                                        <div className="shoe-search mb-3 col-10">
                                            <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm sản phẩm theo tên...." />
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
                                            <label for="nameShoe" className="form-label">Trạng thái sản phẩm</label>
                                            <div className='shoe-status d-flex justify-content-start'>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        value="all"
                                                        checked={selectedStatus === 'all'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Tất cả
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        value="selling"
                                                        checked={selectedStatus === 'selling'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        Đang bán
                                                    </label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault3"
                                                        value="stopped"
                                                        checked={selectedStatus === 'stopped'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                        Ngừng bán
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='shoe-category col'>
                                            <label for="categoryShoe" className="form-label">Danh mục</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="">Chọn danh mục...</option>
                                                <option value="1">Thể thao</option>
                                                <option value="2">Công sở</option>
                                                <option value="3">Thời trang</option>
                                            </select>
                                        </div>
                                        <div className='shoe-brand col'>
                                            <label for="nameShoe" className="form-label">Thương hiệu</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="">Chọn thương hiệu...</option>
                                                <option value="1">Nike</option>
                                                <option value="2">Adidas</option>
                                                <option value="3">Converse</option>
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
                </div>
            </div>

        </div>
    )
}
export default ManageShoe;