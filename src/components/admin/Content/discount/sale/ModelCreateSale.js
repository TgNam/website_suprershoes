import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { IoIosAddCircleOutline } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './ModelCreateSale.scss';

export default function ModelCreateSale() {
    const [selectAllTable1, setSelectAllTable1] = useState(false);
    const [selectedRowsTable1, setSelectedRowsTable1] = useState([]);
    const [selectAllTable2, setSelectAllTable2] = useState(false);
    const [selectedRowsTable2, setSelectedRowsTable2] = useState([]);

    const handleSelectAllChangeTable1 = () => {
        setSelectAllTable1(!selectAllTable1);
        if (!selectAllTable1) {
            setSelectedRowsTable1([1, 2, 3, 4, 5]); // giả sử đây là các ID của các hàng
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
            setSelectedRowsTable2([1, 2, 3, 4, 5]); // giả sử đây là các ID của các hàng
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

    return (
        <div className="model-create-sale container p-2">
            <h4 className='text-center p-2'>Thêm đợt giảm giá</h4>
            <div className='model-sale-product mx-2 row'>
                <div className='model-sale col'>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputCodeSale">Mã đợt giảm giá</Form.Label>
                            <Form.Control
                                type="text"
                                id="CodeSale"
                            />
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="inputNameSale">Tên đợt giảm giá</Form.Label>
                            <Form.Control
                                type="text"
                                id="NameSale"
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputValue">Giá trị(%)</Form.Label>
                            <Form.Control
                                type="number"
                                id="Value"
                            />
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="StartDate">Ngày bắt đầu</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="StartDate"
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <Form.Label htmlFor="EndDate">Ngày kết thúc</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="EndDate"
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <Button variant="info">
                                <IoIosAddCircleOutline /> Thêm đợt giảm giá
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='model-table-product col'>
                    <div className='search-product mb-3'>
                        <label htmlFor="nameShoe" className="form-label">Tên sản phẩm</label>
                        <input type="email" className="form-control" id="nameShoe" placeholder="Tìm kiếm sản phẩm theo tên...." />
                    </div>
                    <div className='table-product mb-3'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectAllTable1}
                                            onChange={handleSelectAllChangeTable1}
                                        />
                                    </th>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map(id => (
                                    <tr key={id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedRowsTable1.includes(id)}
                                                onChange={() => handleRowSelectChangeTable1(id)}
                                            />
                                        </td>
                                        <td>{id}</td>
                                        <td>FirstName{id}</td>
                                        <td>LastName{id}</td>
                                        <td>@username{id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-evenly'>
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />
                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>
                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div className='model-product-detail mb-3'>
                <h5>Danh sách sản phẩm chi tiết</h5>
                <div className='filter-productDetail row mb-3'>
                    <div className='filter-productDetail-name col'>
                        <Form.Label htmlFor="inputNameProduct">Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            id="NameProduct"
                            placeholder='Nhập tên....'
                        />
                    </div>
                    <div className='filter-productDetail-size col'>
                        <label htmlFor="categoryShoe" className="form-label">Size</label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="">Chọn size...</option>
                            <option value="1">37</option>
                            <option value="2">40</option>
                            <option value="3">42</option>
                        </select>
                    </div>
                    <div className='filter-productDetail-color col'>
                        <label htmlFor="categoryShoe" className="form-label">Color</label>
                        <select className="form-select" aria-label="Default select example">
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
                </div>
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map(id => (
                                <tr key={id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedRowsTable2.includes(id)}
                                            onChange={() => handleRowSelectChangeTable2(id)}
                                        />
                                    </td>
                                    <td>{id}</td>
                                    <td>FirstName{id}</td>
                                    <td>LastName{id}</td>
                                    <td>@username{id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-evenly'>
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}
