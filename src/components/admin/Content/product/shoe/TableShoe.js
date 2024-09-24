import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from './PaginationShoe';
import { deleteProduct } from '../../../../../Service/ApiProductService';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

import ModelDetailProduct from './ModelDetailProduct';

// const groupAndSumQuantities = (products) => {
//     // Reduce qua danh sách sản phẩm để nhóm theo key và cộng dồn số lượng
//     const grouped = products.reduce((acc, item) => {
//         // Tạo một key duy nhất cho mỗi nhóm sản phẩm dựa vào tên, thương hiệu, và danh mục
//         const key = `${item.name}|${item.nameBrand}|${item.nameCategory}|${item.nameMaterial}|${item.nameshoeSole}|${item.status}`;

//         // Nếu key chưa tồn tại trong accumulator, tạo mới một đối tượng với số lượng khởi tạo là 0
//         if (!acc[key]) {
//             acc[key] = { ...item, quantity: 0 };
//         }

//         // Cộng dồn số lượng sản phẩm. Nếu item.quantity là null hoặc undefined, mặc định dùng 1
//         acc[key].quantity += (item.quantity || 1); // Đảm bảo quantity là số

//         return acc; // Trả về accumulator để tiếp tục giảm dần
//     }, {});

//     console.log('Grouped Products:', grouped); // Log để kiểm tra dữ liệu nhóm

//     // Chuyển đổi đối tượng grouped thành một mảng các giá trị và trả về
//     return Object.values(grouped);
// };



const TableShoe = ({ products }) => {
    console.log('products in TableShoe:', products); // Log để kiểm tra sản phẩm
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();
    // const groupedProducts = groupAndSumQuantities(products);
    // console.log('Grouped Products in TableShoe:', groupedProducts);

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    const handleDeleteProduct = async (idProduct) => {
        try {
            const response = await deleteProduct(idProduct);

            if (response && response.status === 200) {
                toast.success("Product deleted successfully");
                dispatch(fetchAllProduct()); // Cập nhật lại danh sách sản phẩm sau khi xóa
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
        // Logic để xử lý khi hoàn tất, ví dụ như lưu các sản phẩm đã chọn
        const selectedItems = products.filter(product => selectedProducts.includes(product.id));
        dispatch(fetchAllProduct()); // Cập nhật danh sách sản phẩm
        setSelectedProducts([]);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead className='table-info'>
                    <tr>
                        <th></th>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thương hiệu</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {products.content && products.content.length > 0 ? (
                        products.content                        .map((item, index) => (
                            <tr key={`table-product-${index}`}>
                                {/* <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td> */}
                                <td>{index + 1}</td>
                                <td>{item.nameProduct || 'N/A'}</td>
                                <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
                                <td>{item.nameBrand || 'N/A'}</td>
                                <td>{item.nameCategory || 'N/A'}</td>
                                <td>{item.status || 'N/A'}</td>
                                <td>
                                    <ModelDetailProduct className="mx-4 p-2"></ModelDetailProduct>


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
            {/* <Button className="mx-3" onClick={handleComplete}>Hoàn tất</Button> */}
            <div className='d-flex justify-content-evenly'>
                <Pagination />
            </div>
        </>
    );
};

export default TableShoe;
