import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from './PaginationShoe';
import { deleteProduct } from '../../../../../Service/ApiProductService';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

const TableShoe = ({ products }) => {
    console.log('products in TableShoe:', products); // Log để kiểm tra sản phẩm
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProduct(products));
    }, [products, dispatch]);

    const handleDeleteProduct = async (idProduct) => {
        try {
            const response = await deleteProduct(idProduct);

            if (response && response.status === 200) {
                toast.success("Product deleted successfully");
                dispatch(fetchAllProduct()); // Cập nhật lại danh sách người dùng sau khi xóa
            } else {
                toast.error('Error deleting Product');
            }
        } catch (error) {
            toast.error('Network Error');
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedProducts(prevSelected => 
            prevSelected.includes(id)
                ? prevSelected.filter(productId => productId !== id)
                : [...prevSelected, id]
        );
    };

    const handleComplete = () => {
        const selectedItems = products.filter(product => selectedProducts.includes(product.id));
        dispatch(fetchAllProduct([...products, ...selectedItems]));
        setSelectedProducts([]);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead className='table-info'>
                    <tr>
                        <th></th>
                        <th>STT</th>
                        <th>ProductName</th>
                        <th>Product Code</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((item, index) => (
                            <tr key={`table-product-${index}`}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{item.name || 'N/A'}</td>
                                <td>{item.productCode || 'N/A'}</td>
                                <td>{item.nameBrand || 'N/A'}</td>
                                <td>{item.nameCategory || 'N/A'}</td>
                              
                                <td>
                                    <Button variant="danger" className='me-5' onClick={() => handleDeleteProduct(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button className="mx-3" onClick={handleComplete}>Hoàn tất</Button>
            <div className='d-flex justify-content-evenly'>
                <Pagination />
            </div>
        </>
    );
};

export default TableShoe;
