import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { deleteProduct } from '../../../../../Service/ApiProductService';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import './TableShoe.scss';
import ModelDetailProduct from './ModelDetailProduct';
import ModelUpdateProduct from './ModelUpdateProduct';


// Hàm gộp sản phẩm và tổng hợp số lượng
export const groupAndSumQuantities = (products) => {
    // console.log("Trước khi gộp:", products);
  
    const grouped = products.reduce((acc, item) => {
        const key = `${item.idProduct}|${item.nameBrand}|${item.nameCategory}|${item.nameMaterial}|${item.nameshoeSole}|${item.status}`;

        if (!acc[key]) {
            acc[key] = { ...item, quantity: item.quantity || 0 }; // Tạo mới nếu chưa tồn tại
        } else {
            acc[key].quantity += item.quantity || 0; // Cộng dồn số lượng
        }
        return acc;
    }, {});
    // console.log("Sau khi gộp:", grouped);

    return Object.values(grouped).sort((a, b) => b.id - a.id); // Sắp xếp theo ID giảm dần
};

const TableShoe = ({ products, fetchProducts }) => {    
    const groupedProducts = groupAndSumQuantities(products.content || []);
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const itemsPerPage = 5; // Số lượng sản phẩm trên mỗi trang
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log("Dữ liệu products truyền vào TableShoe:", products);
        // console.log('Danh sách sản phẩm đã gộp:', groupedProducts);

    }, [products]);
    const updateProductStatus = async (productId, newStatus) => {
        try {
            // Gửi yêu cầu cập nhật trạng thái sản phẩm
            const response = await fetch(`http://localhost:8080/api/v1/productDetail/updateProductStatus/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (response.ok) {
                // Nếu cập nhật thành công, gọi lại hàm để làm mới danh sách sản phẩm
                await fetchProducts(); // Hàm để lấy dữ liệu mới
            } else {
                throw new Error('Có lỗi xảy ra khi cập nhật trạng thái sản phẩm');
            }
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái sản phẩm:', error);
        }
    };
    
   
    
    
  
    

    const handleStatusChange = (item) => {
        const updatedStatus = item.status === "ACTIVE" ? "STOPPED" : "ACTIVE";
        if (item && item.id) {
            updateProductStatus(item.id, updatedStatus);
        } else {
            console.error('Item or Item ID is undefined');
        }
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groupedProducts.slice(indexOfFirstItem, indexOfLastItem); // Chỉ lấy các sản phẩm trong trang hiện tại
    const totalPages = Math.ceil(groupedProducts.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead className='table-info'>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thương hiệu</th>
                        <th>Danh mục</th>
                        <th>Ảnh</th>
                        <th></th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-product-${index}`}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.nameProduct || 'N/A'}</td>
                                <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
                                <td>{item.nameBrand || 'N/A'}</td>
                                <td>{item.nameCategory || 'N/A'}</td>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${item.imageByte}`} // Hiển thị ảnh từ Base64
                                        alt="Uploaded Image"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </td>
                                <td>
                                    {item.status === "ACTIVE" ? "Đang bán" : item.status === "STOPPED" ? "Hết hàng" : item.status || 'N/A'}
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={item.status === "ACTIVE"}
                                            onChange={() => handleStatusChange(item)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td>
                                
                                    
                                    <ModelDetailProduct className="mx-4 p-2" idProduct={item.idProduct}></ModelDetailProduct>
                                    <ModelUpdateProduct className="mx-4 p-2" idProduct={item.idProduct}></ModelUpdateProduct>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => handleClickPage(0)} disabled={currentPage === 0} />
                    <Pagination.Prev onClick={() => handleClickPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0} />

                    {(() => {
                        const pageNumbers = [];
                        const maxPagesToShow = 5;
                        const halfRange = Math.floor(maxPagesToShow / 2);
                        let startPage = Math.max(0, currentPage - halfRange);
                        let endPage = Math.min(totalPages - 1, currentPage + halfRange);

                        if (endPage - startPage + 1 < maxPagesToShow) {
                            if (startPage === 0) {
                                endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
                            } else if (endPage === totalPages - 1) {
                                startPage = Math.max(0, endPage - maxPagesToShow + 1);
                            }
                        }

                        for (let page = startPage; page <= endPage; page++) {
                            pageNumbers.push(
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handleClickPage(page)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            );
                        }
                        return pageNumbers;
                    })()}

                    <Pagination.Next onClick={() => handleClickPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1} />
                    <Pagination.Last onClick={() => handleClickPage(totalPages - 1)} disabled={currentPage === totalPages - 1} />
                </Pagination>
            </div>
        </>
    );
};

export default TableShoe;
