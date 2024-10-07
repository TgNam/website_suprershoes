import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProduct, fetchSearchProduct } from '../../../../../redux/action/productAction';
import TableProduct from './TableProduct';
import './ModelCreatePromotion.scss';

export default function ModelCreatePromotion() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProduct = useSelector((state) => state.account.listProduct);
    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    const [promotionDetails, setPromotionDetails] = useState({
        codePromotion: '',
        name: '',
        value: '',
        startAt: '',
        endAt: '',
        note: '',
        type: 'PERCENTAGE',
    });
    const [selectAllTable1, setSelectAllTable1] = useState(false);
    const [selectedRowsTable1, setSelectedRowsTable1] = useState([]);
    const [selectAllTable2, setSelectAllTable2] = useState(false);
    const [selectedRowsTable2, setSelectedRowsTable2] = useState([]);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const itemsPerPage = 5;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotionDetails({
            ...promotionDetails,
            [name]: value
        });
    };

    const handleSelectAllChangeTable1 = () => {
        setSelectAllTable1(!selectAllTable1);
        if (!selectAllTable1) {
            setSelectedRowsTable1([1, 2, 3, 4, 5]);
        } else {
            setSelectedRowsTable1([]);
        }
    };

    const handleRowSelectChangeTable1 = (id) => {
        const isSelected = selectedRowsTable1.includes(id);
        if (isSelected) {
            setSelectedRowsTable1(selectedRowsTable1.filter(rowId => rowId !== id));
        } else {
            setSelectedRowsTable1([...selectedRowsTable1, id]);
        }
    };

    const handleSelectAllChangeTable2 = () => {
        setSelectAllTable2(!selectAllTable2);
        if (!selectAllTable2) {
            setSelectedRowsTable2([1, 2, 3, 4, 5]);
        } else {
            setSelectedRowsTable2([]);
        }
    };

    const handleRowSelectChangeTable2 = (id) => {
        const isSelected = selectedRowsTable2.includes(id);
        if (isSelected) {
            setSelectedRowsTable2(selectedRowsTable2.filter(rowId => rowId !== id));
        } else {
            setSelectedRowsTable2([...selectedRowsTable2, id]);
        }
    };

    const handlePageChange1 = (pageNumber) => {
        setCurrentPage1(pageNumber);
    };

    const handlePageChange2 = (pageNumber) => {
        setCurrentPage2(pageNumber);
    };

    const handleCreatePromotion = async () => {
        try {
            const response = await fetch('/api/promotion/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...promotionDetails,
                    selectedProducts: selectedRowsTable2,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create promotion');
            }

            toast.success('Promotion created successfully');
            navigate('/admins/manage-promotion');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="model-create-promotion container p-2">
            <h4 className='text-center p-2'>Thêm chương trình khuyến mãi</h4>
            <div className='model-promotion-product mx-2 row'>
                <div className='model-promotion col'>
                    {/* Promotion Details Form */}
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputCodePromotion">Mã khuyến mãi</Form.Label>
                            <Form.Control
                                type="text"
                                id="CodePromotion"
                                name="codePromotion"
                                value={promotionDetails.codePromotion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="inputNamePromotion">Tên chương trình khuyến mãi</Form.Label>
                            <Form.Control
                                type="text"
                                id="NamePromotion"
                                name="name"
                                value={promotionDetails.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputType">Loại khuyến mãi</Form.Label>
                            <Form.Select
                                id="Type"
                                name="type"
                                value={promotionDetails.type}
                                onChange={handleChange}
                            >
                                <option value="PERCENTAGE">Phần trăm</option>
                                <option value="AMOUNT">Số tiền</option>
                            </Form.Select>
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="inputValue">Giá trị</Form.Label>
                            <Form.Control
                                type="number"
                                id="Value"
                                name="value"
                                value={promotionDetails.value}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="StartDate">Ngày bắt đầu</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="StartDate"
                                name="startAt"
                                value={promotionDetails.startAt}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="EndDate">Ngày kết thúc</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="EndDate"
                                name="endAt"
                                value={promotionDetails.endAt}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="StartDate">Số lượng:</Form.Label>
                            <Form.Control
                                type="number"
                                id="StartDate"
                                name="startAt"
                                value={promotionDetails.startAt}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputNote">Ghi chú</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                id="Note"
                                name="note"
                                value={promotionDetails.note}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Button variant="info" onClick={handleCreatePromotion}>
                                <IoIosAddCircleOutline /> Thêm chương trình khuyến mãi
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='model-table-product col'>
                    <TableProduct />
                </div>
            </div>

            <div className='model-product-detail mb-3'>
                <h5>Danh sách sản phẩm chi tiết</h5>
                {/* <div className='filter-productDetail row mb-3'>
                    <div className='filter-productDetail-name col'>
                        <Form.Label htmlFor="inputNameProduct">Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            id="NameProduct"
                            placeholder='Nhập tên....'
                        />
                    </div>
                    <div className='filter-productDetail-size col'>
                        <label htmlFor="productSize" className="form-label">Size</label>
                        <select className="form-select" aria-label="Default select example" id="productSize">
                            <option value="">Chọn size...</option>
                            <option value="1">37</option>
                            <option value="2">40</option>
                            <option value="3">42</option>
                        </select>
                    </div>
                    <div className='filter-productDetail-color col'>
                        <label htmlFor="productColor" className="form-label">Color</label>
                        <select className="form-select" aria-label="Default select example" id="productColor">
                            <option value="">Chọn Color...</option>
                            <option value="1">Trắng</option>
                            <option value="2">Đen</option>
                            <option value="3">Vàng</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-3'>
                    <Button className='mx-2' variant="primary">Làm mới</Button>
                    <Button className='mx-2' variant="warning">Tìm kiếm</Button>
                </div> */}
                <div className='table-product-detail'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectAllTable2}
                                        onChange={handleSelectAllChangeTable2}
                                    />
                                </th>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại sản phẩm</th>
                                <th>Mã sản phẩm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {[1, 2, 3, 4, 5].slice((currentPage2 - 1) * itemsPerPage, currentPage2 * itemsPerPage).map(id => (
                                <tr key={id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedRowsTable2.includes(id)}
                                            onChange={() => handleRowSelectChangeTable2(id)}
                                        />
                                    </td>
                                    <td>{id}</td>
                                    <td>Tên sản phẩm {id}</td>
                                    <td>Loại sản phẩm {id}</td>
                                    <td>Mã {id}</td>
                                </tr>
                            ))} */}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-evenly'>
                        <Pagination>
                            {[...Array(10)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage2}
                                    onClick={() => handlePageChange2(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}
