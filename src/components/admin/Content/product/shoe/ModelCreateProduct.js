
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModelCreateProduct.scss';
import ModelAddSize from './ModelAddSize';
import ModelAddColor from './ModelAddColor';
import { fetchAllProductDetail } from '../../../../../redux/action/productDetailAction';
import { useSelector, useDispatch } from 'react-redux'
const ModelCreateProduct = () => {
    const dispatch = useDispatch();
    // const Products = useSelector((state) => state.product.listProduct);
    const Products = useSelector((state) => state.productDetail.listProductDetail?.DT || []);

    console.log("Redux State Products:", Products);
    useEffect(() => {
        // Fetch Product data from context when component mounts
        dispatch(fetchAllProductDetail());
    }, []);
    return (
        <div className="model-create-product container">
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <div className="m-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="m-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="mb-3">
                            <label for="nameShoe" className="form-label">Thương hiệu</label>
                            <select className="form-select" aria-label="Default select example">
                                <option value="">Chọn thương hiệu...</option>
                                <option value="1">Nike</option>
                                <option value="2">Adidas</option>
                                <option value="3">Converse</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="categoryShoe" className="form-label">Danh mục</label>
                            <select className="form-select" aria-label="Default select example">
                                <option value="">Chọn danh mục...</option>
                                <option value="1">Thể thao</option>
                                <option value="2">Công sở</option>
                                <option value="3">Thời trang</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giới tính</label>
                            <div className="d-flex justify-content-start">
                                <div className="form-check mx-3">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check mx-3">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="mb-3">
                            <label className="form-label">Trạng thái</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Chọn trạng thái</option>
                                <option value="1">ACTIVE</option>
                                <option value="2">INACTIVE</option>
                                <option value="3">SUSPENDED</option>
                                <option value="3">CLOSED</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Đế giày</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Chọn đế giày</option>
                                <option value="1">Rubber</option>
                                <option value="2">Foam</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thương hiệu</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Chọn thương hiệu</option>
                                <option value="1">Nike</option>
                                <option value="2">Adidas</option>
                                <option value="3">Converse</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
                <h4 className="text-center p-3">Thêm kích cỡ và màu sắc</h4>
                <div className="model-create-product-size row mb-5">
                    <h4 className="mx-3 mb-3 col-2 pt-2">Kích cỡ:</h4>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            36
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            37
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            38
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            39
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            40
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            41
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            42
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2">
                            43
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div className="col-1">
                        <ModelAddSize className="mx-4 p-2" />
                    </div>
                </div>
                <div className="model-create-product-color row mb-5">
                    <h4 className="mx-3 mb-3 col-2 pt-2">Màu sắc:</h4>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#000000" }}>
                            #000000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div class="position-relative col-1 mx-3">
                        <div class="border p-2" style={{ backgroundColor: "#FF0000" }}>
                            #FF0000
                        </div>
                        <button class="badge-button">-</button>
                    </div>
                    <div className="col-1">
                        <ModelAddColor />
                    </div>
                </div>
            </div>
            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                    <Button className="mx-3">Chỉnh số lượng và giá chung</Button>
                    <Button className="mx-3">Hoàn tất</Button>
                </div>
                <div className="table-product-detail m-3">
                <Table striped bordered hover >
                <thead className='table-info'>
                    <tr>
                        <th>STT</th>
                        <th>id</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    {Products && Products.length > 0 ? (
        Products.map((item, index) => {
            console.log(item); // Kiểm tra cấu trúc của đối tượng item
            return (
                <tr key={`table-product-${index}`}>
                    <td>{index + 1}</td>
                                <td>{item.id || 'N/A'}</td>
                                <td>{item.quantity || 'N/A'}</td>
                                <td>{item.price || 'N/A'}</td>
                                <td>{item.idProduct || 'N/A'}</td>
                                <td>{item.nameSize || 'N/A'}</td>
                                <td>{item.nameColor || 'N/A'}</td>
                    <td>
                    
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan={8}>Not found data</td>
        </tr>
    )}
</tbody>

            </Table>
                </div>
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
    );
}

export default ModelCreateProduct;