import { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModelCreateProduct.scss';
import ModelAddSize from './ModelAddSize';
import ModelAddColor from './ModelAddColor';
import ModelAddQuanityPrice from './ModelAddQuanityPrice';

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
const ModelCreateProduct = () => {
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]); // Thêm state để lưu sản phẩm
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        material: '',
        shoeSole: '',
        quantity: '10',
        price: '100',
        productSizes: [],   // Mảng để lưu danh sách kích cỡ
        productColors: [],  // Mảng để lưu danh sách màu sắc
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [shoeSoles, setShoeSoles] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [productColors, setProductColors] = useState([]);
    const [brands, setBrands] = useState([]);

    const handleUpdateSizes = (newSize) => {
        setFormData({
            ...formData,
            productSizes: newSize, // cập nhật từ newSize 
        });
    };
    const handleRemoveSize = (index) => {
        setFormData(prevData => ({
            ...prevData,
            productSizes: prevData.productSizes.filter((_, i) => i !== index)
        }));
    };
    const handleUpdateColors = (newColors) => {
        setFormData({
            ...formData,
            productColors: newColors, // cập nhật từ newSize
        });
    };
   
    const handleRemoveColor = (index) => {
        setFormData(prevData => ({
            ...prevData,
            productColors: prevData.productColors.filter((_, i) => i !== index)
        }));
    };
    // const fetchProductDetails = (status) => {
    //     // Xây dựng URL với các tham số lọc
    //     let url = `http://localhost:8080/productDetail/list-productDetail`;

    //     axios.get(url)
    //         .then(response => {
    //             // console.log('products:', response.data.DT);
    //             setProducts(response.data.DT); // Hoặc sử dụng response.data nếu không có DT
    //         })
    //         .catch(error => {
    //             console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
    //         });
    // };
    // Hàm gọi API để lấy danh sách danh mục
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/category/list-category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchShoeSoles = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shoeSole/list-shoeSole`);
            setShoeSoles(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };

    // Hàm gọi API để lấy danh sách thương hiệu
    const fetchBrands = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/brand/list-brand`);

            setBrands(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    const fetchMaterials = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/material/list-material`);

            setMaterials(response.data);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
        }
    };
    // useEffect(() => {
    //     // console.log('sadasd:', filters, selectedStatus);
    //     fetchProductDetails();

    // }, []);
    useEffect(() => {
        fetchCategories(); // Gọi hàm khi component mount hoặc khi cần
        fetchBrands();
        fetchMaterials(); // Gọi hàm khi component mount hoặc khi cần
        fetchShoeSoles();
    }, []);
    useEffect(() => {
        if (isFormComplete()) {
            const sizesWithColors = formData.productSizes.flatMap(size =>
                formData.productColors.map(color => ({
                    ...formData,
                    size: size.name,
                    color: color.code_color
                }))
            );

            setProducts(prevProducts => [...prevProducts, ...sizesWithColors]);
        }
    }, [formData]);
    const handleCategoryChange = (event) => {
        setFormData({
            ...formData,
            category: event.target.value,

        });
    };
    const handleMaterialChange = (event) => {
        setFormData({
            ...formData,
            material: event.target.value,

        });
    };
    const handleShoeSoleChange = (event) => {
        setFormData({
            ...formData,
            shoeSole: event.target.value,

        });
    };

    const handleBrandChange = (event) => {
        setFormData({
            ...formData,
            brand: event.target.value,
        });
    };
    // Xử lý khi thay đổi số lượng của sản phẩm
    const handleInputQAndPChange = (e, index, field) => {
        const { value } = e.target;
        setProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, [field]: value } : product
            )
        );
    };
    const handleCheckboxChange = (id) => {
        setSelectedProducts(prevSelected => 
            prevSelected.includes(id)
                ? prevSelected.filter(productId => productId !== id)
                : [...prevSelected, id]
        );
    };    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Hàm để kiểm tra xem tất cả các trường đã được điền chưa
    const isFormComplete = () => {
        return formData.name && formData.description && formData.brand && formData.category && formData.material && formData.shoeSole && formData.productSizes.length > 0 && formData.productColors.length > 0;
    };


    const handleRemoveProduct = (index) => {
        setProducts(Products.filter((_, i) => i !== index));
    };
    const handleComplete = () => {
        const selectedItems = Products.filter(product => selectedProducts.includes(product.id));
        setProducts(prevProducts => [...prevProducts, ...selectedItems]);
        setSelectedProducts([]); // Xóa danh sách sản phẩm đã chọn sau khi thêm
    };
    


    return (
        <div className="model-create-product container">
            <div className="model-create-product-info p-3 m-3">
                <h4 className="text-center p-3">Thêm sản phẩm</h4>
                <div className="m-3">
                    <label for="exampleFormControlInput1" className="form-label">Tên sản phẩm :</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={Products.name}
                        onChange={handleInputChange}
                        placeholder="nhập tên sản phẩm"
                    />

                </div>
                <div className="m-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Mô tả : </label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={Products.description}
                        onChange={handleInputChange}
                        placeholder="nhập nội dung"
                    />
                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="mb-3">
                            <label for="nameShoe" className="form-label">Thương hiệu</label>
                            <select className="form-select" aria-label="Default select example" value={formData.brand} onChange={handleBrandChange}>
                                <option value="">Chọn thương hiệu...</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="categoryShoe" className="form-label">Danh mục</label>
                            <select className="form-select" aria-label="Default select example" value={formData.category} onChange={handleCategoryChange}>
                                <option value="">Chọn danh mục...</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="col m-3">
                        {/* <div className="mb-3">
                            <label className="form-label">Trạng thái</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Chọn trạng thái</option>
                                <option value="1">ACTIVE</option>
                                <option value="2">INACTIVE</option>
                                <option value="3">SUSPENDED</option>
                                <option value="3">CLOSED</option>
                            </select>
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Đế giày</label>
                            <select className="form-select" aria-label="Default select example" value={formData.material} onChange={handleMaterialChange}>
                                <option value="">Chọn danh mục...</option>
                                {materials.map((material) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chất liệu</label>
                            <select className="form-select" aria-label="Default select example" value={formData.shoeSole} onChange={handleShoeSoleChange}>
                                <option value="">Chọn danh mục...</option>
                                {shoeSoles.map((shoeSole) => (
                                    <option key={shoeSole.id} value={shoeSole.id}>
                                        {shoeSole.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="model-create-product-sizecolor p-3 m-3">
            <h4 className="text-center p-3">Thêm kích cỡ và màu sắc</h4>
                <div className="model-create-product-size row mb-5">
                    <h4 className="mx-3 mb-3 col-2 pt-2">Kích cỡ:</h4>
                    <div className="col-12">
                        <div className="product-sizes-container">
                            {Array.isArray(formData.productSizes) && formData.productSizes.map((size, index) => (
                                <div key={index} className="position-relative size-item mx-3">
                                    <div className="border p-2">
                                        {size.name}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveSize(index)} className="badge-button "
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Thêm kích cỡ */}
                        <div className="mt-3">
                            <ModelAddSize onUpdateSizes={handleUpdateSizes} />
                        </div>
                    </div>
                </div>
                <div className="model-create-product-color row mb-5">
                <h4 className="mx-3 mb-3 col-2 pt-2">Màu sắc:</h4>
                    <div className="product-color-container">
                        {Array.isArray(formData.productColors) && formData.productColors.map((color, index) => (
                            <div key={index} className="position-relative color-item mx-3">
                                <div className="border p-2" style={{ backgroundColor: color.code_color }}>
                                    {color.code_color}
                                </div>
                                <button
                                        onClick={() => handleRemoveColor(index)} className="badge-button "
                                    >
                                        -
                                    </button>
                            </div>
                        ))}
                    </div>
                    <div className="col-1">
                        <ModelAddColor onUpdateColor={handleUpdateColors} />
                    </div>
                </div>
            </div>
            <div className="model-create-product-table p-3 m-3">
                <h4 className="text-center p-3">Chi tiết sản phẩm</h4>
                <div className="add-button text-end">
                    <ModelAddQuanityPrice className="mx-4 p-2" />
                    <Button className="mx-3" onClick={handleComplete}>Hoàn tất</Button>
                </div>
                <div className="table-product-detail m-3">
                    <Table striped bordered hover >
                        <thead className='table-info'>
                            <tr>
                                <th></th>
                                <th>STT</th>
                                <th>Product</th>
                                <th>quantity</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products && Products.length > 0 ? (
                                Products.map((item, index) => {
                                    console.log("ád",item); // Kiểm tra cấu trúc của đối tượng item
                                    return (
                                        <tr key={`table-product-${index}`}>
                                               <input
                            type="checkbox"
                            checked={selectedProducts.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                        />
                                            <td>{index + 1}</td>
                                            <td>{item.name+(item.color)+(item.size) || 'N/A'}</td>
                                            {/* <td>{item.quantity || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity || 'N/A'}
                                                    onChange={(e) => handleInputQAndPChange(e, index, 'quantity')}
                                                />
                                            </td>
                                            {/* <td>{item.price || 'N/A'}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={item.price || 'N/A'}
                                                    onChange={(e) => handleInputQAndPChange(e, index, 'price')}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleRemoveProduct(index)}
                                                >
                                                    
                                                </Button>
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