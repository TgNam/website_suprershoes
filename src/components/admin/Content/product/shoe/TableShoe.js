import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from './PaginationShoe';
// import ModelViewProduct from './ModelViewCustomer';
import { deleteProduct } from '../../../../../Service/ApiProductService';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ModalUpdateProduct from './ModalUpdateCustomer'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchAllProduct } from '../../../../../redux/action/ProductAction'
const TableShoe = () => {
    const dispatch = useDispatch();
    // const Products = useSelector((state) => state.product.listProduct);
    const Products = useSelector((state) => state.product.listProduct?.DT || []);

    console.log("Redux State Products:", Products);
    useEffect(() => {
        // Fetch Product data from context when component mounts
        dispatch(fetchAllProduct());
    }, []);

    const handleDeleteProduct = async (idProduct) => {
        try {
            const response = await deleteProduct(idProduct);
            console.log(response)
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

    return (
        <>
            <Table striped bordered hover >
                <thead className='table-info'>
                    <tr>
                        <th>STT</th>
                        <th>ProductName</th>
                        <th>product_code</th>
                        <th>brand</th>
                        <th>category</th>
                        <th>material</th>
                        <th>shoe_sole</th>
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
                                <td>{item.name || 'N/A'}</td>
                                <td>{item.productCode || 'N/A'}</td>
                                <td>{item.nameBrand || 'N/A'}</td>
                                <td>{item.nameCategory || 'N/A'}</td>
                                <td>{item.nameMaterial || 'N/A'}</td>
                                <td>{item.nameShoeSole || 'N/A'}</td>
                    <td>
                        <Button variant="danger" className='me-5' onClick={() => handleDeleteProduct(item.id)}>Delete</Button>
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
            <div className='d-flex justify-content-evenly'>
                <Pagination />
            </div>
        </>
    );
};

export default TableShoe;
